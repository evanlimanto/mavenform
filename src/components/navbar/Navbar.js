import React, { Component } from 'react'; import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { has, map, toLower } from 'lodash';
import classnames from 'classnames';

import { Modals } from '../modal';
import { algoliaCourseIndex, courseCodeToLabel, examTypeToLabel, termToLabel } from '../../utils';
import { showLoginModal, showSignupModal } from '../../actions';

class NavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileDropdownOn: false,
      suggestionsDropdownOn: false,
      suggestions: [],
    };

    this.getSuggestions = this.getSuggestions.bind(this);
    this.toggleProfileDropdown = this.toggleProfileDropdown.bind(this);
  }

  componentDidMount() {
    const self = this;
    window.addEventListener('click', (e) => {
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

  toggleProfileDropdown() {
    this.setState({ profileDropdownOn: !this.state.profileDropdownOn });
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
          code: hit.code,
          school_code: hit.school_code,
          school_name: hit.school_name,
          code_label_highlighted: hit._highlightResult.code_label.value,
          school_name_highlighted: hit._highlightResult.school_name.value,
        };
      });
      this.setState({ suggestions, suggestionsDropdownOn: true });
    });
  }j5 

  render() {
    const isLoggedIn = this.props.auth.loggedIn();
    const profile = this.props.auth.getProfile();
    let username = null;
    if (profile) {
      username = (has(profile, 'user_metadata') && has(profile.user_metadata, 'username')) ?
      (profile.user_metadata.username) : (profile.given_name);
    }

    const suggestions = this.state.suggestions;
    const searchResults = (suggestions && this.state.suggestionsDropdownOn) ?
      ((suggestions.length > 0) ? (
        <div className={classnames({ "nav-results": true, "nav-results-signed-in": isLoggedIn })}>
          {map(suggestions, (suggestion, index) => {
            const aClass = classnames({ bottom: index === suggestions.length - 1 });
            const suggestionText = `${suggestion.school_name_highlighted} ${suggestion.code_label_highlighted}`;
            return <Link key={index} to={`/${suggestion.school_code}/${toLower(suggestion.code)}`} className={aClass} dangerouslySetInnerHTML={{__html: suggestionText}}></Link>;
          })}
        </div>
      ) : (<div className={classnames({ "nav-results": true, "nav-results-signed-in": isLoggedIn })}><a>No results.</a></div>)) : null;

    if (this.props.home) {
      return (
        <div className="home-nav">
          <Modals />
          <div className="container">
            <Link to="/" className="desktop-logo">
              <img className="logo home-logo" src="/img/logo.svg" alt="home logo" />
            </Link>
            <Link to="/" className="mobile-logo">
              <img className="logo home-logo" src="/img/icon.svg" alt="home logo" />
            </Link>
            <span>
              <a className="home-button home-button-alt" onClick={this.props.showLoginModal}>Log In</a>
              <a className="home-button" onClick={this.props.showSignupModal}>Sign Up</a>
            </span>
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
              <a className="utility-button" href={this.props.source_url} target="_blank" rel="noopener noreferrer">View Source</a>
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

    if (this.props.waitlisted)
        navbarNav = null;

    return (
      <div>
        <Modals ref={(instance) => { this.modals = instance; }} />
        <div className="nav">
          <div className="container">
            <Link className="desktop-logo" to="/"><img className="logo" src="/img/logo.svg" alt="logo" /></Link>
            <Link className="mobile-logo" to="/"><img className="logo" src="/img/icon.svg" alt="logo" /></Link>
            <div className="material-icons nav-icon">search</div>
            <div className="nav-search-container">             
              <input className="nav-search" name="search" placeholder="Search courses..." type="text" autoComplete="off" onChange={this.getSuggestions} ref="search" />
              {searchResults}
            </div>
            {(isLoggedIn) ? (
              <span>
                <span className="nav-button nav-signed-in">
                  <div className="material-icons signed-in-icon">person</div>
                  {username}
                </span>
                <Link to="/logout" className="nav-button">Log Out</Link>
              </span>
            ) : (
              <span>
                <a className="nav-button nav-button-alt" onClick={this.props.showLoginModal}>Log In</a>
                <a className="nav-button" onClick={this.props.showSignupModal}>Sign Up</a>
              </span>
            )}
          </div>
        </div>
        {navbarNav}
      </div>
    ); 
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    history: state.history,
    labels: state.labels,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showLoginModal: () => dispatch(showLoginModal()),
    showSignupModal: () => dispatch(showSignupModal()),
  };
};

const Navbar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavbarComponent);

export default Navbar;
