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
      return <div key={key}><a className={classnames({"active": key === this.state.selectedid})} onClick={() => this.renderContent(key)}>{exam.school_name}: {exam.course_code} - {exam.term_label}</a><button className='approve' onClick={() => this.approveContent(key)}>Approve</button></div>;
    });
    return (
      <div>
        <p className='success'>{this.state.success}</p>
        <span className='col'>
          <h1>Transcribed Exams</h1>
          {examsList}
        </span>
        <textarea value={map(this.state.renderedContent, (content) => content.props.content + "\n" + content.props.solution)}></textarea>
        <span className='col' style={{ "width": "50%" }}>
          {this.state.renderedContent}
        </span>
      </div>
    );
  }
}

export default Transcribed;
