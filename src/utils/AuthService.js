import { isTokenExpired } from './jwtHelper'
import auth0 from 'auth0-js'
import { has } from 'lodash'
import rs from 'randomstring'

import { evtEmitter } from './events'
import { mixpanel } from '../events'
import { canUseDOM } from '../utils'
const req = require('superagent');

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.auth0 = new auth0.WebAuth({
      clientID: '3SPCS4VBz4m9U3ftP37BdwoSm9r4obPN',
      domain: 'mavenform.auth0.com',
      responseType: 'token id_token',
      redirectUri: canUseDOM ? window.location.origin + '/login' : null,
    })

    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
    this.loginWithFacebook = this.loginWithFacebook.bind(this)
    this.loginWithGoogle = this.loginWithGoogle.bind(this)
    this.parseHash = this.parseHash.bind(this)
    this.loggedIn = this.loggedIn.bind(this)
    this.getProfile = this.getProfile.bind(this)
    this.setProfile = this.setProfile.bind(this)
    this.logout = this.logout.bind(this)
  }

  login(username, password, errorMessageHandler) {
    this.auth0.redirect.loginWithCredentials({
      connection: 'Username-Password-Authentication',
      username,
      password
    }, (err) => {
      if (err && errorMessageHandler) {
        document.getElementById("login").innerHTML = "Log In";
        errorMessageHandler(err.description);
      }
    })
  }

  signup(email, username, password, errorMessageHandler){
    const self = this;
    req.post('/checkUsername')
      .send({ username })
      .end((err, res) => {
        if (!res.body.has) {
          return self.auth0.redirect.signupAndLogin({
            connection: 'Username-Password-Authentication',
            email,
            password,
            user_metadata: { username }
          }, (err) => {
            if (err && errorMessageHandler) {
              document.getElementById("signup").innerHTML = "Sign Up";
              errorMessageHandler(err.description);
            }
          })
        } else {
          document.getElementById("signup").innerHTML = "Sign Up";
          errorMessageHandler("Username already taken.");
        }
      });
  }

  loginWithFacebook() {
    this.auth0.authorize({
      connection: 'facebook'
    })
  }

  loginWithGoogle() {
    this.auth0.authorize({
      connection: 'google-oauth2'
    })
  }

  parseHash(hash) {
    this.auth0.parseHash({ hash, _idTokenVerification: false }, (err, authResult) => {
      if (err)
        return console.error(err);
      if (authResult) {
        this.setToken(authResult.accessToken, authResult.idToken)
        this.auth0.client.userInfo(authResult.accessToken, (error, profile) => {
          if (error)
            return console.error(error, error.original)
          if (process.env.NODE_ENV === "development")
            console.log(profile);
          this.setProfile(profile)
          req.post('/createUser')
            .send({ auth_user_id: profile.user_id, nickname: profile.user_metadata.username, email: profile.email })
            .end((err, res) => {
              if (err) console.error(err);
              else {
                mixpanel.identify(profile.user_id);
                mixpanel.people.set_once('First Login Date', new Date());
                mixpanel.people.set({
                  "$email": profile.email,
                  "$name": profile.user_metadata.username
                });
                document.location = document.referrer;
              }
            });
        })
      }
    })
  }

  loggedIn() {
    if (!canUseDOM)
      return false;
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  setToken(accessToken, idToken) {
    if (!canUseDOM)
      return;
    // Saves user access token and ID token into local storage
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('id_token', idToken)
  }

  setProfile(profile) {
    if (!canUseDOM)
      return;
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    evtEmitter.emit('profile_updated', profile);
  }

  getProfile() {
    if (!canUseDOM)
      return;
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : null;
  }

  getUserId() {
    return this.getProfile().user_id;
  }

  getAccessToken() {
    if (!canUseDOM)
      return;
    return localStorage.getItem('access_token')
  }

  getToken() {
    if (!canUseDOM)
      return;
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  getSchool() {
    const profile = this.getProfile();
    const school = (has(profile, 'user_metadata') && has(profile.user_metadata, 'school_id'))
      ? profile.user_metadata.school_id : null;
    return school;
  }

  logout() {
    if (!canUseDOM)
      return;
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
    mixpanel.identify(rs.generate(20));
    document.location = "/";
  }
}
