import React, { Component } from 'react';

class Course extends Component {
  render() {
    return (
      <div>
        <a className="return screen home-link" href="/">&#8592; HOME</a>
        <a className="return mobile home-link" href="/">&#8592; HOME</a>
        <a className="feedback home-link" href="https://goo.gl/forms/JVXIpJ3TVhYNxMQW2" target="_blank">FEEDBACK?</a>
        <div className="banner">
          <hr className="margin" />
          <h6>EE 16A</h6>
          <hr className="s2" />
          <div className="center">
            <h5 className="h5-alt">Designing Information Devices and Systems I</h5>
          </div>
          <hr className="margin" />
        </div>
        <div className="card-container center">
          <hr className="margin-alt" />
          <h1 className="center">Exams</h1>
          <hr className="s1" />
          <h5>Available Mavenform exams</h5>
          <hr className="s2" />
          <a className="card" href="/?exam=ee16afa16">
            <h2>Midterm 1</h2>
            <h3 className="card-subtitle">Fall 2016</h3>
            <i>Ayazifar, Stojanovic</i>
            <h4 className="card-helper">CLICK TO VIEW &#8594;</h4>
          </a>
          <a className="card" href="/?exam=ee16asp16">
            <h2>Midterm 1</h2>
            <h3 className="card-subtitle">Spring 2016</h3>
            <i>Alon, Ayazifar</i>
            <h4 className="card-helper">CLICK TO VIEW &#8594;</h4>
          </a>
          <a className="card" href="/?exam=ee16afa15">
            <h2>Midterm 1</h2>
            <h3 className="card-subtitle">Fall 2015</h3>
            <i>Niknejad, Sahai</i>
            <h4 className="card-helper">CLICK TO VIEW &#8594;</h4>
          </a>
          <a className="card" href="/?exam=ee16asp15">
            <h2>Midterm 1</h2>
            <h3 className="card-subtitle">Spring 2015</h3>
            <i>Alon, Ayazifar, Subramanian</i>
            <h4 className="card-helper">CLICK TO VIEW &#8594;</h4>
          </a>
          <hr className="margin-alt" />
        </div>
        <div className="light-gray center">
          <hr className="margin-alt" />
          <h1 className="center">Sources</h1>
          <hr className="s1" />
          <h5>All publicly listed PDF exams</h5>
          <hr className="s4" />
          <div className="table-container-container">
            <div className="table-container">
              <table className="center">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Term</th>
                    <th>Instructors</th>
                    <th>Exam</th>
                    <th>Solutions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Midterm 1</td>
                    <td>Fall 2016</td>
                    <td>Ayazifar, Stojanovic</td>
                    <td><a>PDF</a></td>
                    <td><a>PDF</a></td>
                  </tr>
                  <tr>
                    <td>Midterm 1</td>
                    <td>Spring 2016</td>
                    <td>Alon, Ayazifar</td>
                    <td><a>PDF</a></td>
                    <td><a>PDF</a></td>
                  </tr>
                  <tr>
                    <td>Midterm 1</td>
                    <td>Fall 2015</td>
                    <td>Niknejad, Sahai</td>
                    <td><a>PDF</a></td>
                    <td><a>PDF</a></td>
                  </tr>
                  <tr>
                    <td>Midterm 1</td>
                    <td>Spring 2015</td>
                    <td>Alon, Ayazifar, Subramanian</td>
                    <td><a>PDF</a></td>
                    <td><a>PDF</a></td>
                  </tr>
                  <tr>
                    <td>Midterm 2</td>
                    <td>Fall 2016</td>
                    <td>Ayazifar, Stojanovic</td>
                    <td><a>PDF</a></td>
                    <td><a>PDF</a></td>
                  </tr>
                  <tr>
                    <td>Midterm 2</td>
                    <td>Spring 2016</td>
                    <td>Alon, Ayazifar</td>
                    <td><a>PDF</a></td>
                    <td><a>PDF</a></td>
                  </tr>
                  <tr>
                    <td>Midterm 2</td>
                    <td>Fall 2015</td>
                    <td>Niknejad, Sahai</td>
                    <td><a>PDF</a></td>
                    <td><a>PDF</a></td>
                  </tr>
                  <tr>
                    <td>Midterm 2</td>
                    <td>Spring 2015</td>
                    <td>Alon, Ayazifar, Subramanian</td>
                    <td><a>PDF</a></td>
                    <td><a>PDF</a></td>
                  </tr>
                  <tr>
                    <td>Final</td>
                    <td>Spring 2016</td>
                    <td>Alon, Ayazifar</td>
                    <td><a>PDF</a></td>
                    <td><a>PDF</a></td>
                  </tr>
                  <tr>
                    <td>Final</td>
                    <td>Fall 2015</td>
                    <td>Niknejad, Sahai</td>
                    <td><a>PDF</a></td>
                    <td><a>PDF</a></td>
                  </tr>
                  <tr>
                    <td>Final</td>
                    <td>Spring 2015</td>
                    <td>Alon, Ayazifar, Subramanian</td>
                    <td><a>PDF</a></td>
                    <td><a>PDF</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr className="margin" />
          </div>
        </div>
        <div className="banner center">
          <hr className="s2" />
          <p className="white-text">Made by <a className="footer-link" href="http://www.kevinandstuff.com/" target="_blank">Kevin</a> & <a className="footer-link" href="http://evanlimanto.github.io/" target="_blank">Evan</a></p>
          <hr className="s2" />
        </div>
      </div>
    );
  }
}

export default Course;