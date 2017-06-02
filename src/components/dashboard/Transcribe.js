import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { Question } from '../question';
import { preprocess } from '../../utils';
import { has, join, keys, forEach, map, split, filter, range, replace } from 'lodash';
const request = require('superagent');

const yaml = require('js-yaml');

require("./Transcribe.css");

function replaceImagePlaceholders(content) {
  if (!content) return content;
  const regexp = /\[\[(.*?)\]\]/g;
  const matches = content.match(regexp);
  forEach(matches, (match) => {
    const imageName = match.slice(2, match.length - 6);
    content = content.replace(match, `<span class="image-span-${imageName}"></span>`);
  });
  return content;
}

class TranscribeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: null,
      error: null,
      rawContent: ""
    };
    this.onDrop = this.onDrop.bind(this);
    this.upload = this.upload.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.updateImages = this.updateImages.bind(this);
  }

  componentDidUpdate() {
    window.renderMJ();
  }

  onDrop(acceptedFiles, rejectedFiles) {
    forEach(acceptedFiles, (file) => {
      if (!file.name.endsWith('.png')) {
        this.setState({ error: 'Uploaded images need to be .png!' });
        return setTimeout(() => this.setState({ error: null }), 2000);
      }
    });
    this.setState({ images: acceptedFiles }, this.updateContent);
  }

  updateContent() {
    const contents = this.refs.content.value;
    let doc = null;
    try {
      doc = yaml.safeLoad(contents);
    } catch (e) {
      return this.setState({ error: e });
    }
    
    const results = map(filter(keys(doc), function(k) {
      return k.match(/^q\d+_\d+$/);
    }), (k) => [k, split(k.slice(1), "_")]);

    const renderedContent = map(results, (res) => {
      const key = res[0];
      const problem_num = res[1][0];
      const subproblem_num = res[1][1];

      return <Question key={key} content={preprocess(replaceImagePlaceholders(doc[key]))} solution={preprocess(replaceImagePlaceholders(doc[key + "_s"]))} />;
    });
    this.setState({ content: renderedContent, rawContent: contents, error: null }, this.updateImages);
  }

  updateImages() {
    const images = document.getElementsByTagName('img');
    forEach(images, (node) => node ? node.remove() : null);
    if (this.state.images) {
      forEach(this.state.images, (image) => {
        const imageName = image.name.slice(0, image.name.length - 4);
        let imageSpan = document.getElementsByClassName('image-span-' + imageName);
        if (imageSpan.length > 0) {
          imageSpan = imageSpan[0]; 
          const classname = 'image-' + imageName;
          let img = null;
          const imgs = document.getElementsByClassName(classname);
          if (imgs.length === 0) {
            img = document.createElement('img');
          } else {
            img = imgs[0];
          }
          img.className = 'image-' + imageName;
          img.src = image.preview;
          imageSpan.appendChild(img);
        }
      });
    }
  }

  upload(e) {
    e.preventDefault();
    const schoolarr = split(this.refs.school.value, '~');
    const coursearr = split(this.refs.course.value, '~');
    const exam_type_arr = split(this.refs.exam_type.value, '~');
    const termarr = split(this.refs.term.value, '~');
    const school = schoolarr[0], school_id = schoolarr[1];
    const course = coursearr[0], course_id = coursearr[1];
    const exam_type = exam_type_arr[0], exam_type_id = exam_type_arr[1];
    const term = termarr[0], term_id = termarr[1];
    const profs = this.refs.profs.value;

    const req = request.post('/processTranscription');
    forEach(this.state.images, (image) => {
      req.attach(image.name, image);
    });
    req.field('contents', this.state.rawContent)
      .field('school', school).field('school_id', school_id)
      .field('course', course).field('course_id', course_id)
      .field('term', term).field('term_id', term_id)
      .field('exam_type', exam_type).field('exam_type_id', exam_type_id)
      .field('profs', profs);
    req.end(function(err, res) {
      if (err) console.error(err);
      else console.log(res);
    });
  }

  render() {
    const schoolsSelect = (
      <select ref="school">
      {map(this.props.schools, (school, key) => {
        return <option key={key} value={school.code + "~" + school.id}>{school.name}</option>;
      })}
      </select>
    );

    const coursesSelect = (
      <select ref="course">
      {map(this.props.courses.sort((a, b) => a.code > b.code), (course, key) => {
        return <option key={key} value={course.code + "~" + course.id}>{course.code} - {course.name}</option>
      })}
      </select>
    );

    const examTypesSelect = (
      <select ref="exam_type">
      {map(this.props.exam_types, (exam_type, key) => {
        return <option key={key} value={exam_type.type_code + "~" + exam_type.id}>{exam_type.type_label}</option>
      })}
      </select>
    );

    const termsSelect = (
      <select ref="term">
      {map(this.props.terms, (term, key) => {
        return <option key={key} value={term.term_code + "~" + term.id}>{term.term_label}</option>;
      })}
      </select>
    );

    return (
      <div>
        <span className="col">
          <label>School</label>
          {schoolsSelect}      
          <hr/>
          <label>Course</label>
          {coursesSelect}
          <hr/>
          <label>Type</label>
          {examTypesSelect}
          <hr/>
          <label>Term</label>
          {termsSelect}
          <hr/>
          <label>Professors</label>
          <input type="text" placeholder="e.g. Alon, Ranade" ref="profs" />
          <hr/>
          <textarea ref="content" onKeyUp={this.updateContent}></textarea>
          <hr/>
          <Dropzone onDrop={this.onDrop} className="dropzone">
            <div>{this.state.images ? join(map(this.state.images, (image) => image.name), ", ") : "Drag labeled images: q1-1.png, q1-2.png, q2-1.png, q2-2.png, etc here, or click to upload."}</div>
          </Dropzone>
          <hr/>
          <button onClick={(e) => this.upload(e)}>Upload</button>
        </span>
        <span className="col">
          <h1>Preview (without images)</h1>
          {this.state.error ? this.state.error : this.state.content}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    schools: state.schools,
    courses: state.courses,
    exam_types: state.exam_types,
    terms: state.terms
  }; 
};

const Transcribe = connect(
  mapStateToProps
)(TranscribeComponent);

export default Transcribe;
