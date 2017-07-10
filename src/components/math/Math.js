import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { map, sortBy } from 'lodash';
import DocumentMeta from 'react-document-meta';

import Footer from '../footer';
import Navbar from '../navbar';
import NotFound from '../notfound';

class Math extends Component {
  constructor(props) {
    super(props);

    this.state = {
      math_topics: null
    };

    this.getCourseItems = this.getCourseItems.bind(this);
  }

  componentDidMount() {
    fetch('/getMathTopics')
      .then((response) => response.json())
      .then((json) => this.setState({ math_topics: json }));
  }

  getCourseItems() {
    if (this.state.math_topics === null) {
      return <p className="loader">Loading content...</p>;
    }

    return map(this.state.math_topics, (obj, topic) => {
      const courseBoxes = map(sortBy(obj, [(item) => item.id]), (item, key) => {
        return (
          <Link className="card course-card" to={"/math/" + item.code} key={key}>
            <span>{item.label}</span>
            <span className="card-arrow">&#8594;</span>
          </Link>
        );
      });
      return (
        <div className="department" key={topic}>
          <h1>{topic}</h1>
          {courseBoxes}
        </div>
      );
    });
  }

  render() {
    if (this.state.courses && this.state.courses.invalidCode)
      return <NotFound />;

    const courseItems = this.getCourseItems();
    const meta = {
      description: `Mathematics interactive and course-specific study resources.`,
      title: `Mathematics - Studyform`,
    };

    return (
      <div className="school">
        <DocumentMeta {...meta} />
        <Navbar schoolCode={"math"} />
        <div className="card-container-container">
          <div className="card-container center">
            <div className="container">
              <div className="center">
                <h4>Mathematics</h4>
                <h5>Available Content</h5>
              </div>
            </div>
            <hr className="s1" />
            <div className="card-container">
              {courseItems}
            </div>
            <hr className="s2" />
            <hr className="s7-5" />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Math;
