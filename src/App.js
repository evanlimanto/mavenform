import React, { Component } from 'react';
import classnames from 'classnames';
import { ExamsMap } from './exams';
import { handleEvent } from './utils';
import Home from './Home';
import { exams } from './exams';

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
    var course = null;
    var ExamComponent = null;
    if (this.props.location.query) {
      exam = this.props.location.query.id;
      course = this.props.location.query.courseId;
    }

    if (exam in ExamsMap) {
      ExamComponent = ExamsMap[exam];
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

    const sideTabs = _.map(exams[course], (courseExams, examType) => {
      const content =  _.map(courseExams, (info, semester) => {
        const url = `${info['url']}&courseId=${course}`;
        const title = semester;
        const sideTabClass = classnames({
          sidetab: true,
          active: (exam === info['id']),
        });
        return (
          <div key={semester} className="sidetab-container">
            <a className={sideTabClass} href={url}>{title}</a>
          </div>
        );
      });
      return (
        <span key={examType}>
          <div className="sideTitle">{_.capitalize(_.replace(examType, '-', ' '))}</div>
          {content}
        </span>
      );
    });

    return (
      <span className="shift">
        <a className="return" href={"/course?id=" + course} onClick={handleEvent("Click", "Exam Index", exam)}>&#8592; INDEX</a>
        {collapser}
        <div className={menuClass}>
          <a className="home center" href="/">Mavenform</a>
          <hr className="s1" />
          <h4>{_.toUpper(course)}</h4>
          <hr className="s1" />
          <div className="sidetab-container">
            <a className="sidetab" href={"/course?id=" + course} onClick={handleEvent("Click", "Home")}>Index</a>
          </div>
          <hr className="s1" />
          {sideTabs}
          <a className="index" href="/" >&#8592; RETURN</a>
        </div>
        <a className="feedback" href="https://goo.gl/forms/JVXIpJ3TVhYNxMQW2" target="_blank">FEEDBACK?</a>
        <div className="test-container">
          <div className="test">
            <hr className="margin" />
            <ExamComponent />
          </div>
        </div>
      </span>
    );
  }
}

export default App;
