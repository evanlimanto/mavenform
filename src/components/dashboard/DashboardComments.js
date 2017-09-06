import React, { Component } from 'react';
import { map } from 'lodash';
import { BASE_URL } from '../../utils';

const req = require('superagent');

class DashboardComments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
    };
    this.deleteComment = this.deleteComment.bind(this);
  }

  componentDidMount() {
    fetch(`${BASE_URL}/getComments`)
      .then((response) => response.json())
      .then((json) => this.setState({ comments: json }));
  }

  deleteComment(id) {
    req.post(`${BASE_URL}/deleteQuestionComment`)
      .send({ id })
      .end((err, res) => {
        if (err || !res.ok) return console.error(err);
        document.location = "/dashboard/comments";
      });
  }

  render() {
    const comments = map(this.state.comments, (comment) => {
      return <div className="admin-comment">{comment.content} &nbsp; &nbsp; <a>View</a><a onClick={() => this.deleteComment(comment.id)}>Delete</a></div>;
    });
    return <div className="admin-general">
      <div className="admin-nav">
        <a className="admin-link" href="/dashboard">TRANSCRIBE</a>
        <a className="admin-link" href="/dashboard/courses">COURSES</a>
        <a className="admin-link" href="/dashboard/problems">PROBLEMS</a>
        <a className="admin-link admin-link-active" href="/dashboard/comments">COMMENTS</a>
      </div>
      {comments}
    </div>;
  }
}

export default DashboardComments;
