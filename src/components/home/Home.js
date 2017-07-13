import React, { Component } from 'react'; import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import { map, toUpper } from 'lodash';
import Footer from '../footer';
import Navbar from '../navbar';
import { schoolClickEvent } from '../../events';
import { algoliaCourseIndex } from '../../utils';

const Scroll = require('react-scroll');
const ScrollLink = Scroll.Link;
const Element = Scroll.Element;

const meta = {
  description: 'The ultimate bank of interactive and course-specific study resources.',
  title: 'Studyform',
};

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: [],
      notificationBar: true,
    }

    this.hideNotificationBar = this.hideNotificationBar.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
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
        console.log(hit);
        return {
          code: hit.code,
          school_code: hit.school_code,
          school_name: hit.school_name,
          code_label_highlighted: hit._highlightResult.code_label.value,
          school_name_highlighted: hit._highlightResult.school_name.value,
          label_highlighted: hit._highlightResult.label.value,
        };
      });
      this.setState({ suggestions, suggestionsDropdownOn: true });
    });
  }

  render() {
    const schoolCodes = ['ucberkeley', 'ucsandiego', 'gatech'];
    const schoolLabels = ['UC Berkeley', 'UC San Diego', 'Georgia Tech'];
    const schoolCards = map(schoolCodes, (schoolCode, key) => {
      return (
        <Link key={key} className="card" to={"/" + schoolCode} onClick={() => schoolClickEvent(schoolCode)}>
          <span>{schoolLabels[key]}</span>
          <span className="card-arrow">&#8594;</span>
        </Link> 
      );
    });
    const subjectCards = [(
      <Link key={"math"} className="card" to={"/math"}>
        <span>Mathematics</span>
        <span className="card-arrow">&#8594;</span>
      </Link>
    )];

    const searchResults = (this.state.suggestions.length > 0) ? (
      <div className="results-container">
        <div className="results">
        {map(this.state.suggestions, (suggestion, index) => {
          const suggestionText = `${suggestion.school_name_highlighted} ${suggestion.code_label_highlighted} - ${suggestion.label_highlighted}`;
          return <Link key={index} to={`/${suggestion.school_code}/${toUpper(suggestion.code)}`} dangerouslySetInnerHTML={{__html: suggestionText}}></Link>;
        })}
        </div>
      </div>
    ) : null;

    return (
      <div className="home">
        <DocumentMeta {...meta} />
				{!this.state.notificationBar || (
          <div className="dark-gray center">
						<hr className="s2" />
						<a className="material-icons notification-x" onClick={this.hideNotificationBar}>close</a>
						<p className="white-text notification-text">Need help studying for a math exam? Message our Facebook <a className="header-link" href="https://www.facebook.com/studyformapp/" target="_blank">page</a> for free tutoring!</p>
						<hr className="s2" />
					</div>)}
        <div className="banner">
          <Navbar home={true} />
          <div className="banner-img"></div>
          <div className="banner-text">
            <div className="banner-header">Make Studying Easy</div>
            <hr className="s2" />
            <h5 className="h5-alt">Find past exams and practice problems to solve and discuss online</h5>
            <hr className="s5" />
						<div className="search-container">
							<div className="material-icons search-icon">search</div>
              <input className="search" name="search" ref="search" placeholder="Search for your course here (e.g. CS 61A, Math 1B, Econ 100)." type="text" autoComplete="off" onChange={this.getSuggestions} />
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
        <Element name="features" className="features">
          <div className="center">
            <hr className="s7-5" />
            <h4 className="center">Features</h4>
            <hr className="s3" />
            <div className="column">
              <div className="material-icons">touch_app</div>
              <h1>Interactive</h1>
              <hr className="s2" />
              <p>Use interactive elements like solution toggling and a navigation menu to check your answers online and save time.</p>
              <hr className="s1" />
            </div>
            <div className="column">
              <div className="material-icons">people</div>
              <h1>Collaborative</h1>
              <hr className="s2" />
              <p>Post a question or comment on any practice problem and discuss with other students studying the same topics.</p>
              <hr className="s1" />
            </div>
            <div className="column">
              <div className="material-icons">view_carousel</div>
              <h1>Responsive</h1>
              <hr className="s2" />
              <p>If you need to study on the go, our interface is intuitive and legible with any device type and any screen width.</p>
              <hr className="s1" />
            </div>
            <hr className="s7-5" />
          </div>
        </Element>
        <Element name="schools" className="light-gray schools">
          <hr className="s7-5" />
          <h4 className="center">Schools</h4>
          <hr className="s1" />
          <h5>Browse resources by school</h5>
          <hr className="s3" />
          <div className="card-container">
            {schoolCards}
            <hr className="s7-5" />
          </div>
        </Element>
        <Element name="subjects" className="schools">
          <hr className="s7-5" />
          <h4 className="center">Subjects</h4>
          <hr className="s1" />
          <h5>Browse resources by subject</h5>
          <hr className="s3" />
          <div className="card-container">
            {subjectCards}
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
