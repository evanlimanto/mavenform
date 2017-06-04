import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import loadjs from 'loadjs';
import { keys, identity, map, sortBy } from 'lodash';
import DocumentMeta from 'react-document-meta';

const meta = {
  description: 'Home that a signed in user sees',
  title: 'Home',
};

class UserHome extends Component {
  render() {
    return (
      <div className="userhome">
        <DocumentMeta {...meta} />
        <div className="nav">
          <div className="container">
            <a href="..">
              <img className="logo" src="/img/logo.svg" />
            </a>
            <input className="nav-search nav-search-signed-in" name="search" placeholder="Search courses..." type="text" autoComplete="off">
            </input>
            <div className="material-icons nav-search-icon">search</div>
            <p className="nav-button nav-signed-in">
              <div className="material-icons signed-in-icon">person</div>
              kevintxwu
              <div className="material-icons signed-in-arrow">keyboard_arrow_down</div>
            </p>
          </div>
        </div>
        <div className="card-container-container">
          <div className="card-container center">
            <div className="container">
              <div className="center">
                <h4>Dashboard</h4>
                <h5>Your bookmarked courses</h5>
              </div>
            </div>
            <hr className="s5" />
            <div className="card-container">
              <a className="card course-card">
                <span>CS 61A</span>
                <span className="card-arrow">&#8594;</span>
              </a>
              <a className="card course-card">
                <span>CS 61B</span>
                <span className="card-arrow">&#8594;</span>
              </a>
              <a className="card course-card">
                <span>CS 61C</span>
                <span className="card-arrow">&#8594;</span>
              </a>
              <a className="card course-card add-course">
                <span>+ Add course</span>
              </a>
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

export default UserHome;
