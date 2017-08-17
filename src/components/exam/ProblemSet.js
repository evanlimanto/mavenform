import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { canUseDOM } from '../../utils';
import Footer from '../footer';
import Navbar from '../navbar';

class ExamComponent extends Component {
  componentDidMount() {
    ExamComponent.fetchData(this.props.dispatch, this.props);
  }

  componentWillMount() {
    const { schoolCode, courseCode } = this.props;
    if (!this.props.auth.loggedIn())
      document.location = `/${schoolCode}/${courseCode}`;
  }

  static getMeta(props) {
  }

  static fetchData(dispatch, props) {
  }

  componentDidUpdate() {
    if (canUseDOM)
      window.renderMJ();
  }

  render() {
    const { schoolCode, courseCode, problemSetType } = this.props;
    return (
      <div>
        {ExamComponent.getMeta(this.props)}
        <Navbar schoolCode={schoolCode} courseCode={courseCode} problemset={true} problemSetType={problemSetType} />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return {
    auth: state.auth,
    schoolCode: ownProps.schoolCode || ownProps.match.params.schoolCode,
    courseCode: ownProps.courseCode || ownProps.match.params.courseCode,
    problemSetType: ownProps.problemSetType || ownProps.match.params.problemSetType,
    labels: state.labels,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { dispatch };
}

const Exam = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExamComponent);

export default Exam;
