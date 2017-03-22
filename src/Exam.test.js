import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'enzyme';
import Home from './Home';
import Courses from './Courses';
import Exam from './Exam';
import { exams } from './exams';
import { mapKeys, mapValues } from 'lodash';

it('<Home /> renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home />, div);
});

it('<Courses /> renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Courses />, div);
});

it('renders without unrendered mathjax', () => {
  mapValues(exams, (courseExams, courseid) => {
    mapValues(courseExams, (typeExams, examtype) => {
      mapValues(typeExams, (exam, id) => {
        const renderedExam = render(<Exam params={{courseid, examtype, id}} />);
      });
    });
  });
});
