import React, { Component } from 'react';
import { CS61CFa15, CS61CFa16, EE16ASp15, EE16AFa15, EE16AFa16, EE16ASp16 } from './exams';
import classnames from 'classnames';
import Home from './Home';
import Course from './Course';

const _ = require('lodash');

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebar: true,
    };
  }

  toggleCollapse() {
    this.setState({
      sidebar: !this.state.sidebar
    });
    if (this.state.sidebar) {
      document.body.style.left = '-125px';
    } else {
      document.body.style.left = '0';
    }
  }

  render() {
    var exam = null;
    if (this.props.location.query) {
      exam = this.props.location.query.id;
    }

    if (exam === 'cs61cfa16') {
      exam = <CS61CFa16 />;
    } else if (exam === 'cs61cfa15') {
      exam = <CS61CFa15 />;
    } else if (exam === 'ee16afa16') {
      exam = <EE16AFa16 />;
    } else if (exam === 'ee16asp16') {
      exam = <EE16ASp16 />;
    } else if (exam === 'ee16afa15') {
      exam = <EE16AFa15 />;
    } else if (exam === 'ee16asp15') {
      exam = <EE16ASp15 />;
    } else {
      return <Home />;
    }

    const collapserClass = classnames({
      collapse: true,
      iscollapsed: !this.state.sidebar
    });
    const collapser = (
      <a className={collapserClass} onClick={() => this.toggleCollapse()}>&#9776; {(this.state.sidebar) ? "COLLAPSE" : "MENU"}</a>
    );

    const menuClass = classnames({
      menu: true,
      hidden: !this.state.sidebar
    });

    const urls = ["ee16afa16", "ee16asp16", "ee16afa15", "ee16asp15"];
    const titles = ["Fall 2016", "Spring 2016", "Fall 2015", "Spring 2015"];

    const sideTabs = _.range(urls.length).map((index) => {
      const url = `/exam?id=${urls[index]}`;
      const title = titles[index];
      const sideTabClass = classnames({
        sidetab: true,
        active: false,
      });
      return (
        <div key={index} className="sidetab-container">
          <a className={sideTabClass} href={url}>{title}</a>
        </div>
      );
    });

    return (
      <span className="shift">
        <a className="return" href="/?course=ee16a">&#8592; RETURN</a>
        {collapser}
        <div className={menuClass}>
          <a className="home center" href="/">Mavenform</a>
          <hr className="s1" />
          <h4>EE 16A</h4>
          <hr className="s2" />
          <div className="sidetitle">Midterm 1</div>
          {sideTabs}
          <a className="index" href="/?course=ee16a">&#8592; RETURN</a>
        </div>
        <a className="feedback" href="https://goo.gl/forms/JVXIpJ3TVhYNxMQW2" target="_blank">FEEDBACK?</a>
        <div className="test-container">
          <div className="test">
            <hr className="margin" />
              {exam}
            <hr className="margin" />
          </div>
        </div>
      </span>
    );
  }
}

export default App;
