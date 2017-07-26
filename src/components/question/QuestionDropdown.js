import React, { Component } from 'react';
import copy from 'copy-to-clipboard';
import classnames from 'classnames';

import { BASE_URL } from '../../utils';
import { copyQuestionLinkEvent } from '../../events';
import Expire from './Expire';
import { Modal } from '../modal';

const req = require('superagent');

class QuestionDropdown extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      copying: false,
      showReportModal: false,
    };

    this.setCopied = this.setCopied.bind(this);
    this.copyQuestionLink = this.copyQuestionLink.bind(this);
    this.doneCopyingLink = this.doneCopyingLink.bind(this);
    this.showReportModal = this.showReportModal.bind(this);
    this.closeReportModal = this.closeReportModal.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.reportError = this.reportError.bind(this);
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
    const dropdownElement = document.getElementById("dropdown-" + this.props.content_id);
    if (!dropdownElement.classList.contains("hidden"))
      dropdownElement.classList.add("hidden");
  }

  showReportModal() {
    this.setState({ showReportModal: true });
  }

  closeReportModal() {
    this.setState({ showReportModal: false });
  }

  reportError(e, content_id) {
    e.preventDefault();

    const error_content = this.refs.error_content.value;
    const self = this;
    req.post('/reportError')
      .send({ content_id, error_content })
      .end((err, res) => {
        if (err || !res.ok) console.error(err);
        else self.closeReportModal();
      });
  }

  componentDidMount() {
    const copylinkElement = document.getElementById("copylink-" + this.props.content_id);
    const dropdownToggleElement = document.getElementById("dropdowntoggle-" + this.props.content_id);
    const dropdownElement = document.getElementById("dropdown-" + this.props.content_id);
    document.addEventListener('click', (evt) => {
      if (!copylinkElement.contains(evt.target) && !dropdownToggleElement.contains(evt.target) && !dropdownElement.contains(evt.target) ) {
        dropdownElement.classList.add("hidden");
      }
    });
  }

  toggleDropdown() {
    const dropdownElement = document.getElementById("dropdown-" + this.props.content_id);
    if (dropdownElement.classList.contains("hidden"))
      dropdownElement.classList.remove("hidden");
    else
      dropdownElement.classList.add("hidden");
  }

  render() {
    const { id, content_id, schoolCode, courseCode, examType, termCode } = this.props;

    let reportModal = null;
    if (this.state.showReportModal) {
      const headerContent = (<h1>Report Error</h1>);
      const infoContent = (<div></div>);
      const modalContent = (
        <span>
          <hr className="s3" />
          <input className="login-info" type="text" placeholder="Please describe the typo or error here..." ref="error_content"/>
          <hr className="s2" />
          <a className="login-button blue" onClick={(e) => this.reportError(e, content_id)}>Report</a>
        </span>
      );
      reportModal = <Modal closeModal={this.closeReportModal} headerContent={headerContent} infoContent={infoContent} modalContent={modalContent} />;
    }

    const url = `${BASE_URL}/${schoolCode}/${courseCode}/${examType}/${termCode}#${id}`;

    return (
      <div className="tooltip-container">
        {reportModal}
        <a onClick={this.toggleDropdown} className="arrow material-icons" id={"dropdowntoggle-" + content_id}>keyboard_arrow_down</a>
        <div className="question-options hidden" id={"dropdown-" + content_id}>
          <a className={classnames({"question-option": true, "hidden": this.state.copying})} onClick={(e) => this.copyQuestionLink(e, url)} id={"copylink-" + content_id}>
            <span className="material-icons">link</span>
            <span>Copy Link</span>
          </a>
          {!this.state.copying || <Expire delay={1000} callback={this.doneCopyingLink}>
              <span className="question-option copied">
                <span className="material-icons">link</span>
                <span>Copied!</span>
              </span>
            </Expire>}
          <a onClick={this.showReportModal} className="question-option">
            <span className="material-icons">report</span>
            <span>Report Error</span>
          </a>
        </div>
      </div>
    );
  }
}

export default QuestionDropdown;
