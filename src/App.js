import React, { Component } from 'react';
import { VariablesQuestion, MatrixQuestion, FreeFormQuestion } from './components/question';
import { fa15q3, fa15q4, fa15q5, fa15q6, fa15q7a, fa15q7b, fa15q7c, fa15q8a, fa15q8b, fa15q8c, fa15q8d, fa15q8e, fa15q9a, fa15q9b, fa15q9c, fa15q9d, fa15q9e, fa15q9f } from './exams';
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
        <h2>Section 1: Straightforward questions <i>(24 points)</i></h2>
        <VariablesQuestion content={fa15q3} variables={['x_1', 'x_2']} />
        <hr className="s5" />
        <MatrixQuestion content={fa15q4} rows={2} cols={2} />
        <hr className="s5" />
        <FreeFormQuestion content={fa15q5} hasResponse={false} />
        <hr className="s5" />
        <FreeFormQuestion content={fa15q6} hasResponse={false} />
        <hr className="s5" />
        <h2>Section 2: Free-form Problems <i>(94 + 15 points)</i></h2>
        <FreeFormQuestion content={fa15q7a} hasResponse={false} />
        <hr className="s5" />
        <FreeFormQuestion content={fa15q7b} hasResponse={false} />
        <hr className="s5" />
        <FreeFormQuestion content={fa15q7c} hasResponse={false} />
        <hr className="s5" />
        <FreeFormQuestion content={fa15q8a} hasResponse={false} />
        <hr className="s5" />
        <FreeFormQuestion content={fa15q8b} hasResponse={false} />
        <hr className="s5" />
        <FreeFormQuestion content={fa15q8c} hasResponse={false} />
        <hr className="s5" />
        <FreeFormQuestion content={fa15q8d} hasResponse={false} />
        <hr className="s5" />
        <FreeFormQuestion content={fa15q8e} hasResponse={false} />
        <hr className="s5" />
        <FreeFormQuestion content={fa15q9a} hasResponse={false} />
        <hr className="s5" />
        <FreeFormQuestion content={fa15q9b} hasResponse={false} />
        <hr className="s5" />
        <FreeFormQuestion content={fa15q9c} hasResponse={false} />
        <hr className="s5" />
        <FreeFormQuestion content={fa15q9d} hasResponse={false} />
        <hr className="s5" />
        <FreeFormQuestion content={fa15q9e} hasResponse={false} />
        <hr className="s5" />
        <FreeFormQuestion content={fa15q9f} hasResponse={false} />
        <hr className="s5" />
      </div>
    );
  }
}

export default App;
