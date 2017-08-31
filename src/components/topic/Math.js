import React, { Component } from 'react';
import { map, range } from 'lodash';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Line } from 'rc-progress';
import { Link } from 'react-router-dom';
import hash from 'string-hash';

import Navbar from '../navbar';
import Footer from '../footer';

require('../../css/Math.css');

function getGreenToRed(percent){
  console.log(Math);
  let r, g;
  r = percent<50 ? 255 : Math.floor(255-(percent*2-100)*255/100);
  g = percent>50 ? 255 : Math.floor((percent*2)*255/100);
  r = r.toString(16)
  g = g.toString(16)
  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  return r + g + "00";
}

class MathComponent extends Component {
  render() {
    const topics = ["General Concepts", "Multiple Integrals"];
    const subtopics = [
      ["Vectors", "Derivatives", "Integrals", "Planes", "Coordinates"],
      ["Integrals over Planes", "Integrals in Polar Coordinates"],
    ];
    const fromColor = '00FF00';
    const toColor = 'FFA05A';
    const fromVal = parseInt(fromColor, 16);
    const toVal = parseInt(toColor, 16);
    return (
      <div>
        <Navbar />
        <div id="header-text">
          <div className="center">
            <h4>Math 53</h4>
          </div>
        </div>
        <div className="content">
          {map(range(0, 2), (index) => {
            const items = map(subtopics[index], (subtopic) => {
              const percent = hash(subtopic) % 100;
              const hexColor = "#" + getGreenToRed(percent);
              return (
                <div className="subtopic">
                  <Line className="progress" percent={percent} strokeWidth="5" strokeColor={hexColor} />
                  <label><Link to="/interactive/math53/problems">{subtopic}</Link></label>
                  <label>({Math.floor(percent/100 * 5)} / 5)</label>
                </div>
              );
            });
            return (
              <div className="topic-container">
                <div className="topic">{topics[index]}</div>
                <hr className="s2" />
                {items}
              </div>
            );
          })}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { dispatch };
};

const Math53 = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MathComponent);

export default Math53;
