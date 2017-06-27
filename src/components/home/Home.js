import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import { endsWith, map, toLower } from 'lodash';
import cookies from 'browser-cookies';
import Footer from '../footer';
import Navbar from '../navbar';
import { schoolClickEvent } from '../../events';
import isEmail from 'validator/lib/isEmail';
import { algoliaCourseIndex } from '../../utils';

const request = require('superagent');
const Scroll = require('react-scroll');
const ScrollLink = Scroll.Link;
const Element = Scroll.Element;

const meta = {
  description: 'The ultimate bank of interactive and course-specific study resources.',
  title: 'Studyform',
};

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.getSuggestions = this.getSuggestions.bind(this);
    this.state = {
      suggestions: [],
      waitlistErorr: null,
    };

    this.waitlist = this.waitlist.bind(this);
  }

  componentWillMount() {
    if (this.props.auth.loggedIn()) {
      this.props.history.push('/home'); 
    }
  }

  waitlist(e) {
    e.preventDefault();
    const email = this.refs.email.value;
    if (!isEmail(email))
      return this.setState({ waitlistError: "Invalid or empty email." });
    if (!endsWith(email, ".edu"))
      return this.setState({ waitlistError: "Enter an .edu email." });

    this.setState({ waitlistError: null });
    request
      .post("/addToWaitlist")
      .send({ email })
      .end((err, res) => {
        if (err || !res.ok) this.setState({ waitlistError: "Waitlist failed." });
        else {
          cookies.set('waitlist_email', email, { expires: 1 });
          document.location = "/waitlisted";
        }
        return;
      });
  }

  getSuggestions() {
    const queryStr = this.refs.search.value;
    if (queryStr.length === 0) {
      this.setState({
        suggestions: []
      });
      return;
    }
    algoliaCourseIndex.search({
      query: queryStr,
      length: 4,
      offset: 0,
    }, (err, content) => {
      const suggestions = map(content.hits, (hit) => {
        console.log(hit);
        return {
          school_code: hit.school_code,
          school_name: hit.school_name,
          school_name_highlighted: hit._highlightResult.school_name.value,
          code: hit.code,
          code_highlighted: hit._highlightResult.code.value,
          name: hit.name,
          name_highlighted: hit._highlightResult.name.value,
        };
      });
      this.setState({ suggestions });
    });
  }

  render() {
    const schoolCodes = ['ucberkeley', 'ucsandiego'];
    const schoolLabels = ['UC Berkeley', 'UC San Diego'];
    const schoolCards = map(schoolCodes, (schoolCode, key) => {
      return (
        <Link key={key} className="card" to={"/" + schoolCode} onClick={() => schoolClickEvent(schoolCode)}>
          <span>{schoolLabels[key]}</span>
          <span className="card-arrow">&#8594;</span>
        </Link> 
      );
    });
    const suggestions = this.state.suggestions;
    const searchResults = (suggestions && suggestions.length > 0) ? (
      <div className="results-container">
        <div className="results">
          {map(suggestions, (suggestion, index) => {
            const aClass = classnames({ bottom: index === suggestions.length - 1 });
            const suggestionText = `${suggestion.school_name_highlighted} ${suggestion.code_highlighted}: ${suggestion.name_highlighted}`;
            return <Link to={`/${suggestion.school_code}/${toLower(suggestion.code)}`} className={aClass} dangerouslySetInnerHTML={{__html: suggestionText}}></Link>;
          })}
        </div>
      </div>
    ) : null;

    return (
      <div className="home">
        <DocumentMeta {...meta} />
        <Navbar home={true} />
        <div className="banner">
          <div className="banner-img"></div>
          <div className="banner-text">
            <div className="banner-header">Make Studying Easy</div>
            <hr className="s2" />
            <h5 className="h5-alt">The ultimate bank of interactive and course-specific study resources</h5>
            <hr className="s5" />
            <div className="search-container">
              <div className="material-icons search-icon">search</div>
              <input className="search" name="search" placeholder="Search for your course to see what study resources are available..." type="text" autoComplete="off" onChange={this.getSuggestions} ref="search" />
              {searchResults}
            </div>
            <div>
              <ScrollLink className="search-link" to="features" spy={true} smooth={true} duration={500}> 
                <div className="material-icons">info_outline</div>
                Learn More 
              </ScrollLink>
              <ScrollLink className="search-link" to="schools" spy={true} smooth={true} duration={500}> 
                <div className="material-icons school">school</div>
                View Schools 
              </ScrollLink>
              <hr className="s4" />
            </div>
            <hr className="s8" />
          </div>
        </div>
        <Element name="schools" className="schools">
          <hr className="s7-5" />
          <h4 className="center">Schools</h4>
          <hr className="s1" />
          <h5>Currently supported schools</h5>
          <hr className="s3" />
          <div className="card-container">
            {schoolCards}
            <hr className="s8" />
          </div>
        </Element>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const Home = connect(
  mapStateToProps
)(HomeComponent);

export default Home;
