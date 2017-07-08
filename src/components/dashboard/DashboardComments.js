import React, { Component } from 'react';
import { map } from 'lodash';

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
    fetch('/getComments')
      .then((response) => response.json())
      .then((json) => this.setState({ comments: json }));
  }

  deleteComment(id) {
    req.post('/deleteQuestionComment')
      .send({ id })
      .end((err, res) => {
        if (err || !res.ok) return console.error(err);
        document.location = "/dashboard/comments";
      });
  }

  render() {
    const comments = map(this.state.comments, (comment) => {
      return <div>{comment.content} &nbsp; &nbsp; <a onClick={() => this.deleteComment(comment.id)}>x</a></div>;
    });
    return <div>{comments}</div>;
  }
}

export default DashboardComments;
