import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import request from 'superagent';
import Dropzone from 'react-dropzone';
import Navbar from '../navbar';
import isEmail from 'validator/lib/isEmail';
import { endsWith } from 'lodash';

const meta = {
  description: 'Campus Ambassador program',
  title: 'Marketing',
};

class Marketing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formStatus: null,
      uploadStatus: null,
      resume: null,
    };
    this.onDrop = this.onDrop.bind(this);
    this.submitApplication = this.submitApplication.bind(this);
    this.limitWords = this.limitWords.bind(this);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    if (acceptedFiles.length !== 1) {
      return this.setState({ uploadStatus: 'Upload only one .doc, .docx or .pdf file.' }); 
    }
    const resume = acceptedFiles[0];
    if (!(endsWith(resume.name, '.pdf') || endsWith(resume.name, '.doc') || endsWith(resume.name, '.docx'))) {
      return this.setState({ uploadStatus: 'Resume must be in one of the following formats: doc, docx, pdf.' });
    }
    this.setState({ resume, uploadStatus: null });
  }

  submitApplication(e) {
    e.preventDefault();
    const name = this.refs.name.value;
    const email = this.refs.email.value;
    const school = this.refs.school.value;
    const essay1 = this.refs.essay1.value;
    const essay2 = this.refs.essay2.value;
   
    if (this.state.uploadStatus || !this.state.resume) {
      return this.setState({ formStatus: "Upload a proper resume above." });
    }
    if (name.length === 0 || email.length === 0 || school.length === 0 || essay1.length === 0 || essay2.length === 0) {
      return this.setState({ formStatus: "All fields must be filled in." });
    }
    if (!isEmail(email)) {
      return this.setState({ formStatus: "Please fill in a valid email." }); 
    }

    const self = this;
    const req = request.post("/applyMarketing");
    req.field("name", name)
      .field("email", email)
      .field("school", school)
      .field("essay1", essay1)
      .field("essay2", essay2)
      .attach(this.state.resume.name, this.state.resume)
      .end((err, res) => {
        console.log(err, res);
        if (err || !res.ok) self.setState({ formStatus: 'Submit failed. Contact us for help.' });
        else self.setState({ formStatus: 'Application successfully submitted. We\'ll get in touch as soon as possible.' });
      });
  }

  limitWords() {
    const essay1 = this.refs.essay1;
    const essay2 = this.refs.essay2;
    essay1.value = essay1.value.split(' ').splice(0, 200).join(' ');
    essay2.value = essay2.value.split(' ').splice(0, 200).join(' ');
  }

  render() {
    return (
      <div className="marketing">
        <DocumentMeta {...meta} />
        <Navbar />
        <div className="card-container-container">
          <div className="card-container center">
            <div className="container">
              <h4>Marketing Intern</h4>
              <h5>Growth Strategy and Campus Ambassadorship</h5>
              <hr className="margin" />
              <div className="left-content">
                <h1>Description</h1>
                <p>We are looking for marketing interns to spearhead growth strategy for Studyform at your college or university campus. You will need to be both resourceful and versatile, as your responsibilities will range from strategy and research to social media outreach and direct marketing.
                  <hr className= "s1" />
                  As a marketing intern, you will research and analyze studying trends on your campus, formulate and design an optimized growth strategy, and then execute on that strategy through multiple marketing channels. You can expect to impact up to thousands of users.
                </p>
                <hr className="s5" />
                <h1>Application</h1>
                <hr className= "s1" />
                <label>Resume</label>
                <hr className= "s1" />
                <form>
                  <Dropzone onDrop={this.onDrop} style={{ width: "auto", height: "auto", "border": "none" }}>
                    <input className="gray" type="button" value="Attach Resume" />
                  </Dropzone>
                  <hr className= "s1" />
                  <p className="marketing-error-message">{this.state.uploadStatus}</p>
                  <span>{this.state.resume ? "Attached resume: " + this.state.resume.name : null}</span>
                  <hr className= "s3" />
                  <label>Name</label>
                  <hr className= "s1" />
                  <input type="text" className="marketing-info" ref="name" />
                  <hr className= "s2" />
                  <label>Email</label>
                  <hr className= "s1" />
                  <input type="text" className="marketing-info" ref="email" />
                  <hr className= "s2" />
                  <label>School</label>
                  <i>You must be on or within traveling distance of your campus over the summer.</i>
                  <hr className= "s1" />
                  <input type="text" className="marketing-info" ref="school" />
                  <hr className= "s2" />
                  <label>Please describe a past experience that demonstrates your work ethic.</label>
                  <i>200 word limit.</i>
                  <hr className= "s1" />
                  <textarea rows="10" className="marketing-info" ref="essay1" onChange={this.limitWords} />
                  <hr className= "s2" />
                  <label>Please describe a past experience that demonstrates your resourcefulness.</label>
                  <i>200 word limit.</i>
                  <hr className= "s1" />
                  <textarea rows="10" className="marketing-info" ref="essay2" onChange={this.limitWords} />
                  <hr className= "s3" />
                  <button className="marketing-button blue" type="submit" onClick={(e) => this.submitApplication(e)}>
                    Submit Application
                  </button>
                  <hr className="s1" />
                  <span>{this.state.formStatus}</span>
                </form>
              </div>
              <div className="right-info">
                <h1>Duration</h1>
                <p>Summer 2017</p>
                <hr className="s5" />
                <h1>Compensation</h1>
                <p>\$<span>1200 + </span>\$<span>100 per 300 users acquired</span></p>
                <hr className="s5" />
                <h1>Location</h1>
                <p>Your Campus</p>
              </div>
            </div>
            <hr className="margin" />
          </div>
        </div>
      </div>
    );
  }
}

export default Marketing;
