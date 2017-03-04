import React, { Component } from 'react';

class Expire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };

    this.defaultProps = {
      delay: 1000
    };
  }

  componentWillReceiveProps(nextProps) {
    // reset the timer if children are changed
    if (nextProps.children !== this.props.children) {
      this.setTimer();
      this.setState({visible: true});
    }
  }

  componentDidMount() {
    this.setTimer();
  }

  setTimer() {
    // clear any existing timer
    if (this._timer != null) {
      clearTimeout(this._timer);
    }

    // hide after `delay` milliseconds
    this._timer = setTimeout(function(){
      this.setState({visible: false});
      this.props.callback();
      this._timer = null;
    }.bind(this), this.props.delay);
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
  }

  render() {
    return this.state.visible
           ? <div>{this.props.children}</div>
           : <span />;
  }
}

export default Expire;
