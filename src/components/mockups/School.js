import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import loadjs from 'loadjs';
import { keys, identity, map, sortBy } from 'lodash';
import DocumentMeta from 'react-document-meta';
import Navbar from '../navbar';

const meta = {
  description: 'List of Schools',
  title: 'Schools',
};

class SchoolComponent extends Component {
  render() {
    const schoolCode = this.props.schoolCode;
    const schoolLabel = this.props.labels.schools[schoolCode];
    return (
      <div className="school">
        <DocumentMeta {...meta} />
        <Navbar /> 
        <div className="gray-nav">
          <div className="container">
            <a>Home</a> > <a>{schoolLabel}</a>
          </div>
        </div>
        <div className="card-container-container">
          <div className="card-container center">
            <div className="container">
              <div className="center">
                <h4>{schoolLabel}</h4>
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

const mapStateToProps = (state, ownProps) => {
  return {
    schoolCode: ownProps.match.params.schoolCode,
    labels: state.labels,
  };
};

const School = connect(
  mapStateToProps
)(SchoolComponent);

export default School;
