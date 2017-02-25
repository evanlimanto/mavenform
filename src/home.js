import React, { Component } from 'react';
import { handleEvent } from '../src/utils';

class Home extends Component {
  render() {
    return (
      <div>
        <a className="feedback home-link" href="https://goo.gl/forms/JVXIpJ3TVhYNxMQW2" target="_blank">FEEDBACK?</a>
        <div className="banner">
          <hr className="margin" />
          <h6>Mavenform</h6>
          <hr className="s2" />
          <div className="center">
            <h5 className="h5-alt">A new and intuitive format to view and study past exams</h5>
          </div>
          <hr className="margin" />
        </div>
        <div className="card-container center">
          <hr className="margin-alt" />
          <h1 className="center">Courses</h1>
          <hr className="s1" />
          <h5>Currently available exam sets</h5>
          <hr className="s2" />
          <a className="course-card" href="/course?id=ee16a" onClick={() => handleEvent('Click', 'Course', 'CS 61C')}>
            <h2>EE 16A</h2>
            <hr className="s1" />
            <i className="course-subtitle">Designing Information Devices and Systems I</i>
            <h4 className="card-helper">CLICK TO VIEW &#8594;</h4>
          </a>
          <a className="course-card" href="/course?id=cs61c" onClick={() => handleEvent('Click', 'Course', 'CS 61C')}>
            <h2>CS 61C</h2>
            <hr className="s1" />
            <i className="course-subtitle">Great Ideas in Computer Architecture </i>
            <h4 className="card-helper">CLICK TO VIEW &#8594;</h4>
          </a>
          <hr className="margin-alt" />
        </div>
        <div className="light-gray center">
          <hr className="margin-alt" />
          <h1 className="center">Features</h1>
          <hr className="s1" />
          <h5>Why view exams in Mavenform?</h5>
          <hr className="s4" />
          <div className="column">
            <h2>Interactive</h2>
            <hr className="s2" />
            <p>Use interactable elements like solution toggling and a live table of contents to make it easier and faster to check your answers and find specific problems.</p>
            <hr className="s1" />
          </div>
          <div className="column">
            <h2>Responsive</h2>
            <hr className="s2" />
            <p>No more need to zoom in and pan around. Unlike static document types, Mavenform is intuitive and legible with any device type and any screen width.</p>
            <hr className="s1" />
          </div>
          <div className="column">
            <h2>Navigable</h2>
            <hr className="s2" />
            <p>Instead of struggling to manage 10 or more tabs of individual PDFs, just browse a single web app that easily navigates between any relevant exam.</p>
            <hr className="s1" />
          </div>
          <hr className="margin-alt" />
        </div>
        <div className="banner center">
          <hr className="s2" />
          <p className="white-text">Made by <a className="footer-link" href="http://www.kevinandstuff.com/" target="_blank">Kevin</a> & <a className="footer-link" href="http://evanlimanto.github.io/" target="_blank">Evan</a></p>
          <hr className="s2" />
        </div>
      </div>
    );
  }
}

export default Home;
