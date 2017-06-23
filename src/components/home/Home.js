import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import { endsWith, map } from 'lodash';
import Footer from '../footer';
import Navbar from '../navbar';
import { schoolClickEvent } from '../../events';
import isEmail from 'validator/lib/isEmail';

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

    this.state = {
      suggestions: [],
      waitlistErorr: null,
    };

    this.waitlist = this.waitlist.bind(this);
  }

  componentWillMount() {
    if (this.props.auth.loggedIn()) {
      this.props.history.push('/home'); 
    }
  }

  waitlist(e) {
    e.preventDefault();
    const email = this.refs.email.value;
    if (!isEmail(email))
      return this.setState({ waitlistError: "Invalid or empty email." });
    if (!endsWith(email, ".edu"))
      return this.setState({ waitlistError: "Enter an .edu email." });

    this.setState({ waitlistError: null });
    request
      .post("/addToWaitlist")
      .send({ email })
      .end((err, res) => {
        if (err || !res.ok) this.setState({ waitlistError: "Waitlist failed." });
        else document.location = "/waitlisted";
        return;
      });
  }

  render() {
    const schoolCodes = ['ucberkeley', 'ucsandiego', 'gatech', 'columbia', 'iastate', 'psu', 'caltech', 'indiana', 'tamu', 'ucla', 'uow', 'washington'];
    const schoolLabels = ['UC Berkeley', 'UC San Diego', 'Georgia Tech', 'Columbia', 'Iowa State', 'Penn State', 'Caltech', 'Indiana University', 'Texas A&M', 'UCLA', 'University of Waterloo', 'University of Washington'];
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
            <div className="search-container">
              <input className="search" name="search" placeholder="Enter school email address" type="text" autoComplete="off" ref="email"/>
              <input className="early-access" type="submit" value="Get Early Access" onClick={(e) => this.waitlist(e)} />
            </div>
            <p className="home-error">{this.state.waitlistError}</p>
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
