import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="card-container center">
        <div className="banner">
          <hr className="margin" />
          <h6>Mavenform</h6>
          <hr className="s2" />
          <div className="center">
            <h5 className="h5-alt">A responsive and intuitive format to view past exams</h5>
          </div>
          <hr className="margin" />
        </div>
        <h1 className="center">EE 16A</h1>
        <hr className="s1" />
        <h5>Available Exams</h5>
        <hr className="s2" />
        <a className="card" href="/?exam=ee16afa16">
          <h2>Midterm 1</h2>
          <h3>Fall 2016</h3>
          <i>Ayazifar, Stojanovic</i>
          <h4 className="card-helper">CLICK TO VIEW &#8594;</h4>
        </a>
        <a className="card" href="/?exam=ee16asp16">
          <h2>Midterm 1</h2>
          <h3>Spring 2016</h3>
          <i>Alon, Ayazifar</i>
          <h4 className="card-helper">CLICK TO VIEW &#8594;</h4>
        </a>
        <a className="card" href="/?exam=ee16afa15">
          <h2>Midterm 1</h2>
          <h3>Fall 2015</h3>
          <i>Niknejad, Sahai</i>
          <h4 className="card-helper">CLICK TO VIEW &#8594;</h4>
        </a>
        <a className="card" href="/?exam=ee16asp15">
          <h2>Midterm 1</h2>
          <h3>Spring 2015</h3>
          <i>Alon, Ayazifar, Subramanian</i>
          <h4 className="card-helper">CLICK TO VIEW &#8594;</h4>
        </a>
        <hr className="margin" />
      </div>
    );
  }
}

export default Home;
