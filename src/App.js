import React, { Component } from 'react';
import { EE16ASp15, EE16AFa15, EE16AFa16 } from './exams';
import Home from './home';

import './App.css';

class App extends Component {
  render() {
    var exam = null;
    if (this.props.location.query) {
      exam = this.props.location.query.exam;
    }
    
    if (exam === 'ee16afa16') {
      exam = <EE16AFa16 />; 
    } else if (exam === 'ee16afa15') {
      exam = <EE16AFa15 />;
    } else if (exam === 'ee16asp15') {
      exam = <EE16ASp15 />; 
    } else {
      return (
        <Home />
      );
    } 

    return (
      <span>
        <a className="return" href="/">&#8592; Return</a>
        <div className="test-container">
          <div className="test">
            <hr className="margin" />
              {exam}
            <hr className="margin" />
          </div>
        </div>
      </span>
    );
  }
}

export default App;
