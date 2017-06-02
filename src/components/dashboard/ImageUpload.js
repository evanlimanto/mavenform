import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { endsWith, map } from 'lodash';

class ImageUploadComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      image: null
    };

    this.onDrop = this.onDrop.bind(this);
    this.upload = this.upload.bind(this);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    const image = acceptedFiles[0];
    if (!image.name.endsWith(".png")) {
      this.setState({ error: "All images need to be PNGs!" });
      setTimeout(() => this.setState({ error: null }), 2000);
    } else {
      this.setState({ image: image });
    }
  }

  upload(e) {
    e.preventDefault();
    if (this.state.image === null) {
      this.setState({ error: "Image required!" });
      setTimeout(() => this.setState({ error: null }), 2000);
      return;
    }
    const req = request.post('/uploadImage');
    const school = this.refs.school.value;
    const examkey = this.refs.exam.value;
    const { courseid, examtype, examid } = this.props.exams.key_dict[examkey];
    const problem_num = this.refs.problem_num.value;
    const image_num = this.refs.image_num.value;
    req.attach(this.state.image.name, this.state.image)
       .field('problem_num', problem_num)
       .field('image_num', image_num)
       .field('school', school)
       .field('courseid', courseid)
       .field('examtype', examtype)
       .field('examid', examid)
       .end(function(err, res) {
      if (err) console.log(err);
      else console.log(res);
    });
  }

  render() {
    const schoolsSelect = (
      <select style={{ "marginLeft": "20px" }} ref="school">
      {map(this.props.schools, (school, key) => {
        return <option key={key} value={school.code}>{school.name}</option>;
      })}
      </select>
    );

    const examsSelect = (
      <select style={{ "marginLeft": "20px" }} ref="exam">
      {map(this.props.exams.key_dict, (exam, key) => {
        return <option value={key} key={key}>{exam.courseid} - {exam.examtype} - {exam.examid}</option>;
      })}
      </select>
    );

    return (
      <form>
        <p>{this.state.error}</p>
        <Dropzone onDrop={this.onDrop}>
          <div>{this.state.image ? this.state.image.name : "Drag an image here, or click to upload."}</div>
        </Dropzone>
        <br />
        <label>School</label>
        {schoolsSelect}
        <br/>
        <label>Exam</label>
        {examsSelect}
        <br/>
        <label>Problem Number</label>
        <input type="text" placeholder="1, 2, 3, etc" ref="problem_num" style={{ "marginLeft": "20px" }} />
        <br />
        <label>Image Number</label>
        <input type="text" placeholder="1, 2, 3, etc" ref="image_num" style={{ "marginLeft": "20px" }} />
        <br />
        <button onClick={(e) => this.upload(e)}>Upload</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    schools: state.schools,
    exams: state.exams
  };
};

const ImageUpload = connect(
  mapStateToProps
)(ImageUploadComponent);

export default ImageUpload;
