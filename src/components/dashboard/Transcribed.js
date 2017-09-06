import React, { Component } from 'react';
import classnames from 'classnames';
import { map } from 'lodash';
import { MultipleChoiceQuestion, Question } from '../question';

class Transcribed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: null,
      exams: null,
      renderedContent: null,
      success: null,
      selectedid: null,
    }
  }

  componentDidMount() {
    fetch('/getTranscribedExams').then(
      (response) => response.json()
    ).then((examsJson) => {
      fetch('/getTranscribedContentDict').then(
        (response) => response.json()
      ).then(contentJson => this.setState({ exams: examsJson, content: contentJson }));
    });
  }

  componentDidUpdate() {
    window.renderMJ();
  }

  renderContent(id) {
    const renderedContent = map(this.state.content[id], (item, key) => {
      if (item.choices) {
        return <MultipleChoiceQuestion key={key}
                content={item.problem}
                choices={item.choices}
                solutionNum={item.solution} />;
      }
      return <Question key={key}
              content={item.problem}
              solution={item.solution} />;
    });
    this.setState({ renderedContent, selectedid: id });
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

    const { exams } = this.state;
    const examsList = map(exams, (exam, key) => {
      return <div key={key} className="exam-list"><a className={classnames({"active": key === this.state.selectedid})} onClick={() => this.renderContent(key)}>{exam.school_name}: {exam.course_code} - {exam.type_label}, {exam.term_label}</a>
        <hr className="s2" />
        <button className="approve-button" onClick={() => this.approveContent(key)}>Approve</button>
      </div>;
    });
    return (
      <div className="admin-general">
        <div className="admin-nav">
          <a className="admin-link" href="/dashboard">TRANSCRIBE</a>
          <a className="admin-link admin-link-active" href="/dashboard/transcribed">APPROVE</a> 
          <a className="admin-link" href="/dashboard/courses">COURSES</a>
          <a className="admin-link" href="/dashboard/problems">PROBLEMS</a>
          <a className="admin-link" href="/dashboard/comments">COMMENTS</a>
        </div>
        <hr className="s1" />
        <div className="adjust">
          <p className='success'>{this.state.success}</p>
          <span className='col transcribed-container'>
            <h1 className="transcribed-header">TRANSCRIPTIONS</h1>
            <div className="transcribed-col">
              {examsList}
            </div>
          </span>
          <span className='col content-col'>
            <h1 className="transcribed-header">PREVIEW</h1>
            <div className="transcribed-content">
              {this.state.renderedContent}
            </div>
          </span>
          <span className="col val-container">
            <h1 className="transcribed-header">TRANSCRIPTION</h1>
            <textarea className="transcribed-val" value={map(this.state.renderedContent, (content) => content.props.content + "\n\n" + content.props.solution + "\n\n\n\n\n")}></textarea>
          </span>
        </div>
      </div>
    );
  }
}

export default Transcribed;
