import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import loadjs from 'loadjs';
import { keys, identity, map, sortBy } from 'lodash';
import DocumentMeta from 'react-document-meta';

const meta = {
  description: 'Campus Ambassador program',
  title: 'Marketing',
};

class Marketing extends Component {
  render() {
    return (
      <div className="marketing">
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
        <div className="card-container-container">
          <div className="card-container center">
            <div className="container">
              <h4>Marketing Intern</h4>
              <h5>Growth Strategy and Campus Ambassadorship</h5>
              <hr className="margin" />
              <div className="left-content">
                <h1>Description</h1>
                <p>We are looking for marketing interns to spearhead growth strategy for Studyform at your college or university campus. You will need to be both resourceful and versatile, as your responsibilities will range from strategy and research to social media outreach and direct marketing.
                  <hr className= "s1" />
                  As a marketing intern, you will research and analyze studying trends on your campus, formulate and design an optimized growth strategy, and then execute on that strategy through multiple marketing channels. You can expect to impact up to thousands of users.
                </p>
                <hr className="s5" />
                <h1>Application</h1>
                <hr className= "s1" />
                <label>Resume</label>
                <hr className= "s1" />
                <input className="gray" type="button" value="Attach Resume" />
                <hr className= "s3" />
                <label>Name</label>
                <hr className= "s1" />
                <input type="text" className="marketing-info" />
                <hr className= "s2" />
                <label>Email</label>
                <hr className= "s1" />
                <input type="text" className="marketing-info" />
                <hr className= "s2" />
                <label>School</label>
                <i>You must be on or within traveling distance of your campus over the summer.</i>
                <hr className= "s1" />
                <input type="text" className="marketing-info" />
                <hr className= "s2" />
                <label>Please describe a past experience that demonstrates your work ethic.</label>
                <i>200 word limit.</i>
                <hr className= "s1" />
                <textarea rows="10" className="marketing-info" />
                <hr className= "s2" />
                <label>Please describe a past experience that demonstrates your resourcefulness.</label>
                <i>200 word limit.</i>
                <hr className= "s1" />
                <textarea rows="10" className="marketing-info" />
                <hr className= "s3" />
                <button className="marketing-button blue">
                  Submit Application
                </button>
              </div>
              <div className="right-info">
                <h1>Duration</h1>
                <p>Summer 2017</p>
                <hr className="s5" />
                <h1>Compensation</h1>
                <p>\$<span>1200 + </span>\$<span>100 per 300 users acquired</span></p>
                <hr className="s5" />
                <h1>Location</h1>
                <p>Your Campus</p>
              </div>
            </div>
            <hr className="margin" />
          </div>
        </div>
      </div>
    );
  }
}

export default Marketing;
