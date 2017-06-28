import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import { endsWith, map, toLower } from 'lodash';
import cookies from 'browser-cookies';
import Footer from '../footer';
import Navbar from '../navbar';
import { schoolClickEvent } from '../../events';
import isEmail from 'validator/lib/isEmail';
import { algoliaCourseIndex } from '../../utils';

const request = require('superagent');
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
  }

  componentWillMount() {
    if (this.props.auth.loggedIn()) {
      this.props.history.push('/home'); 
    }
  }

  render() {
    const schoolCodes = ['ucberkeley', 'ucsandiego'];
    const schoolLabels = ['UC Berkeley', 'UC San Diego'];
    const schoolCards = map(schoolCodes, (schoolCode, key) => {
      return (
        <Link key={key} className="card" to={"/" + schoolCode} onClick={() => schoolClickEvent(schoolCode)}>
          <span>{schoolLabels[key]}</span>
          <span className="card-arrow">&#8594;</span>
        </Link> 
      );
    });

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
            <hr className="s5" />
						<div className="search-container">
							<div className="material-icons search-icon">search</div>
              <input className="search" name="search" placeholder="Search for your course or for specific subjects and topics..." type="text" autoComplete="off" ref="search" />
            </div>
            <div className="results-container">
              <div className="results">
                <a>options</a>
                <a>options</a>
              </div>
            </div>
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
              <p>Use interactive elements like solution toggling and live discussion to upgrade your studying experience.</p>
              <hr className="s1" />
            </div>
            <div className="column">
              <div className="material-icons">view_carousel</div>
              <h1>Responsive</h1>
              <hr className="s2" />
              <p>No more need to zoom in and pan around. Studyform is intuitive and legible with any device type and any screen width.</p>
              <hr className="s1" />
            </div>
            <div className="column">
              <div className="material-icons">navigation</div>
              <h1>Navigable</h1>
              <hr className="s2" />
              <p>Instead of struggling to search for and wrangle hundreds of PDFs, just browse through our pre-sorted directory.</p>
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
