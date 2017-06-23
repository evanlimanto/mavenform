import React, { Component } from 'react';
import { keys, map } from 'lodash';
import DocumentMeta from 'react-document-meta';

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
    if (keys(this.state.apps).length === 0)
      return <h1>No apps submitted.</h1>

    const meta = { robots: "noindex" };
    return (
      <div>
      <DocumentMeta {...meta} />
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
            Resume: <a href={"https://storage.googleapis.com/studyform-marketing/" + app.resume} target="_blank" rel="noopener noreferrer"><u>Link</u></a>
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
