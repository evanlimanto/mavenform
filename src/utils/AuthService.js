import { isTokenExpired } from './jwtHelper'
import createBrowserHistory from 'history/createBrowserHistory'
import auth0 from 'auth0-js'
import { has } from 'lodash'

import { evtEmitter } from './events'
const request = require('superagent');

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.auth0 = new auth0.WebAuth({
      clientID: 'tgMckz0tmKMhju4VwEnPLxEH4BDExL21',
      domain: 'mavenform.auth0.com',
      responseType: 'token id_token',
      redirectUri: 'http://localhost:3000/login'
    })
    this.history = createBrowserHistory()

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

  login(username, password) {
    this.auth0.redirect.loginWithCredentials({
      connection: 'Username-Password-Authentication',
      username,
      password
    }, (err) => {
      if (err) console.error(err);
      console.error(err.original);
    })
  }

  signup(email, username, password){
    this.auth0.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      email,
      password,
      user_metadata: { username }
    }, (err) => {
      if (err) console.error(err);
    })
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
      if (err) {
        alert(`Error: ${err.errorDescription}`)
      }
      if (authResult) {
        this.setToken(authResult.accessToken, authResult.idToken)
        this.auth0.client.userInfo(authResult.accessToken, (error, profile) => {
          if (error) {
            console.error(error)
          } else {
            if (process.env.NODE_ENV === "development") {
              console.log(profile);
            }
            this.setProfile(profile)
            const req = request.post('/createUser');
            req.field('auth_user_id', profile.user_id)
              .end((err, res) => {
                if (err) console.error(err);
              });
            document.location = "/home";
          }
        })
      }
    })
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  setToken(accessToken, idToken) {
    // Saves user access token and ID token into local storage
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('id_token', idToken)
  }

  setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    evtEmitter.emit('profile_updated', profile);
  }

  getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  getUserId() {
    return this.getProfile().user_id;
  }

  getAccessToken() {
    return localStorage.getItem('access_token')
  }

  getToken() {
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
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
    document.location = "/";
  }
}
