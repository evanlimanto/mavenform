import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import { endsWith, map } from 'lodash';
import cookies from 'browser-cookies';
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
        else {
          cookies.set('waitlist_email', email, { expires: 1 });
          document.location = "/waitlisted";
        }
        return;
      });
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
							<input type="text" className="search" name="search" placeholder="Search for your course to see what study resources are available..." autocomplete="off" />
              <div className="material-icons search-icon">search</div>
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
            {/*<img className="banner-screen" src="img/screen.png" alt="banner" />*/}
          </div>
        </div>
        <Element name="features" className="features">
          <div className="center">
            <hr className="margin" />
            <h4 className="center">Features</h4>
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
            <div>
              <span className="feature-column">
                <img src="/img/exam.png" className="feature-image-one" />
                <div className="feature-caption">Study and discuss individual exam problems with your classmates.</div>
              </span>
              <span className="feature-column">
                <img src="/img/course.png" className="feature-image-two" />
                <div className="feature-caption">Learn from banks of past exams for all your courses.</div> 
              </span>
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
