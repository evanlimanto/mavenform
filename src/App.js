import React, { Component } from 'react';
import { VariablesQuestion, MatrixQuestion } from './components/question';
import { fa15q3, fa15q4 } from './exams';
import renderHTML from 'react-render-html';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { fa15q3: '' };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    fetch('/api?id=fa15-q3', {
      accept: 'text/html'
    }).then((response) => {
      return response.text();
    }).then((data) => {
      this.setState({ fa15q3: data }); 
    });
  }

  render() {
    return (
      <div>
        <VariablesQuestion content={fa15q3} variables={['x_1', 'x_2']} />
        <hr className="s5" />
        <MatrixQuestion content={fa15q4} rows={2} cols={2} />
        <hr className="s5" />
      </div>
    );
  }
}

export default App;
