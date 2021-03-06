import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cloneDeep, assign, max, keys, forEach, toString, flattenDeep, has, concat, map, sortBy, toInteger } from 'lodash';
import isEmpty from 'validator/lib/isEmpty';
import { BASE_URL } from '../../utils';
import { showLoginModal, showSignupModal } from '../../actions';

const req = require('superagent');

const replaceLinks = (text) => text.replace(/(\bhttps?:\/\/\S+)/gi, '<a href="$1" class="comment-link" target="_blank">$1</a>', "g");

class CommentsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showComments: true,
      commentRoots: [],
    };

    this.dfs = this.dfs.bind(this);
    this.addComment = this.addComment.bind(this);
    this.getCommentDivs = this.getCommentDivs.bind(this);
    this.processComments = this.processComments.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.updateComment = this.updateComment.bind(this);

    const profile = this.props.auth.getProfile();
    if (profile) {
      this.userid = profile.user_id;
      this.nickname = profile.user_metadata.username;
    }
  }

  deleteComment(commentid) {
    const newTree = cloneDeep(this.state.commentsTree);
    newTree[commentid].deleted = true;
    this.setState({ commentsTree: newTree });
    fetch(`${BASE_URL}/deleteComment/${commentid}`);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.comments)
      this.processComments(nextProps.comments);
  }

  processComments(json) {
    const tree = {};
    const roots = [];
    json = sortBy(json, [(item) => item.id]);
    forEach(json, (item) => {
      const { id, parentid, datetime, nickname, content, deleted } = item;
      tree[id] = { datetime, nickname, content, children: [], deleted };
      if (parentid) {
        if (!has(tree, parentid)) throw new Error("Parent comment not found.");
        tree[parentid].children.push(id);
      } else {
        roots.push(item.id);
      }
    });
    this.setState({
      commentsTree: tree,
      commentsRoots: roots,
    });
  }

  addComment() {
    if (!this.props.auth.loggedIn())
      return this.setState({ error: "Log in to comment." });

    const content_id = this.props.content_id;
    const comment = this.refs.comment.value;

    if (isEmpty(comment))
      return;

    req.post(`${BASE_URL}/addComment`)
      .send({ userid: this.userid, content_id, comment, parentid: null })
      .end((err, res) => {
        this.refs.comment.value = null;
        if (err || !res.ok) return console.error(err);

        const newid = toInteger(res.text);
        let obj = {};
        obj[newid] = { id: newid, children: [], content: comment, datetime: null, nickname: this.nickname, deleted: false };
        this.setState({
          commentsTree: assign(this.state.commentsTree, obj),
          commentsRoots: concat(this.state.commentsRoots, newid),
        });
      });
  }

  replyComment(parentid) {
    if (!this.props.auth.loggedIn())
      return this.setState({ error: "Log in to comment." });

    const content_id = this.props.content_id;
    const comment = this.refs["comment-" + parentid].value;

    if (isEmpty(comment))
      return;

    const newid = max(map(keys(this.state.commentsTree), (key) => toInteger(key))) + 1;
    const newTree = cloneDeep(this.state.commentsTree);
    newTree[parentid].children.push(newid);
    newTree[newid] = { id: newid, children: [], content: comment, datetime: null, nickname: this.nickname, deleted: false };
    this.setState({ commentsTree: newTree });

    const actionsElement = document.getElementById("actions-" + parentid);
    const commentboxElement = document.getElementById("commentbox-" + parentid);
    const actionsClassList = actionsElement.classList;
    const commentboxClassList = commentboxElement.classList;
    actionsClassList.remove("hidden");
    commentboxClassList.add("hidden");
    req.post('/addComment')
      .send({ userid: this.userid, content_id, comment, parentid })
      .end((err, res) => {
        this.refs["comment-" + parentid].value = null;
        if (err || !res.ok) return console.error(err);
        return;
      });
  }

  showReplyBox(commentid) {
    document.getElementById("commentbox-" + commentid).classList.remove("hidden");
    document.getElementById("actions-" + commentid).classList.add("hidden");
  }

  showEditCommentBox(commentid) {
    document.getElementById("updatebox-" + commentid).classList.remove("hidden");
    document.getElementById("comment-" + commentid).classList.add("hidden");
  }

  updateComment(commentid) {
    const content = this.refs["updatecomment-" + commentid].value;
    const newTree = cloneDeep(this.state.commentsTree);
    newTree[commentid].content = content;
    this.setState({ commentsTree: newTree });

    const commentElement = document.getElementById("comment-" + commentid);
    const updateboxElement = document.getElementById("updatebox-" + commentid);
    if (commentElement && updateboxElement) {
      const commentClassList = commentElement.classList;
      const updateboxClassList = updateboxElement.classList;
      if (commentClassList.contains("hidden")) {
        commentClassList.remove("hidden");
        updateboxClassList.add("hidden");
      }
    }

    req.post("/updateComment")
      .send({ commentid, content })
      .end((err, res) => {
        if (err || !res.ok) return console.error(err);
        return;
      });
  }

  dfs(commentid, depth) {
    let ret = [];
    const comment = this.state.commentsTree[commentid];
    document.addEventListener('click', (evt) => {
      const actionsElement = document.getElementById("actions-" + commentid);
      const commentboxElement = document.getElementById("commentbox-" + commentid);
      if (actionsElement && commentboxElement && !actionsElement.contains(evt.target) && !commentboxElement.contains(evt.target)) {
        const actionsClassList = actionsElement.classList;
        const commentboxClassList = commentboxElement.classList;
        if (actionsClassList.contains("hidden")) {
          actionsClassList.remove("hidden");
          commentboxClassList.add("hidden");
        }
      }
      const commentElement = document.getElementById("comment-" + commentid);
      const updateboxElement = document.getElementById("updatebox-" + commentid);
      if (commentElement && updateboxElement && !actionsElement.contains(evt.target) && !updateboxElement.contains(evt.target)) {
        const commentClassList = commentElement.classList;
        const updateboxClassList = updateboxElement.classList;
        if (commentClassList.contains("hidden")) {
          commentClassList.remove("hidden");
          updateboxClassList.add("hidden");
        }
      }
    });

    ret.push((
      <div key={commentid} className="comment" style={{ "marginLeft": toString(25 * depth) + "px" }}>
        <div className="comment-header">{comment.nickname}</div>
        <div className="comment-upvotes">{comment.upvotes}</div>
        <hr className="s0-5" />
        <div className="comment-content" id={"comment-" + commentid} dangerouslySetInnerHTML={{ __html: comment.deleted ? "[DELETED]" : replaceLinks(comment.content) }} />
        <div className="poster-container hidden" id={"updatebox-" + commentid}>
          <textarea className="comment-input" ref={"updatecomment-" + commentid}>{comment.content}</textarea>
          <button className="comment-button" onClick={() => this.updateComment(commentid)}>Update</button>
        </div>
        <hr className="s1" />
        <div className="comment-actions" id={"actions-" + commentid}>
          <a onClick={() => this.showReplyBox(commentid)}>Reply</a>
          {comment.deleted || (<span> · <a onClick={() => this.deleteComment(commentid)}>Delete</a></span>)}
          {(comment.nickname !== this.nickname) || (<span> · <a onClick={() => this.showEditCommentBox(commentid)}>Edit</a></span>)}
        </div>
        <div className="poster-container hidden" id={"commentbox-" + commentid}>
          <textarea placeholder="Ask a question or add a comment..." className="comment-input" ref={"comment-" + commentid} />
          <button className="comment-button" onClick={() => this.replyComment(commentid, comment.content)}>Post</button>
        </div>
      </div>
    ));

    forEach(comment.children, (childid) => {
      ret = concat(ret, this.dfs(childid, depth + 1));
    });

    return ret;
  }

  getCommentDivs() {
    return flattenDeep(map(this.state.commentsRoots, (rootid) => this.dfs(rootid, 0)));
  }

  render() {
    return (!this.props.auth.loggedIn()) ? (
      <div className="comment-box">
        <p className="comment-helper"><a onClick={this.props.showLoginModal}>Log in</a> or <a onClick={this.props.showSignupModal}>sign up</a> to see discussion or post a question.</p>
      </div>
    ) : (
      <div className="comment-box">
        <div className="poster-container">
          <textarea placeholder="Ask a question or add a comment..." className="comment-input" ref="comment" />
          <button className="comment-button" onClick={this.addComment}>Post</button>
          {!this.state.error || (<p className="error-text">{this.state.error}</p>)}
        </div>
        <div className="comments">
          {this.getCommentDivs()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showLoginModal: () => dispatch(showLoginModal()),
    showSignupModal: () => dispatch(showSignupModal()),
  };
};

const Comments = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentsComponent);

export default Comments;
