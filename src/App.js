import React, { Component } from 'react';
import { EE16AFa15, EE16AFa16 } from './exams';
import renderHTML from 'react-render-html';
import { generateLatexMatrix } from './utils';

import './App.css';

class App extends Component {
  render() {
    return <EE16AFa16 />;
  }
}

export default App;
