import React, { Component } from 'react';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';

import { copyQuestionLinkEvent } from '../../events';
import Modal from '../modal';
import Expire from './Expire';
import Solution from './Solution';

const req = require('superagent');

class QuestionComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copying: false,
      dropdown: false,
      showReportModal: false,
      showShareQuestionModal: false,
    };

    this.setCopied = this.setCopied.bind(this);
    this.copyQuestionLink = this.copyQuestionLink.bind(this);
    this.doneCopyingLink = this.doneCopyingLink.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.showReportModal = this.showReportModal.bind(this);
    this.closeReportModal = this.closeReportModal.bind(this);
    this.showShareQuestionModal = this.showShareQuestionModal.bind(this);
    this.closeShareQuestionModal = this.closeShareQuestionModal.bind(this);
  }

  setCopied(isCopying) {
    this.setState({ copying: isCopying });
  }

  copyQuestionLink(e, url) {
    e.preventDefault();
    copy(url);
    copyQuestionLinkEvent();
    this.setCopied(true);
  }

  doneCopyingLink() {
    this.setCopied(false);
  }

  toggleDropdown() {
    this.setState({ dropdown: !this.state.dropdown });
  }

  showReportModal() {
    this.setState({ showReportModal: true });
  }

  closeReportModal() {
    this.setState({ showReportModal: false });
  }

  showShareQuestionModal() {
    this.setState({ showShareQuestionModal: true });
  }

  closeShareQuestionModal() {
    this.setState({ showShareQuestionModal: false });
  }

  reportError(e, content_id) {
    e.preventDefault();

    const error_content = this.refs.error_content.value;
    req.post('/reportError')
      .send({ content_id, error_content })
      .end((err, res) => {
        if (err || !res.ok) console.error(err);
      });
  }

  render() {
    const { id, schoolCode, courseCode, examType, termCode, solution, content } = this.props;

    const SolutionComponent = <Solution solution={solution} />;
    const url = `${document.location.origin}/${schoolCode}/${courseCode}/${examType}/${termCode}#${id}`;

    let reportModal = null;
    if (this.state.showReportModal) {
      const infoContent = (
        <div className="login-helper">
          <span> Info text </span>
          <a> Info link! </a>
        </div>
      );
      const modalContent = (
        <span>
          <input className="login-info" type="text" placeholder="Content" ref="error_content"/>
          <hr className="s2" />
          <a className="login-button blue" onClick={(e) => this.reportError(e, id)}>Report</a>
        </span>
      );
      reportModal = <Modal closeModal={this.closeReportModal} infoContent={infoContent} modalContent={modalContent} />;
    }

    let shareQuestionModal = null;
    if (this.state.showShareQuestionModal) {
      const infoContent = (
        <div className="login-helper">
          <span> Info text </span>
          <a> Info link! </a>
        </div>
      );
      const modalContent = (
        <span>
          <input className="login-info" type="text" placeholder="Content" ref="error_content"/>
          <hr className="s2" />
          <a className="login-button blue" onClick={(e) => this.reportError(e, id)}>Report</a>
        </span>
      );
      shareQuestionModal = <Modal closeModal={this.closeShareQuestionModal} infoContent={infoContent} modalContent={modalContent} />;
    }

    return (
      <span>
        {reportModal}
        {shareQuestionModal}
        <div id={id} className="question">
          <div className="tooltip-container">
            <a onClick={this.toggleDropdown} className="arrow material-icons">keyboard_arrow_down</a>
              {!this.state.dropdown || (
                <div className="question-options">
                  {(!this.state.copying) ? (
                    <a className="question-option" onClick={(e) => this.copyQuestionLink(e, url)}>
                      <span className="material-icons">link</span>
                      <span>Copy Link</span>
                    </a>
                  ) : <Expire delay={1500} callback={this.doneCopyingLink}>Copied!</Expire>}
                  <a onClick={this.showReportModal} className="question-option">
                    <span className="material-icons">report</span>
                    <span>Report Error</span>
                  </a>
                  <a onClick={this.showShareQuestionModal} className="question-option">
                    <span className="material-icons">share</span>
                    <span>Share Question</span>
                  </a>
                </div>
              )}
            <div dangerouslySetInnerHTML={{__html: content}}></div>
            {SolutionComponent}
          </div>
        </div>
      </span>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    content: ownProps.content,
    solution: ownProps.solution,
  };
};

const Question = connect(
  mapStateToProps,
)(QuestionComponent);

export default Question;
