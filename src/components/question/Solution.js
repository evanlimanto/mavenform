import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { concat, map } from 'lodash';
import req from 'superagent';
import isEmpty from 'validator/lib/isEmpty';
import { toggleSolutionEvent } from '../../events';

class SolutionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSolution: (process.env.NODE_ENV === 'development'),
      showComments: (process.env.NODE_ENV === 'development'),
      comments: null,
    };

    this.toggleSolution = this.toggleSolution.bind(this);
    this.toggleComments = this.toggleComments.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  toggleSolution() {
    toggleSolutionEvent();
    this.setState({ showSolution: !this.state.showSolution });
  }

  toggleComments() {
    if (this.state.comments === null) {
      fetch(`/getComments/${this.props.content_id}`)
        .then((response) => response.json())
        .then((json) => this.setState({ comments: json, showComments: !this.state.showComments }));
    } else {
      this.setState({ showComments: !this.state.showComments });
    }
  }

  addComment() {
    const { nickname, user_id } = this.props.auth.getProfile();
    const content_id = this.props.content_id;
    const comment = this.refs.comment.value;

    if (isEmpty(comment))
      return;

    this.setState({ comments: concat(this.state.comments, { content: comment, nickname }) });
    req.post('/addComment')
      .send({ user_id, content_id, comment })
      .end((err, res) => {
        this.refs.comment.value = null;
        if (err || !res.ok) return console.error(err);
        return;
      });
  }

  render() {
    var solutionContent = null;

    if (this.props.solution) {
      const solutionClass = classnames({
        solution: true,
        hidden: !this.state.showSolution,
      });
      solutionContent = (
        <div className={solutionClass}>
          <span dangerouslySetInnerHTML={{'__html': this.props.solution}} />
        </div>
      );
    }

    const solutionButton = (
      <input className={((this.state.showSolution) ? "gray" : "blue") + " solution-button"} type="button"
       value="Solution" onClick={() => this.toggleSolution()}/>
    );

    return (
      <div>
        <hr className="s3" />
        {solutionButton}
        <a className="comments-label noselect" onClick={this.toggleComments}>
          Comment
          {/*<span className="comments-count">0</span>*/}
        </a>
        {!this.state.showComments ||
          <div className="comment-box">
            <input type="text" placeholder="Add a comment..." className="comment-input" ref="comment" />
            <button className="comment-button" onClick={this.addComment}>Comment</button>
            <div className="comments">
              {map(this.state.comments, (comment, key) => (
                <div key={key} className="comment">
                  <div className="comment-header">{comment.nickname}</div>
                  <div className="comment-content">{comment.content}</div>
                </div>
              ))}
            </div>
          </div>
        }
        {solutionContent}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
};

const Solution = connect(
  mapStateToProps
)(SolutionComponent);

export default Solution;
