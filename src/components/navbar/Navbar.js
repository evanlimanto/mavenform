import React, { Component } from 'react'; import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { has, map, toLower } from 'lodash';
import classnames from 'classnames';

import Modal from '../modal';
import { algoliaCourseIndex, courseCodeToLabel, examTypeToLabel, termToLabel } from '../../utils';

class NavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null,
      profileDropdownOn: false,
      suggestions: []
    };

    this.closeModal = this.closeModal.bind(this);
    this.loginModal = this.loginModal.bind(this);
    this.signUpModal = this.signUpModal.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.toggleProfileDropdown = this.toggleProfileDropdown.bind(this);
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

  loginModal() {
    this.setState({
      modal: 'login'
    });
  }

  signUpModal() {
    this.setState({
      modal: 'signup'
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
      this.setState({ suggestions });
    });
  }

  render() {
    const isLoggedIn = this.props.auth.loggedIn();
    const profile = this.props.auth.getProfile();
    let username = null;
    if (profile) {
      username = (has(profile, 'user_metadata') && has(profile.user_metadata, 'username')) ?
      (profile.user_metadata.username) : (profile.nickname);
    }

    let modal = null;
    if (!isLoggedIn) {
      if (this.state.modal === 'signup') {
        modal = <Modal signUp={true} closeModal={this.closeModal} loginModal={this.loginModal} signUpModal={this.signUpModal} />;
      } else if (this.state.modal === 'login') {
        modal = <Modal signUp={false} closeModal={this.closeModal} loginModal={this.loginModal} signUpModal={this.signUpModal} />;
      }
    }

    if (this.props.home) {
      return (
        <div className="home-nav">
          {modal}
          <div className="container">
            <Link to="/"><img className="logo home-logo" src="/img/logo.svg" alt="home logo" /></Link>
            <a className="home-button home-button-alt" onClick={this.loginModal}>Log In</a>
            <a className="home-button" onClick={this.signUpModal}>Sign Up</a>
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
    let navbarNav = [<Link key='home' to='/' className={classnames({ active: numLayers === 0 })}>Home</Link>];
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

    const suggestions = this.state.suggestions;
    const searchResults = (
      <div className={classnames({ "nav-results": true, "nav-results-signed-in": isLoggedIn })}>
        {map(suggestions, (suggestion, index) => {
          const aClass = classnames({ bottom: index === suggestions.length - 1 });
          const suggestionText = `${suggestion.school_name_highlighted} ${suggestion.code_highlighted}: ${suggestion.name_highlighted}`;
          return <Link to={`/${suggestion.school_code}/${toLower(suggestion.code)}`} className={aClass} dangerouslySetInnerHTML={{__html: suggestionText}}></Link>;
        })}
      </div>
    );

    return (
      <div>
        {modal}
        <div className="nav">
          <div className="container">
            <Link to="/"><img className="logo" src="/img/logo.svg" /></Link>
            <input className={classnames({ "nav-search": true, "nav-search-signed-in": isLoggedIn })} name="search" placeholder="Search courses..." type="text" autoComplete="off" onChange={this.getSuggestions} ref="search" />
            {searchResults}
            <div className="material-icons nav-search-icon">search</div>
            {(isLoggedIn) ? (
              <span>
                <span className="nav-button nav-signed-in">
                  <div className="material-icons signed-in-icon">person</div>
                  {username}
                  <div className="material-icons signed-in-arrow" onClick={this.toggleProfileDropdown}>keyboard_arrow_down</div>
                </span>
                {this.state.profileDropdownOn ? (<Link to="/logout" className="logout">Log Out</Link>) : null}
              </span>
            ) : (
              <span>
                <a className="nav-button nav-button-alt" onClick={this.loginModal}>Log In</a>
                <a className="nav-button" onClick={this.signUpModal}>Sign Up</a>
              </span>
            )}
          </div>
        </div>
        <div className="gray-nav">
          <div className="container">
            {navbarNav}
          </div>
        </div>
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
