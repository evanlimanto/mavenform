import React, { Component } from 'react';
import { keys, map } from 'lodash';

class MarketingApps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apps: {},
    };
  }

  componentDidMount() {
    fetch('/getMarketingApps')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ apps: json })
      });
  }

  render() {
    console.log(keys(this.state.apps));
    if (keys(this.state.apps).length === 0)
      return <h1>No apps submitted.</h1>

    return (
      <div>
      {map(this.state.apps, (app, key) => {
        return (
          <div key={key}>
            Name: {app.name}
            <br/>
            Email: {app.email}
            <br/>
            School: {app.school}
            <br/>
            Essay 1: {app.essay1}
            <br/>
            Essay 2: {app.essay2}
            <br/>
            Resume: <a href={"https://storage.googleapis.com/studyform-marketing/" + app.resume} target="_blank"><u>Link</u></a>
            <br/>
            <br/>
          </div>
        );
      })}
      </div>
    );
  }
}

export default MarketingApps;
