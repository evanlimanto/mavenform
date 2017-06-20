import React, { Component } from 'react';

class Waitlisted extends Component {
  componentDidMount() { 
    window.setTimeout(() => document.location = "/", 2000);
  }

  render() {
    return <h1>Waitlisted!</h1>;
  }
}

export default Waitlisted;
