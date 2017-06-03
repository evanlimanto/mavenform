import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { Question } from '../question';
import { preprocess } from '../../utils';
import { endsWith, join, keys, forEach, map, split, filter, reduce, range, toString } from 'lodash';
const request = require('superagent');

const yaml = require('js-yaml');

require('./Transcribe.css');

function replaceImagePlaceholders(content) {
  if (!content) return content;
  const regexp = /\[\[(.*?)\]\]/g;
  const matches = content.match(regexp);
  forEach(matches, (match) => {
    const imageName = match.slice(2, match.length - 6);
    content = content.replace(match, `<span class='image-span-${imageName}'></span>`);
  });
  return content;
}

class TranscribeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: null,
      error: null,
      success: null,
      rawContent: null,
      images: []
    };
    this.onDrop = this.onDrop.bind(this);
    this.upload = this.upload.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.updateImages = this.updateImages.bind(this);
    this.validateImages = this.validateImages.bind(this);
  }

  componentDidUpdate() {
    window.renderMJ();
  }

  onDrop(acceptedFiles, rejectedFiles) {
    const result = reduce(acceptedFiles, (res, image) => {
      if (!endsWith(image.name, '.png'))
        return false;
      return res;
    }, true);
    if (!result) {
      this.setState({ error: 'All uploaded files have to be .png!' });
    } else {
      this.setState({ images: acceptedFiles, error: null }, this.updateContent);
    }
  }

  updateContent() {
    const contents = this.refs.content.value;
    if (contents.length === 0) {
      return this.setState({ error: 'Content cannot be empty!' });
    }
    let doc = null;
    try {
      doc = yaml.safeLoad(contents);
    } catch (e) {
      return this.setState({ error: e });
    }
    
    const results = map(filter(keys(doc), function(k) {
      return k.match(/^q\d+_\d+$/);
    }), (k) => [k, split(k.slice(1), '_')]);

    const renderedContent = map(results, (res) => {
      const key = res[0];

      return <Question key={key}
              content={preprocess(replaceImagePlaceholders(doc[key]))}
              solution={preprocess(replaceImagePlaceholders(doc[key + '_s']))} />;
    });
    this.setState({ content: renderedContent, rawContent: contents, error: null }, this.updateImages);
  }

  updateImages() {
    const images = document.getElementsByTagName('img');
    forEach(images, (node) => node ? node.remove() : null);

    !!!this.state.images || forEach(this.state.images, (image) => {
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

  validateImages() {
    const regexp = /\[\[(.*?)\]\]/g;
    const matches = this.state.rawContent.match(regexp);
    if (matches.length !== this.state.images.length) {
      return { res: false, error: 'Number of images doesn\'t match number of image placeholders!' };
    }

    const imageSet = new Set(map(this.state.images, (image) => image.name));
    return reduce(matches, (res, match) => {
      const imageName = match.slice(2, match.length - 2);
      if (!imageSet.has(imageName))
        return { res: false, error: `Image ${imageName} not found in transcribed text!` };
      return res;
    }, { res: true, error: null });
  }

  upload(e) {
    e.preventDefault();
    if (this.state.error)
      return;
    const validationResult = this.validateImages();
    if (!validationResult.res)
      return this.setState({ error: validationResult.error });

    const schoolarr = split(this.refs.school.value, '~');
    const coursearr = split(this.refs.course.value, '~');
    const exam_type_arr = split(this.refs.exam_type.value, '~');

    const quarter = this.refs.quarter.value;
    const year = this.refs.year.value;
    let termarr = reduce(this.props.terms, (res, item) => {
      const code = quarter[0] + quarter[1] + toString(year).slice(2, 4);
      console.log(code, item.term_code);
      if (item.term_code === code) {
        return [item.term_code, item.id];
      }
      return res;
    }, []);

    const school = schoolarr[0], school_id = schoolarr[1];
    const course = coursearr[0], course_id = coursearr[1];
    const exam_type = exam_type_arr[0], exam_type_id = exam_type_arr[1];
    const term = termarr[0], term_id = termarr[1];
    const profs = this.refs.profs.value;

    const req = request.post('/processTranscription');
    forEach(this.state.images, (image) => {
      req.attach(image.name, image);
    });
    const self = this;
    req.field('contents', this.state.rawContent)
      .field('school', school).field('school_id', school_id)
      .field('course', course).field('course_id', course_id)
      .field('term', term).field('term_id', term_id)
      .field('exam_type', exam_type).field('exam_type_id', exam_type_id)
      .field('profs', profs)
      .end(function(err, res) {
        if (err || !res.ok) {
          self.setState({ error: err.text });
        } else {
          self.setState({ success: res.text });
        }
      });
  }

  render() {
    const schoolsSelect = (
      <select ref='school'>
        {map(this.props.schools, (school, key) => {
          return <option key={key} value={school.code + '~' + school.id}>{school.name}</option>;
        })}
      </select>
    );

    const coursesSelect = (
      <select ref='course'>
        {map(this.props.courses.sort((a, b) => a.code.localeCompare(b.code)), (course, key) => {
          return <option key={key} value={course.code + '~' + course.id}>{course.code} - {course.name}</option>
        })}
      </select>
    );

    const examTypesSelect = (
      <select ref='exam_type'>
        {map(this.props.exam_types, (exam_type, key) => {
          if (exam_type.id === 5 || exam_type.id === 6)
            return null;
          return <option key={key} value={exam_type.type_code + '~' + exam_type.id}>{exam_type.type_label}</option>
        })}
      </select>
    );

    const quarterSelect = (
      <select ref='quarter'>
        {map(['spring', 'summer', 'fall', 'winter'], (quarter) => {
          return <option key={quarter} value={quarter}>{quarter}</option>;
        })}
      </select>
    );

    const yearSelect = (
      <select ref='year'>
        {map(range(2010, 2018), (year) => {
          return <option key={year} value={year}>{year}</option>;
        })}
      </select>
    );

    return (
      <div>
        <span className='col transcription'>
          <h1>Transcription</h1>
          <label>School</label>
          {schoolsSelect}      
          <hr className='spacer'/>
          <label>Course</label>
          {coursesSelect}
          <hr className='spacer'/>
          <label>Type</label>
          {examTypesSelect}
          <hr className='spacer'/>
          <label>Term</label>
          {yearSelect}{quarterSelect}
          <hr className='spacer'/>
          <label>Professors</label>
          <input type='text' placeholder='e.g. Alon, Ranade' ref='profs' />
          <hr className='spacer'/>
          <textarea ref='content' onKeyUp={this.updateContent} placeholder='Enter content here'></textarea>
          <hr className='spacer'/>
          <Dropzone onDrop={this.onDrop} className='dropzone'>
            <div>{this.state.images ? 'Uploaded images: ' + join(map(this.state.images, (image) => image.name), ', ') : 'Drag labeled images: q1-1.png, q1-2.png, q2-1.png, q2-2.png, etc here, or click to upload.'}</div>
          </Dropzone>
          <hr className='spacer'/>
          <button className='upload' onClick={(e) => this.upload(e)}>Upload</button>
          {this.state.error ? <p className='error'>{this.state.error}</p> : null}
          {this.state.success ? <p className='success'>{this.state.success}</p> : null}
        </span>
        <span className='col preview'>
          <h1>Preview (without images)</h1>
          {this.state.content ? this.state.content : <p>No content yet.</p>}
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
