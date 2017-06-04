import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { closeNotificationBar } from '../../actions';
import { learnMoreEvent, viewCoursesEvent } from '../../events';
import Screen from './screen.png';

const Scroll = require('react-scroll');
const Element = Scroll.Element;

const meta = {
  description: 'Mavenform is a new and intuitive format to view and study past exams currently serving thousands of students at UC Berkeley.',
  title: 'Studyform',
};

const HomeComponent = ({ notificationBar, onCloseNotificationBar }) => {
  return (
    <div className="home">
      <DocumentMeta {...meta} />
      {/* NOTIFICATION BAR
      (notificationBar) ? (
        <div className="dark-gray center">
          <hr className="s2" />
          <a className="material-icons notification-x" onClick={() => onCloseNotificationBar()}>close</a>
          <p className="white-text notification-text">Courses now updated with final exams! Check the courses page to see if your course has been updated.</p>
          <hr className="s2" />
        </div>
      ) : (null)
      */}
      {/* SIGN UP MODAL
      <div className="modal-container">
        <div className="modal-and-helper">
          <div className="modal">
            <div className="modal-header">
              <img className="modal-logo" src="/img/logo.svg" />
            </div>
            <div className="modal-content">
              <hr className="s3"/>
              <a className="login-button login-button-f" href="/userhome">
                <img className="f-logo" src="/img/f-logo/FB-f-Logo__white_100.png" />
                <span> Continue with Facebook </span> 
              </a>
              <hr className="s1" />
              <a className="login-button login-button-g" href="/userhome">
                <img className="g-logo" src="/img/g-logo.png" />
                <span> Continue with Google </span> 
              </a>
              <hr className="s2" />
              <div className="divider"> 
                <div className="divider-or"> OR </div>
              </div>
              <hr className="s4" />
              <input className="login-info" type="text" placeholder="Email"/>
              <hr className="s1" />
              <input className="login-info" type="password" placeholder="Password"/>
              <hr className="s2" />
              <p className="forgot-pass">
                <a className="forgot-pass">Don't remember your password?</a>
              </p>
              <hr className="s2" />
              <a className="login-button blue" href="/userhome">Log In</a>
              <hr className="s3" />
            </div>
          </div>
          <hr className="s2" />
          <div className="login-helper">
            <span> Don't have an account? </span>
            <a> Sign up! </a>
          </div>
        </div>
        <a className="x"><img src="/img/x.svg"></img></a>
      </div>
      */}
      {/* SIGN UP MODAL
      <div className="modal-container">
        <div className="modal-and-helper">
          <div className="modal">
            <div className="modal-header">
              <img className="modal-logo" src="/img/logo.svg" />
            </div>
            <div className="modal-content">
              <hr className="s3"/>
              <a className="login-button login-button-f" href="/userhome">
                <img className="f-logo" src="/img/f-logo/FB-f-Logo__white_100.png" />
                <span> Continue with Facebook </span> 
              </a>
              <hr className="s1" />
              <a className="login-button login-button-g" href="/userhome">
                <img className="g-logo" src="/img/g-logo.png" />
                <span> Continue with Google </span> 
              </a>
              <hr className="s2" />
              <div className="divider"> 
                <div className="divider-or"> OR </div>
              </div>
              <hr className="s4" />
              <input className="login-info" type="text" placeholder="Email"/>
              <hr className="s1" />
              <input className="login-info" type="text" placeholder="Username"/>
              <hr className="s1" />
              <input className="login-info" type="password" placeholder="Password"/>
              <hr className="s3" />
              <a className="login-button blue" href="/userhome">Sign Up</a>
              <hr className="s3" />
            </div>
          </div>
          <hr className="s2" />
          <div className="login-helper">
            <span> Already have an account? </span>
            <a> Log in! </a>
          </div>
        </div>
        <a className="x"><img src="/img/x.svg"></img></a>
      </div>
      */}
      <div className="home-nav">
        <div className="container">
          <a href="..">
            <img className="logo home-logo" src="/img/logo.svg" />
          </a>
          <a className="home-button home-button-alt" href="/userhome">Log In</a>
          <a className="home-button" href="/userhome">Sign Up</a>
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
            <input className="search" name="search" placeholder="Search for your course to see what study resources are available..." type="text" autoComplete="off" />
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
          <a className="card" href="/school">
            <span>UC Berkeley</span>
            <span className="card-arrow">&#8594;</span>
          </a>
          <a className="card" href="/school">
            <span>UC San Diego</span>
            <span className="card-arrow">&#8594;</span>
          </a>
          <a className="card" href="/school">
            <span>UC Los Angeles</span>
            <span className="card-arrow">&#8594;</span>
          </a>
          <div className="card" href="/school">
            <span>Stanford</span>
            <span className="card-arrow">&#8594;</span>
          </div>
          <a className="card" href="/school">
            <span>MIT</span>
            <span className="card-arrow">&#8594;</span>
          </a>
          <a className="card" href="/school">
            <span>Princeton</span>
            <span className="card-arrow">&#8594;</span>
          </a>
          <hr className="margin-plus" />
        </div>
      </Element>
      <div className="footer-holder">
      </div>
      <div className="blue center footer">
        <hr className="s2" />
        <p className="white-text">Made for Students by Students</p>
        <hr className="s2" />
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    notificationBar: state.home.notificationBar,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCloseNotificationBar: () => {
      dispatch(closeNotificationBar())
    }
  }
};

const Home = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComponent);

export default Home;
