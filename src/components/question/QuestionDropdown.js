import React, { Component } from 'react';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';
import classnames from 'classnames';

import { showReportErrorModal, showReportSuccessModal } from '../../actions';
import { BASE_URL } from '../../utils';
import { copyQuestionLinkEvent } from '../../events';
import Expire from './Expire';
import { Modal } from '../modal';

const req = require('superagent');

class QuestionDropdownComponent extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      copying: false,
    };

    this.setCopied = this.setCopied.bind(this);
    this.copyQuestionLink = this.copyQuestionLink.bind(this);
    this.doneCopyingLink = this.doneCopyingLink.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
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

    const url = `${BASE_URL}/${schoolCode}/${courseCode}/${examType}/${termCode}#${id}`;

    return (
      <div className="tooltip-container">
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
          <a onClick={() => this.props.showReportErrorModal(content_id)} className="question-option">
            <span className="material-icons">report</span>
            <span>Report Error</span>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showReportErrorModal: (content_id) => dispatch(showReportErrorModal(content_id)),
    showReportSuccessModal: () => dispatch(showReportSuccessModal()),
  };
};

const QuestionDropdown = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionDropdownComponent);

export default QuestionDropdown;
