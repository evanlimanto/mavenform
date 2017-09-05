import React, { Component } from 'react'; import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { has, map, toUpper } from 'lodash';
import classnames from 'classnames';

import { Modals } from '../modal';
import { courseCodeToLabel, examTypeToLabel, termToLabel, getSuggestions } from '../../utils';
import { showLoginModal, showSignupModal } from '../../actions';

class NavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileDropdownOn: false,
      suggestionsDropdownOn: false,
      suggestions: [],
    };

    this.toggleProfileDropdown = this.toggleProfileDropdown.bind(this);
    this.updateSearchResults = this.updateSearchResults.bind(this);
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

  updateSearchResults(results) {
    this.setState(results);
  }

  render() {
    const isLoggedIn = this.props.auth.loggedIn();
    const suggestions = this.state.suggestions;
    const searchResults = (suggestions && this.state.suggestionsDropdownOn) ?
      ((suggestions.length > 0) ? (
        <div className={classnames({ "nav-results": true, "nav-results-signed-in": isLoggedIn })}>
          {map(suggestions, (suggestion, index) => {
            const aClass = classnames({ bottom: index === suggestions.length - 1 });
            const suggestionText = `${suggestion.school_name_highlighted} ${suggestion.code_label_highlighted}`;
            return <a key={index} href={`/${suggestion.school_code}/${toUpper(suggestion.code)}`} className={aClass} dangerouslySetInnerHTML={{__html: suggestionText}}></a>;
          })}
        </div>
      ) : (<div className={classnames({ "nav-results": true, "nav-results-signed-in": isLoggedIn })}><a>No results.</a></div>)) : null;

    if (this.props.home) {
      return (
        <div className="home-nav">
          <Modals />
          <div className="container nav-container">
            <Link to="/" className="desktop-logo">
              <img className="logo home-logo" src="/img/logo.svg" alt="Studyform Logo" />
            </Link>
            <Link to="/" className="mobile-logo">
              <img className="logo home-logo" src="/img/icon.svg" alt="Studyform Logo" />
            </Link>
            {(isLoggedIn) ? (
              <span>
                <div className="home-button home-button-alt signed-in-home">
                  <div className="material-icons signed-in-icon">person</div>
                  <Link to="/profile" className="profile-link">{this.props.auth.getProfile().user_metadata.username}</Link>
                </div>
                <Link to="/logout" className="home-button">Log Out</Link>
              </span>
            ) : (
              <span>
                <a className="home-button home-button-alt" onClick={this.props.showLoginModal}>Log In</a>
                <a className="home-button" onClick={this.props.showSignupModal}>Sign Up</a>
              </span>
            )}
          </div>
        </div>
      );
    }

    if (!has(this.props.labels, 'schools')) {
      return false;
    }

    const { schoolCode, courseCode, examTypeCode, termCode, concept, label, profs, problemset, problemSetType } = this.props;
    const courseLabel = courseCodeToLabel(courseCode);
    const schoolLabel = this.props.labels.schools[schoolCode];
    const examTypeLabel = examTypeToLabel(examTypeCode);
    const termLabel = termToLabel(termCode); 
    const numLayers = !!schoolLabel + !!courseLabel + !!examTypeLabel + !!label + !!problemset + !!problemSetType;
    let navbarNav = null;
    if (this.props.interactive) {
      navbarNav = [<Link key={0} to='/'>Home</Link>];
      const { navbarLabels, links } = this.props;
      let link = "";
      for (var i = 0; i < navbarLabels.length; i++) {
        link += "/";
        link += links[i];
        navbarNav.push(<span key={i * 2 + 1}> > </span>);
        navbarNav.push(
          <Link key={i * 2 + 2} to={link}
            className={classnames({ active: i === navbarLabels.length - 1 })}
          >{navbarLabels[i]}</Link>
        );
      }
    } else if (!this.props.userHome) {
      navbarNav = [<Link key='home' to='/' className={classnames({ active: numLayers === 0 })}>Home</Link>];
      if (schoolLabel) {
        navbarNav.push(<span key='homeSpan'> > </span>);
        navbarNav.push(<Link key='school' to={'/' + schoolCode} className={classnames({ active: numLayers === 1 })}>{schoolLabel}</Link>);
        if (courseLabel) {
          navbarNav.push(<span key='courseSpan'> > </span>);
          navbarNav.push(<Link key='course' to={'/' + schoolCode + '/' + courseCode} className={classnames({ active: numLayers === 2 })}>{courseLabel}</Link>);
          if (examTypeLabel) {
            navbarNav.push(<span key='examSpan'> > </span>);
            navbarNav.push(<Link key='exam' to={'/' + schoolCode + '/' + courseCode + '/' + examTypeCode + '/' + termCode + '/' + profs} className={classnames({ active: numLayers === 3 })}>{examTypeLabel} - {termLabel}</Link>);
          } else if (label) {
            navbarNav.push(<span key='examSpan'> > </span>);
            navbarNav.push(<Link key='exam' to={'/' + schoolCode + '/' + courseCode + '/' + concept} className={classnames({ active: numLayers === 3 })}>{label}</Link>);
          } else if (problemset) {
            navbarNav.push(<span key='problemSetSpan'> > </span>);
            navbarNav.push(<Link key='problemSet' to={'/' + schoolCode + '/' + courseCode + '/problemset'} className={classnames({ active: numLayers === 3})}>Problem Set</Link>);
            if (problemSetType) {
              navbarNav.push(<span key='problemSetTypeSpan'> > </span>);
              navbarNav.push(<Link key='problemSetType' to={'/' + schoolCode + '/' + courseCode + '/problemset/' + problemSetType} className={classnames({ active: numLayers === 4})}>{examTypeToLabel(problemSetType)}</Link>);
            }
          }
        }
      }
    }
    if (!this.props.userHome) {
      navbarNav = (
        <div className="gray-nav">
          <div className="container">
            {navbarNav}
            {!this.props.exam || <a className="utility-button" href={this.props.source_url} target="_blank" rel="noopener noreferrer">View PDF</a>}
          </div>
        </div>
      );
    }

    if (this.props.waitlisted)
        navbarNav = null;

    return (
      <div>
        <Modals />
        <div className="nav">
          <div className="container nav-container">
            <Link className="desktop-logo" to="/"><img className="logo" src="/img/logo.svg" alt="Studyform Logo" /></Link>
            <Link className="mobile-logo" to="/"><img className="logo" src="/img/icon.svg" alt="Studyform Logo" /></Link>
            <div className="material-icons nav-icon">search</div>
            <div className="nav-search-container">
              <input className="nav-search" name="search"
                placeholder="Search courses..." type="text" autoComplete="off"
                onChange={() => getSuggestions(this.refs.search.value, this.updateSearchResults)} ref="search" />
              {searchResults}
            </div>
            {(isLoggedIn) ? (
              <span>
                <span className="nav-button nav-signed-in">
                  <div className="material-icons signed-in-icon">person</div>
                  <Link to="/courses" className="profile-link">{this.props.auth.getProfile().user_metadata.username}</Link>
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
