import React, { Component } from 'react'; import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { map, toUpper } from 'lodash';
import Scroll from 'react-scroll';
import supportsWebP from 'supports-webp';

import Footer from '../footer';
import Navbar from '../navbar';
import { schoolClickEvent, courseSearchResultClickEvent } from '../../events';
import { getSuggestions } from '../../utils';

const ScrollLink = Scroll.Link;
const Element = Scroll.Element;

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      notificationBar: true,
    }

    this.hideNotificationBar = this.hideNotificationBar.bind(this);
    this.updateSearchResults = this.updateSearchResults.bind(this);
  }

  static getMeta(props) {
    return (
      <Helmet>
        <title>Studyform - Study More Effectively</title>
        <meta name="description" content="Find past exams and practice problems to solve and discuss . Ace your courses with Studyform." />
      </Helmet>
    );
  }

  componentDidMount() {
    window.addEventListener('click', (e) => {
      const logout = document.getElementsByClassName("logout");
      const arrow = document.getElementsByClassName("nav-signed-in");
      if (logout.length > 0 && !logout[0].contains(e.target) && !arrow[0].contains(e.target) && this.state.profileDropdownOn) {
        this.setState({ profileDropdownOn: false });
      }
      const searchResults = document.getElementsByClassName("nav-results");
      if (searchResults.length > 0 && !searchResults[0].contains(e.target) && this.state.suggestionsDropdownOn) {
        this.setState({ suggestionsDropdownOn: false });
      }
    });
  }

  hideNotificationBar() {
    this.setState({ notificationBar: false });
  }

  updateSearchResults(results) {
    this.setState(results);
  }

  render() {
    const schoolCodes = ['ucb', 'ucsd', 'uci', 'ucd', 'ucla', 'ucsb', 'gatech', 'auburn', 'asu'];
    const schoolLabels = ['UC Berkeley', 'UC San Diego', 'UC Irvine', 'UC Davis', 'UC Los Angeles', 'UC Santa Barbara', 'Georgia Tech', 'Auburn', 'Arizona State'];
    const schoolCards = map(schoolCodes, (schoolCode, key) => {
      return (
        <Link key={key} className="card" to={"/" + schoolCode} onClick={() => schoolClickEvent(schoolCode)}>
          <span>{schoolLabels[key]}</span>
          <span className="card-arrow">&#8594;</span>
        </Link> 
      );
    });

    const searchResults = (this.state.suggestions.length > 0) ? (
      <div className="results-container">
        <div className="results">
        {map(this.state.suggestions, (suggestion, index) => {
          const suggestionText = `${suggestion.school_name_highlighted} ${suggestion.code_label_highlighted} ${suggestion.label_highlighted ? "- " + suggestion.label_highlighted : null}`;
          return <Link onClick={() => courseSearchResultClickEvent(suggestion.school_code, suggestion.code)} key={index} to={`/${suggestion.school_code}/${toUpper(suggestion.code)}`} dangerouslySetInnerHTML={{__html: suggestionText}}></Link>;
        })}
        </div>
      </div>
    ) : null;

    return (
      <div className="home">
        {HomeComponent.getMeta()}
        <div className="banner">
          <Navbar home={true} />
          <div className={"banner-img " + (supportsWebP ? "webp" : "no-webp")}></div>
          <div className="banner-text">
            <div className="banner-header">Study More Effectively</div>
            <hr className="s2" />
            <h5 className="h5-alt">Study guides and practice problems for your courses at your school</h5>
            <hr className="s5" />
            <div className="search-container">
              <div className="material-icons search-icon">search</div>
              <input className="search" name="search" ref="search"
                placeholder="Find resources by course here (e.g. CS 61A, Math 1B, Econ 100)."
                type="text" autoComplete="off" onChange={() => getSuggestions(this.refs.search.value, this.updateSearchResults)} />
            </div>
            {searchResults}
            <div className="home-scrolls">
              <ScrollLink className="search-link" to="features" spy={true} smooth={true} duration={500}> 
                <div className="material-icons">info_outline</div>
                Learn More 
              </ScrollLink>
              <ScrollLink className="search-link" to="schools" spy={true} smooth={true} duration={500}> 
                <div className="material-icons school">school</div>
                View Schools 
              </ScrollLink>
            </div>
          </div>
        </div>
        <div>
          <hr className="s7-5" />
          <h4 className="center">Featured Courses</h4>
          <hr className="s1" />
          <h5>Browse our most popular study resources</h5>
          <hr className="s3" />
          <div className="card-container">
            <div className="featured-card">
              <div className="inner-card">
                <h2>MATH 1A</h2>
                <hr className="s0-5"></hr>
                <p>UC Berkeley</p>
                <hr className="s0-5"></hr>
                <p className="blue-text"><i className="fa fa-check-circle" aria-hidden="true"></i> Interactive mode available</p>
              </div>
              <div className="featured-des">
                <p>An introduction to differential and integral calculus of functions of one variable, with applications and an introduction to...</p>
              </div>
              <Link className="featured-link" to="/ucb/MATH1A">
                CLICK TO VIEW <span className="card-arrow">&#8594;</span>
              </Link>
            </div>
            <div className="featured-card">
              <div className="inner-card">
                <h2>MATH 53</h2>
                <hr className="s0-5"></hr>
                <p>UC Berkeley</p>
                <hr className="s0-5"></hr>
                <p className="blue-text"><i className="fa fa-check-circle" aria-hidden="true"></i> Interactive mode available</p>
              </div>
              <div className="featured-des">
                <p>Parametric equations and polar coordinates. Vectors in 2- and 3-dimensional Euclidean spaces. Partial derivatives. Multiple...</p>
              </div>
              <Link className="featured-link" to="/ucb/MATH53">
                CLICK TO VIEW <span className="card-arrow">&#8594;</span>
              </Link>
            </div>
            <div className="featured-card">
              <div className="inner-card">
                <h2>MATH 54</h2>
                <hr className="s0-5"></hr>
                <p>UC Berkeley</p>
                <hr className="s0-5"></hr>
                <p className="blue-text"><i className="fa fa-check-circle" aria-hidden="true"></i> Interactive mode available</p>
              </div>
              <div className="featured-des">
                <p>Basic linear algebra; matrix arithmetic and determinants. Vector spaces; inner product spaces. Eigenvalues and...</p>
              </div>
              <Link className="featured-link" to="/ucb/MATH54">
                CLICK TO VIEW <span className="card-arrow">&#8594;</span>
              </Link>
            </div>
            <hr className="s7-5" />
          </div>
        </div>
        <Element name="features" className="features background-edu border-top">
          <div className="center">
            <hr className="s7-5" />
            <h4 className="center">What is Studyform?</h4>
            <hr className="s1" />
            <h5>Everything you need to ace your next exam</h5>
            <hr className="s3" />
            <p className="home-des">Studyform is where you can find study guides, past exams, and practice problems for your course at your school. We make every resource on Studyform interactive and provide personalized tutoring to help you get better grades in less time!</p>
            <img className="banner-screen" src={"/img/screen.png"} alt="banner" /> 
          </div>
        </Element>
        <Element name="schools" className="border-top shadow-top">
          <hr className="s7-5" />
          <h4 className="center">School Directory</h4>
          <hr className="s1" />
          <h5>Browse study resources by school</h5>
          <hr className="s3" />
          <div className="card-container">
            {schoolCards}
            <hr className="s7-5" />
          </div>
        </Element>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const Home = connect(
  mapStateToProps
)(HomeComponent);

export default Home;
