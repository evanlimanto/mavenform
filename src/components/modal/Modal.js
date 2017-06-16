import React, { Component } from 'react';

class Modal extends Component {
  render() {
    const { infoContent, modalContent, closeModal, errorText } = this.props;
    return (
      <div className="modal-container">
        <div className="modal-click" onClick={closeModal}>
        </div>
        <div className="modal-and-helper">
          <div className="modal">
            <div className="modal-header">
              <img className="modal-logo" src="/img/logo.svg" alt="modal logo" />
            </div>
            <div className="modal-content">
              <hr className="s3"/>
              {modalContent}
              <p className="modal-error-text">{errorText}</p>
              <hr className="s3" />
            </div>
          </div>
          <hr className="s2" />
          {infoContent}
        </div>
        <a className="x" onClick={closeModal}><img src="/img/x.svg" alt="close" /></a>
      </div>
    );
  }
}

export default Modal;
