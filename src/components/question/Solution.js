import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { concat, has, map } from 'lodash';
import req from 'superagent';
import isEmpty from 'validator/lib/isEmpty';
import { toggleSolutionEvent } from '../../events';

class SolutionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSolution: (process.env.NODE_ENV === 'development'),
      showComments: true,
      comments: [],
      error: null,
    };

    this.toggleSolution = this.toggleSolution.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  componentDidMount() {
    // TODO: Make this more efficient with 1 request
    fetch(`/getComments/${this.props.content_id}`)
      .then((response) => response.json())
      .then((json) => this.setState({ comments: json }));
  }

  toggleSolution() {
    toggleSolutionEvent();
    this.setState({ showSolution: !this.state.showSolution });
  }

  addComment() {
    if (!this.props.auth.loggedIn())
      return this.setState({ error: "Log in to comment." });

    const profile = this.props.auth.getProfile();
    const user_id = profile.user_id;
    const nickname = (has(profile, 'user_metadata') && has(profile.user_metadata, 'username')) ?
      (profile.user_metadata.username) : (profile.given_name);

    const content_id = this.props.content_id;
    const comment = this.refs.comment.value;

    if (isEmpty(comment))
      return;

    this.setState({ comments: concat(this.state.comments, { content: comment, nickname }), error: null });
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
      <input className={((this.state.showSolution) ? "gray" : "blue")} type="button"
       value={((this.state.showSolution) ? "Hide Solution" : "Show Solution")} onClick={() => this.toggleSolution()}/>
    );

    return (
      <div>
        <hr className="s3" />
        {solutionButton}
        {solutionContent}
        {!this.state.showComments ||
          <div className="comment-box">
            <input type="text" placeholder="Ask a question or add a comment..." className="comment-input" ref="comment" />
            <button className="comment-button" onClick={this.addComment}>Post</button>
            {!this.state.error || (<p className="error-text">{this.state.error}</p>)}
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
