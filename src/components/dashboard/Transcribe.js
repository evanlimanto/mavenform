import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { preprocess } from '../../renderer';
import { canUseDOM } from '../../utils';
import { MultipleChoiceQuestion, Question } from '../question';
import { toLower, has, endsWith, join, keys, forEach, map, split, filter, reduce, range, toString, sortBy } from 'lodash';

import DashboardLogin from './DashboardLogin';

const cookies = canUseDOM ? require('browser-cookies') : null;
const request = require('superagent');
const yaml = require('js-yaml');

function augment(content) {
  if (!content) return content;
  const regexp = /!!(.*?)!!/g;
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
      json: null,
      images: [],
      courses: [],
      uploading: false,
      transcribedExam: {},
    };

    this.onDrop = this.onDrop.bind(this);
    this.upload = this.upload.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.updateImages = this.updateImages.bind(this);
    this.validateImages = this.validateImages.bind(this);
    this.populateCourses = this.populateCourses.bind(this);
  }

  componentDidUpdate() {
    window.renderMJ();
  }

  componentDidMount() {
    const { transcribedExamId } = this.props;
    if (transcribedExamId) {
      fetch(`/getTranscribedContent/${transcribedExamId}`)
        .then((response) => response.json())
        .then((json) => {
          const content = map(sortBy(json, [(item) => item.problem_num, (item) => item.subproblem_num]), (item, key) => {
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
          this.setState({ content });
        });
    }
  }

  onDrop(acceptedFiles, rejectedFiles) {
    const result = reduce(acceptedFiles, (res, image) => {
      if (!endsWith(toLower(image.name), '.png'))
        return false;
      return res;
    }, true);
    if (!result) {
      this.setState({ error: 'All uploaded files have to be .png!' });
    } else {
      this.setState({ images: acceptedFiles, error: null }, this.updateContent);
    }
  }

  populateCourses() {
    const schoolid = split(this.refs.school.value, '~')[1];
    fetch(`/getSchoolCoursesList/${schoolid}`).then(
      (response) => response.json()
    ).then((json) => this.setState({ courses: json }));
  }

  updateContent() {
    const contents = this.refs.content.value;
    if (contents.length === 0) {
      return this.setState({ error: 'Content cannot be empty!' });
    }
    let doc = null;
    try {
      doc = yaml.safeLoad(augment(contents));
    } catch (e) {
      return this.setState({ error: e });
    }
    const items = map(filter(keys(doc), function(k) {
      return k.match(/^q\d+_\d+$/);
    }), (k) => [k, split(k.slice(1), '_')]);

    const renderedContent = map(items, (item) => {
      const key = item[0]; 
      const content = preprocess(doc[key]);
      if (has(doc, key + '_i')) {
        const solutionNum = doc[key + '_s'];
        const choices = join(doc[key + '_i'], '~');
        return <MultipleChoiceQuestion key={key} content={content} choices={choices} solutionNum={solutionNum}  />
      }
      const solution = preprocess(doc[key + '_s']);
      return <Question key={key} content={content} solution={solution} />
    });

    this.setState({ content: renderedContent, rawContent: contents, error: null }, this.updateImages);
  }

  updateImages() {
    if (!canUseDOM)
      return;

    const images = document.getElementsByTagName('img');
    forEach(images, (node) => node ? node.remove() : null);

    !this.state.images || forEach(this.state.images, (image) => {
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
    window.renderMJ();
  }

  validateImages() {
    const regexp = /!!(.*?)!!/g;
    const matches = this.state.rawContent.match(regexp);
    if (!!matches && matches.length !== this.state.images.length) {
      return { res: false, error: 'Number of images doesn\'t match number of image placeholders! Needed: ' + matches.length + ', Got: ' + this.state.images.length };
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
    if (this.state.error || !this.refs.school.value || !this.refs.course.value)
      return;
    const validationResult = this.validateImages();
    if (!validationResult.res)
      return this.setState({ error: validationResult.error });

    const schoolarr = split(this.refs.school.value, '~');
    const coursearr = split(this.refs.course.value, '~');
    const exam_type_arr = split(this.refs.exam_type.value, '~');

    const quarter = this.refs.quarter.value;
    const year = this.refs.year.value;
    const termarr = reduce(this.props.terms, (res, item) => {
      const code = ((quarter === "other") || (year === "other")) ? ("general") : (quarter[0] + quarter[1] + toString(year).slice(2, 4));
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
    const pdf_link = this.refs.pdf.value;

    const req = request.post('/processTranscription');
    forEach(this.state.images, (image) => {
      req.attach(image.name, image);
    });
    const self = this;
    this.setState({ uploading: true });
    req.field('contents', this.state.rawContent)
      .field('school', school).field('school_id', school_id)
      .field('course', course).field('course_id', course_id)
      .field('term', term).field('term_id', term_id)
      .field('exam_type', exam_type).field('exam_type_id', exam_type_id)
      .field('profs', profs).field('pdf_link', pdf_link)
      .end(function(err, res) {
        if (err || !res.ok) {
          self.setState({ error: err.text, uploading: false });
        } else {
          self.setState({ success: res.text, uploading: false });
        }
      });
  }

  approveExam() {
    const { transcribedExamId } = this.props;
    fetch(`/approveTranscription/${transcribedExamId}`).then(
      (res, err) => {
        if (err) console.error(err);
        else this.setState({ success: 'Success!' });
      });
  }

  isLoggedIn() {
    if (!cookies)
      return false;
    return cookies.get('dashboard_user');
  }

  render() {
    if (!this.isLoggedIn()) {
      return <DashboardLogin />;
    }

    const schoolsSelect = (
      <select ref='school' onChange={this.populateCourses} >
        <option selected value disabled> -- select a school -- </option>
        {map(sortBy(this.props.schools, (a) => a.name), (school, key) => {
          return <option key={key} value={school.code + '~' + school.id}>{school.name}</option>;
        })}
      </select>
    );

    const coursesSelect = (
      <select ref='course'>
        {map(this.state.courses.sort((a, b) => a.code.localeCompare(b.code)), (course, key) => {
          return <option key={key} value={course.code + '~' + course.id}>{course.code}</option>
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
        <option value="other">Other</option>
      </select>
    );

    const yearSelect = (
      <select ref='year'>
        {map(range(2010, 2018), (year) => {
          return <option key={year} value={year}>{year}</option>;
        })}
        <option value="other">Other</option>
      </select>
    );

    return (
      <div className="admin">
        <div className='col transcription'>
          <h1>TRANSCRIPTION</h1>
          <div>
            <label>School</label>
            {schoolsSelect} 
          </div>
          <hr className="s1" />
          <div>
            <label>Course</label>
            {coursesSelect}
          </div>
          <hr className="s1" />
          <div>
            <label>Type</label>
            {examTypesSelect}
          </div>
          <hr className="s1" />
          <div className="half-input">
            <label>Term</label>
            {yearSelect}{quarterSelect}
          </div>
          <hr className="s1" />
          <div>
            <label>Professors</label>
            <input type='text' placeholder='e.g. Alon, Ranade' ref='profs' />
          </div>
          <hr className="s1" />
          <div>
            <label>PDF Link</label>
            <input type="text" placeholder='e.g. www.studyform.com/mt1-fa15-exam.pdf' ref='pdf' />
          </div>
          <hr className="s1" />
          <Dropzone onDrop={this.onDrop} className='dropzone'>
            <div>{this.state.images ? 'Click to upload. Uploaded: ' + join(map(this.state.images, (image) => image.name), ', ') : 'Drag labeled images: q1-1.png, q1-2.png, q2-1.png, q2-2.png, etc here, or click to upload.'}</div>
          </Dropzone>
          <hr className="s1" />
          <textarea ref='content' onKeyUp={this.updateContent} placeholder='Enter content here'></textarea>
          <hr className="s2" />
          <div>
            <button className='blue' onClick={(e) => this.upload(e)}>{this.state.uploading ? <img src="/img/ring.svg" width="16" height="16" alt="loading" /> : "SAVE" }</button>
            <button className='white' onClick={this.approveExam}> APPROVE </button>
            <Link className='gray cancel' to="/dashboard">BACK</Link>
          </div>
          <hr className="s1" />
          {this.state.error ? <p className='error'>{this.state.error}</p> : null}
          {this.state.success ? <p className='success'>{this.state.success}</p> : null}
        </div>
        <div className='col preview'>
          <h1>PREVIEW</h1>
          <div className="preview-content">
            {this.state.content ? this.state.content : <p>No content yet.</p>}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    transcribedExamId: ownProps.transcribedExamId || ownProps.match.params.transcribedExamId,
    schools: state.schools,
    exam_types: state.exam_types,
    terms: state.terms,
  }; 
};

const Transcribe = connect(
  mapStateToProps
)(TranscribeComponent);

export default Transcribe;
