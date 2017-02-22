import React, { Component } from 'react';
import { CS61CFa14, CS61CFa15, CS61CFa16, CS61CSp14, CS61CSp15,
         EE16ASp15, EE16AFa15, EE16AFa16, EE16ASp16 } from './exams';
import classnames from 'classnames';
import Home from './Home';
import Course from './Course';
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
    var examId = null;
    var course = null;
    if (this.props.location.query) {
      exam = this.props.location.query.id;
      examId = exam;
      course = this.props.location.query.courseId;
    }

    console.log(exam);
    if (exam === 'cs61cfa16') {
      exam = <CS61CFa16 />;
    } else if (exam === 'cs61cfa15') {
      exam = <CS61CFa15 />;
    } else if (exam === 'cs61csp15') {
      exam = <CS61CSp15 />;
    } else if (exam === 'cs61csp14') {
      exam = <CS61CSp14 />;
    } else if (exam === 'cs61cfa14') {
      exam = <CS61CFa14 />;
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

    const sideTabs = _.map(exams[course], (courseExams, examType) => {
      const content =  _.map(courseExams, (info, semester) => {
        const url = `${info['url']}&courseId=${course}`;
        const title = semester;
        const sideTabClass = classnames({
          sidetab: true,
          active: (examId === info['id']),
        });
        return (
          <div key={semester} className="sidetab-container">
            <a className={sideTabClass} href={url}>{title}</a>
          </div>
        );
      });
      return (
        <span>
          <div className="sideTitle">{_.capitalize(_.replace(examType, '-', ' '))}</div>
          {content}
        </span>
      );
    });

    return (
      <span className="shift">
        <a className="return" href={"/course?id=" + course}>&#8592; INDEX</a>
        {collapser}
        <div className={menuClass}>
          <a className="home center" href="/">Mavenform</a>
          <hr className="s1" />
          <h4>{_.toUpper(course)}</h4>
          <hr className="s1" />
          <div className="sidetab-container">
            <a className="sidetab" href={"/course?id=" + course}>Index</a>
          </div>
          <hr className="s1" />
          {sideTabs}
          <a className="index" href="/">&#8592; RETURN</a>
        </div>
        <a className="feedback" href="https://goo.gl/forms/JVXIpJ3TVhYNxMQW2" target="_blank">FEEDBACK?</a>
        <div className="test-container">
          <div className="test">
            <hr className="margin" />
            {exam}
          </div>
        </div>
      </span>
    );
  }
}

export default App;
