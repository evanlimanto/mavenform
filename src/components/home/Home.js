import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { map, forEach } from 'lodash';
import { closeNotificationBar } from '../../actions';
import { learnMoreEvent, viewCoursesEvent } from '../../events';
import Footer from '../footer';
import Modal from '../modal';
import Screen from './screen.png';

const Scroll = require('react-scroll');
const Element = Scroll.Element;

const meta = {
  description: 'Mavenform is a new and intuitive format to view and study past exams currently serving thousands of students at UC Berkeley.',
  title: 'Studyform',
};

const APP_ID = 'NPJP92R96D'
const SEARCH_API_KEY = '22cd6e2a19445d1444df8fb7a3d00f52'
const algolia = require('algoliasearch')(APP_ID, SEARCH_API_KEY);
const index = algolia.initIndex('courses');

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: null
    };

    this.closeModal = this.closeModal.bind(this);
    this.loginModal = this.loginModal.bind(this);
    this.signUpModal = this.signUpModal.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
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
    /*
    index.search(queryStr, (err, content) => {
      forEach(content.hits, (hit) => {
        console.log(hit.school_name, hit.code, hit.course_name, hit._highlightResult);
      });
    });
    */
  }

  render() {
    const schools = ['ucberkeley', 'ucsandiego', 'uclosangeles', 'stanford', 'mit', 'princeton'];
    const schoolLabels = ['UC Berkeley', 'UC San Diego', 'UC Los Angeles', 'Stanford', 'MIT', 'Princeton'];
    const schoolCards = map(schools, (school, key) => {
      return (
        <Link key={key} className="card" to={"/" + school}>
          <span>{schoolLabels[key]}</span>
          <span className="card-arrow">&#8594;</span>
        </Link> 
      );
    });

    let modal = null;
    if (this.state.modal === 'signup') {
      modal = <Modal signUp={true} closeModal={this.closeModal} loginModal={this.loginModal} signUpModal={this.signUpModal} />;
    } else if (this.state.modal === 'login') {
      modal = <Modal signUp={false} closeModal={this.closeModal} loginModal={this.loginModal} signUpModal={this.signUpModal} />;
    }

    return (
      <div className="home">
        <DocumentMeta {...meta} />
        {modal}
        <div className="home-nav">
          <div className="container">
            <a href="..">
              <img className="logo home-logo" src="/img/logo.svg" />
            </a>
            <a className="home-button home-button-alt" onClick={this.loginModal}>Log In</a>
            <a className="home-button" onClick={this.signUpModal}>Sign Up</a>
          </div>
        </div>
        <div className="banner">
          <div className="banner-img"></div>
          <div className="banner-text">
            <div className="banner-header">Make Studying Easy</div>
            <hr className="s2" />
            <h5 className="h5-alt">The ultimate bank of interactive and course-specific study resources</h5>
            <hr className="s5" />
            <div className="search-container">
              <input className="search" name="search" placeholder="Search for your course to see what study resources are available..." type="text" autoComplete="off" onChange={this.getSuggestions} ref="search" />
              <div className="material-icons search-icon">search</div>
              <a className="search-link"> 
                <div className="material-icons">info_outline</div>
                Learn More 
              </a>
              <a className="search-link"> 
                <div className="material-icons school">school</div>
                View Schools 
              </a>
            </div>
          </div>
        </div>
        <Element name="features" className="card-container-container">
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
              <p>Instead of struggling to manage 10 or more tabs of individual PDFs, just browse a single web app that easily navigates between any relevant exam.</p>
              <hr className="s1" />
            </div>
            <img className="banner-screen" src="img/screen.png" alt="banner" />
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

export default Home;
