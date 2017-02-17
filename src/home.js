import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="card-container center">
        <hr className="margin" />
        <h1>EE 16A</h1>
        <hr className="s2" />
        <div className="center">
          <h5>Available Past Exams</h5>
        </div>
        <hr className="s5" />
        <a className="card" href="/?exam=ee16asp15">
          <h2>Midterm 1</h2>
          <h3>Spring 2015</h3>
          <i>Alon, Ayazifar, Subramanian</i>
        </a>
        <a className="card" href="/?exam=ee16afa15">
          <h2>Midterm 1</h2>
          <h3>Fall 2015</h3>
          <i>Niknejad, Sahai</i>
        </a>
        <a className="card" href="/?exam=ee16asp16">
          <h2>Midterm 1</h2>
          <h3>Spring 2016</h3>
          <i>Alon, Ayazifar</i>
        </a>
        <a className="card" href="/?exam=ee16afa16">
          <h2>Midterm 1</h2>
          <h3>Fall 2016</h3>
          <i>Ayazifar, Stojanovic</i>
        </a>
        <hr className="margin" />
      </div>
    );
  }
}

export default Home;
