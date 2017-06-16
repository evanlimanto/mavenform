import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import { map, toLower } from 'lodash';
import Footer from '../footer';
import Navbar from '../navbar';
import { algoliaCourseIndex } from '../../utils';

const Scroll = require('react-scroll');
const ScrollLink = Scroll.Link;
const Element = Scroll.Element;

const meta = {
  description: 'Mavenform is a new and intuitive format to view and study past exams currently serving thousands of students at UC Berkeley.',
  title: 'Studyform',
};

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.getSuggestions = this.getSuggestions.bind(this);
    this.state = {
      suggestions: []
    };
  }

  componentWillMount() {
    if (this.props.auth.loggedIn()) {
      this.props.history.push('/home'); 
    }
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
    const schools = ['ucberkeley', 'ucsandiego', 'stanford'];
    const schoolLabels = ['UC Berkeley', 'UC San Diego', 'Stanford'];
    const schoolCards = map(schools, (school, key) => {
      return (
        <Link key={key} className="card" to={"/" + school}>
          <span>{schoolLabels[key]}</span>
          <span className="card-arrow">&#8594;</span>
        </Link> 
      );
    });
    const suggestions = this.state.suggestions;
    const searchResults = (suggestions && suggestions.length > 0) ? (
      <div className="results-container">
        <div className="results">
          {map(suggestions, (suggestion, index) => {
            const aClass = classnames({ bottom: index === suggestions.length - 1 });
            const suggestionText = `${suggestion.school_name_highlighted} ${suggestion.code_highlighted}: ${suggestion.name_highlighted}`;
            return <Link to={`/${suggestion.school_code}/${toLower(suggestion.code)}`} className={aClass} dangerouslySetInnerHTML={{__html: suggestionText}}></Link>;
          })}
        </div>
      </div>
    ) : null;

    return (
      <div className="home">
        <DocumentMeta {...meta} />
        <Navbar home={true} />
        <div className="banner">
          <div className="banner-img"></div>
          <div className="banner-text">
            <div className="banner-header">Make Studying Easy</div>
            <hr className="s2" />
            <h5 className="h5-alt">The ultimate bank of interactive and course-specific study resources</h5>
            <div className="search-container">
              <input className="search" name="search" placeholder="Enter school email address" type="text" autoComplete="off"/>
              <input className="early-access" type="submit" value="Get Early Access" />
            </div>
            <div>
              <ScrollLink className="search-link" to="features" spy={true} smooth={true} duration={500}> 
                <div className="material-icons">info_outline</div>
                Learn More 
              </ScrollLink>
              <ScrollLink className="search-link" to="schools" spy={true} smooth={true} duration={500}> 
                <div className="material-icons school">school</div>
                View Schools 
              </ScrollLink>
            </div>
            <img className="banner-screen" src="img/screen.png" alt="banner" />
          </div>
        </div>
        <Element name="features" className="features">
          <div className="center">
            <hr className="margin" />
            <h4 className="center">Features</h4>
            <hr className="s1" />
            <h5>What's different about Studyform</h5>
            <hr className="s3" />
            <div className="column">
              <div className="material-icons">touch_app</div>
              <h1>Interactive</h1>
              <hr className="s2" />
              <p>Use interactable elements like solution toggling and a live table of contents to make it easier to check practice exam answers and review notes.</p>
              <hr className="s1" />
            </div>
            <div className="column">
              <div className="material-icons">view_carousel</div>
              <h1>Responsive</h1>
              <hr className="s2" />
              <p>No more need to zoom in and pan around. Unlike PDFs or other formats, Studyform is intuitive and legible with any device type and any screen width.</p>
              <hr className="s1" />
            </div>
            <div className="column">
              <div className="material-icons">navigation</div>
              <h1>Navigable</h1>
              <hr className="s2" />
              <p>Instead of struggling to manage 10 or more tabs of individual PDFs, just browse a single web app that easily navigates between any relevant resource.</p>
              <hr className="s1" />
            </div>
            <hr className="margin-plus" />
          </div>
        </Element>
        <Element name="schools" className="light-gray schools">
          <hr className="margin" />
          <h4 className="center">Schools</h4>
          <hr className="s1" />
          <h5>Currently supported schools</h5>
          <hr className="s3" />
          <div className="card-container">
            {schoolCards}
            <hr className="margin-plus" />
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
