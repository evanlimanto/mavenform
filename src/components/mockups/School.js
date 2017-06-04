import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import loadjs from 'loadjs';
import { keys, identity, map, sortBy } from 'lodash';
import DocumentMeta from 'react-document-meta';

const meta = {
  description: 'List of Schools',
  title: 'Schools',
};

class School extends Component {
  render() {
    return (
      <div className="school">
        <DocumentMeta {...meta} />
        <div className="nav">
          <div className="container">
            <a href="..">
              <img className="logo" src="/img/logo.svg" />
            </a>
            <input className="nav-search" name="search" placeholder="Search courses..." type="text" autoComplete="off">
            </input>
            <div className="material-icons nav-search-icon">search</div>
            <a className="nav-button nav-button-alt" href="../userhome">Log In</a>
            <a className="nav-button" href="../userhome">Sign Up</a>
          </div>
        </div>
        <div className="gray-nav">
          <div className="container">
            <a>Home</a> > <a>UC Berkeley</a>
          </div>
        </div>
        <div className="card-container-container">
          <div className="card-container center">
            <div className="container">
              <div className="center">
                <h4>UC Berkeley</h4>
                <h5>Available courses</h5>
              </div>
            </div>
            <hr className="s1" />
            <div className="card-container">
              <div className="department">
                <h1>Computer Science</h1>
                <a className="card course-card" href="../cs61a">
                  <span>CS 61A</span>
                  <span className="card-arrow">&#8594;</span>
                </a>
                <a className="card course-card" href="../cs61b">
                  <span>CS 61B</span>
                  <span className="card-arrow">&#8594;</span>
                </a>
                <a className="card course-card" href="../cs61c">
                  <span>CS 61C</span>
                  <span className="card-arrow">&#8594;</span>
                </a>
              </div>
              <div className="department">
                <h1>Electrical Engineering</h1>
                <a className="card course-card" href="../ee16a">
                  <span>EE 16A</span>
                  <span className="card-arrow">&#8594;</span>
                </a>
                <a className="card course-card" href="../ee16b">
                  <span>EE 16B</span>
                  <span className="card-arrow">&#8594;</span>
                </a>
              </div>
              <div className="department">
                <h1>Math</h1>
                <a className="card course-card">
                  <span>Math 1A</span>
                  <span className="card-arrow">&#8594;</span>
                </a>
                <a className="card course-card">
                  <span>Math 1B</span>
                  <span className="card-arrow">&#8594;</span>
                </a>
                <a className="card course-card">
                  <span>Math 53</span>
                  <span className="card-arrow">&#8594;</span>
                </a>
                <a className="card course-card">
                  <span>Math 54</span>
                  <span className="card-arrow">&#8594;</span>
                </a>
              </div>
            </div>
            <hr className="s2" />
            <hr className="margin" />
          </div>
          <div className="footer-holder">
          </div>
          <div className="blue center footer">
            <hr className="s2" />
            <p className="white-text">Made for Students by Students</p>
            <hr className="s2" />
          </div>
        </div>
      </div>
    );
  }
}

export default School;
