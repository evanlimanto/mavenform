import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map, filter, keys, split } from 'lodash';
import { Question } from '../question';
import { preprocess } from '../../utils';

class TranscribedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: null,
      exams: null,
      renderedContent: null,
      success: null,
    }
  }

  componentDidMount() {
    fetch('/getTranscribedExams').then(
      (response) => response.json()
    ).then((examsJson) => {
      fetch('/getTranscribedContent').then(
        (response) => response.json()
      ).then(contentJson => this.setState({ exams: examsJson, content: contentJson }));
    });
  }

  componentDidUpdate() {
    window.renderMJ();
  }

  renderContent(id) {
    const renderedContent = map(this.state.content[id], (item, key) => {
      return <Question key={key}
              content={preprocess(item.problem)}
              solution={preprocess(item.solution)} />;
    });
    this.setState({ renderedContent });
  }

  approveContent(id) {
    fetch(`/approveTranscription/${id}`).then(
      (res, err) => {
        if (err) console.error(err);
        else this.setState({ success: 'Success!' });
      });
  }

  render() {
    if (!this.state.exams || !this.state.content) {
      return <div>No data yet.</div>;
    }

    const { exams, content } = this.state;
    const examsList = map(exams, (exam, key) => {
      return <div key={key}><a onClick={() => this.renderContent(key)}>{exam.school_name}: {exam.course_code} - {exam.term_label}</a><button className='approve' onClick={() => this.approveContent(key)}>Approve</button></div>;
    });
    return (
      <div>
        <p className='success'>{this.state.success}</p>
        <span className='col'>
          <h1>Transcribed Exams</h1>
          {examsList}
        </span>
        <span className='col'>
          {this.state.renderedContent}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const Transcribed = connect(
  mapStateToProps
)(TranscribedComponent);

export default Transcribed;
