import React, { Component } from 'react';
import { map, replace } from 'lodash';
import { Link } from 'react-router-dom';

import DashboardNav from './DashboardNav';
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
    fetch(`${BASE_URL}/getAllComments`)
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
      const url = `/${comment.school_code}/${comment.course_code}/${comment.type_code}-${comment.term_code}-${replace(comment.profs, /, /g, '_')}`;
      return <div className="admin-comment">{comment.content} &nbsp; &nbsp; <Link to={url}>View</Link><a onClick={() => this.deleteComment(comment.id)}>Delete</a></div>;
    });
    return (
      <div className="admin-general">
        <DashboardNav />
        <hr className="s2"/>
        <h1 style={{"padding-left" : "5px"}}>COMMENTS</h1>
        {comments}
      </div>
    );
  }
}

export default DashboardComments;
