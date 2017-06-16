import React, { Component } from 'react'; import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { has, map, toLower } from 'lodash';
import classnames from 'classnames';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

import Modal from '../modal';
import { algoliaCourseIndex, courseCodeToLabel, examTypeToLabel, termToLabel } from '../../utils';

const request = require('superagent');

class NavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null,
      profileDropdownOn: false,
      suggestionsDropdownOn: false,
      suggestions: [],
      modalError: null,
    };

    this.closeModal = this.closeModal.bind(this);
    this.showLoginModal = this.showLoginModal.bind(this);
    this.showWaitlistModal = this.showWaitlistModal.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.toggleProfileDropdown = this.toggleProfileDropdown.bind(this);
    this.setModalError = this.setModalError.bind(this);
  }

  componentDidMount() {
    const self = this;
    window.addEventListener('click', function(e) {
      const logout = document.getElementsByClassName("logout");
      const arrow = document.getElementsByClassName("nav-signed-in");
      if (logout.length > 0 && !logout[0].contains(e.target) && !arrow[0].contains(e.target) && self.state.profileDropdownOn) {
        self.setState({ profileDropdownOn: false });  
      }
      const searchResults = document.getElementsByClassName("nav-results");
      if (searchResults.length > 0 && !searchResults[0].contains(e.target) && self.state.suggestionsDropdownOn) {
        self.setState({ suggestionsDropdownOn: false });
      }
    });
  }

  setModalError(text) {
    this.setState({ modalError: text }); 
  }

  toggleProfileDropdown() {
    this.setState({
      profileDropdownOn: !this.state.profileDropdownOn
    });
  }

  closeModal() {
    this.setState({
      modal: null
    });
  }

  showLoginModal() {
    this.setState({
      modal: 'login'
    });
  }

  showWaitlistModal() {
    this.setState({
      modal: 'waitlist'
    });
  }

  getSuggestions() {
    const queryStr = this.refs.search.value;
    if (queryStr.length === 0) {
      this.setState({
        suggestions: []
      });
      return;
    }
    algoliaCourseIndex.search({
      query: queryStr,
      length: 4,
      offset: 0,
    }, (err, content) => {
      const suggestions = map(content.hits, (hit) => {
        return {
          school_code: hit.school_code,
          school_name: hit.school_name,
          school_name_highlighted: hit._highlightResult.school_name.value,
          code: hit.code,
          code_highlighted: hit._highlightResult.code.value,
          name: hit.name,
          name_highlighted: hit._highlightResult.name.value,
        };
      });
      this.setState({ suggestions, suggestionsDropdownOn: true });
    });
  }

  waitlist() {
    const email = this.refs.email.value;
    if (!isEmail(email))
      return this.setError('Invalid email.');
    this.setError(null);
    request
      .post("/addToWaitlist")
      .send({ email })
      .end((err, res) => {
        if (err || !res.ok) this.setError("Waitlist failed.");
        else window.setTimeout(this.props.closeModal, 1000);
      });
  }

  login() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    if (!isEmail(email))
      return this.setError('Invalid email.');
    if (isEmpty(password))
      return this.setError('Empty passowrd.');
    this.setError(null);
    this.props.auth.login(email, password, this.setError);
  }

  render() {
    const isLoggedIn = this.props.auth.loggedIn();
    const profile = this.props.auth.getProfile();
    let username = null;
    if (profile) {
      username = (has(profile, 'user_metadata') && has(profile.user_metadata, 'username')) ?
      (profile.user_metadata.username) : (profile.given_name);
    }

    let modal = null;
    if (!isLoggedIn) {
      const isWaitlist = (this.state.modal === 'waitlist');
      const infoContent = isWaitlist ? (
        <div className="login-helper">
          <span> Have an account? </span>
          <a onClick={this.showLoginModal}> Login! </a>
        </div>
      ) : (
        <div className="login-helper">
          <span> Don't have an account? </span>
          <a onClick={this.showWaitlistModal}> Get Early Access </a>
        </div>
      );
      const modalContent = isWaitlist ? (
        <span>
          <input className="login-info" type="text" placeholder="Email" ref="email"/>
          <hr className="s2" />
          <a className="login-button blue" onClick={this.waitlist}>Get Early Access</a>
        </span>
      ) : (
        <span>
          <input className="login-info" type="text" placeholder="Email" ref="email"/>
          <hr className="s1" />
          <input className="login-info" type="password" placeholder="Password" ref="password"/>
          <hr className="s2" />
          <p className="forgot-pass">
            <a className="forgot-pass">Don't remember your password?</a>
          </p>
          <hr className="s2" />
          <a className="login-button blue" onClick={this.login}>Log In</a>
        </span>
      );

      if (this.state.modal === 'waitlist') {
        modal = <Modal closeModal={this.closeModal} infoContent={infoContent} modalContent={modalContent} errorText={this.state.modalError} />;
      } else if (this.state.modal === 'login') {
        modal = <Modal closeModal={this.closeModal} infoContent={infoContent} modalContent={modalContent} errorText={this.state.modalError} />;
      }
    }

    if (this.props.home) {
      return (
        <div className="home-nav">
          {modal}
          <div className="container">
            <Link to="/" className="desktop-logo">
              <img className="logo home-logo" src="/img/logo.svg" alt="home logo" />
            </Link>
            <Link to="/" className="mobile-logo">
              <img className="logo home-logo" src="/img/icon.svg" alt="home logo" />
            </Link>
            <div className="home-icon material-icons">search</div>
            <div className="home-search-container">
              <input className="home-search" name="search" placeholder="Search courses..." type="text" autoComplete="off" onChange={this.getSuggestions} ref="search" />
            </div>
            {searchResults}
            <a className="home-button home-button-alt" onClick={this.showLoginModal}>Log In</a>
            <a className="home-button" onClick={this.showWaitlistModal}>Early Access</a>
          </div>
        </div>
      );
    }

    if (!has(this.props.labels, 'schools')) {
      return false;
    }

    const { schoolCode, courseCode, examTypeCode, termCode } = this.props;
    const courseLabel = courseCodeToLabel(courseCode);
    const schoolLabel = this.props.labels.schools[schoolCode];
    const examTypeLabel = examTypeToLabel(examTypeCode);
    const termLabel = termToLabel(termCode); 
    const numLayers = !!schoolLabel + !!courseLabel + !!examTypeLabel;
    let navbarNav = null;
    if (!this.props.userHome) {
      navbarNav = [<Link key='home' to='/' className={classnames({ active: numLayers === 0 })}>Home</Link>];
      if (schoolLabel) {
        navbarNav.push(<span key='homeSpan'> > </span>);
        navbarNav.push(<Link key='school' to={'/' + schoolCode} className={classnames({ active: numLayers === 1 })}>{schoolLabel}</Link>);
        if (courseLabel) {
          navbarNav.push(<span key='courseSpan'> > </span>);
          navbarNav.push(<Link key='course' to={'/' + schoolCode + '/' + courseCode} className={classnames({ active: numLayers === 2 })}>{courseLabel}</Link>);
          if (examTypeLabel) {
            navbarNav.push(<span key='examSpan'> > </span>);
            navbarNav.push(<Link key='exam' to={'/' + schoolCode + '/' + courseCode + '/' + examTypeCode + '/' + termCode} className={classnames({ active: numLayers === 3 })}>{examTypeLabel} - {termLabel}</Link>);
          }
        }
      }
      if (this.props.exam) {
        navbarNav = (
          <div className="gray-nav">
            <div className="container">
              {navbarNav}
              <a className="utility-button">View Source</a>
            </div>
          </div>
        );
      } else {
        navbarNav = (
          <div className="gray-nav">
            <div className="container">
              {navbarNav}
            </div>
          </div>
        );
      }
    }

    const suggestions = this.state.suggestions;
    const searchResults = (suggestions && suggestions.length > 0 && this.state.suggestionsDropdownOn) ? (
      <div className={classnames({ "nav-results": true, "nav-results-signed-in": isLoggedIn })}>
        {map(suggestions, (suggestion, index) => {
          const aClass = classnames({ bottom: index === suggestions.length - 1 });
          const suggestionText = `${suggestion.school_name_highlighted} ${suggestion.code_highlighted}: ${suggestion.name_highlighted}`;
          return <Link to={`/${suggestion.school_code}/${toLower(suggestion.code)}`} className={aClass} dangerouslySetInnerHTML={{__html: suggestionText}}></Link>;
        })}
      </div>
    ) : null;

    return (
      <div>
        {modal}
        <div className="nav">
          <div className="container">
            <Link className="desktop-logo" to="/"><img className="logo" src="/img/logo.svg" alt="logo" /></Link>
            <Link className="mobile-logo" to="/"><img className="logo" src="/img/icon.svg" alt="logo" /></Link>
            <input className={classnames({ "nav-search": true, "nav-search-signed-in": isLoggedIn })} name="search" placeholder="Search courses..." type="text" autoComplete="off" onChange={this.getSuggestions} ref="search" />
            {searchResults}
            <div className="material-icons nav-search-icon">search</div>
            {(isLoggedIn) ? (
              <span>
                <span className="nav-button nav-signed-in" onClick={this.toggleProfileDropdown}>
                  <div className="material-icons signed-in-icon">person</div>
                  {username}
                  <div className="material-icons signed-in-arrow">keyboard_arrow_down</div>
                </span>
                {this.state.profileDropdownOn ? (<Link to="/logout" className="logout">Log Out</Link>) : null}
              </span>
            ) : (
              <span>
                <a className="nav-button nav-button-alt" onClick={this.showLoginModal}>Log In</a>
                <a className="nav-button" onClick={this.showWaitlistModal}>Early Access</a>
              </span>
            )}
          </div>
        </div>
        {navbarNav}
      </div>
    ); 
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    labels: state.labels,
  };
};

const Navbar = connect(
  mapStateToProps
)(NavbarComponent);

export default Navbar;
