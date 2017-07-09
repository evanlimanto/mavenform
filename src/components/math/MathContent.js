import React, { Component } from 'react';
import { map, sortBy } from 'lodash';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import Navbar from '../navbar';
import Footer from '../footer';
import { Solution } from '../question';

class MathContentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      label: null
    };
  }

  componentDidMount() {
    fetch('/getMathContent/' + this.props.topic)
      .then((response) => response.json())
      .then((json) => this.setState({ content: json }));
    fetch('/getMathLabel/' + this.props.topic)
      .then((response) => response.json())
      .then((json) => this.setState({ label: json.concept }));
  }

  componentDidUpdate() {
    window.renderMJ();
  }
  
  render() {
    const meta = {
      description: `Interactive and course-specific study resources for Mathematics`,
      title: `Mathematics - Studyform`,
    };
    const content = map(sortBy(this.state.content, [(item) => item.id]), (content, key) => {
      return (
        <div key={key} className="question">
          <div dangerouslySetInnerHTML={{__html: content.content}} />
          <Solution solution={content.solution} />
        </div>
      );
    });
    
    return (
      <div>
        <DocumentMeta {...meta} />
        <Navbar math={true} topic={this.props.topic} label={this.state.label} />
        <div id="header-text">
          <div className="center">
            <h4>{this.state.label || this.props.topic}</h4>
          </div>
        </div>
        <div className="content">
          {content}
        </div>
        <Footer />
      </div> 
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    topic: ownProps.match.params.topic
  };
};

const MathContent = connect(
  mapStateToProps
)(MathContentComponent);

export default MathContent;
