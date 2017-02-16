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
    return (<span>      
        <h2>Section 1: Straightforward questions <i>(24 points)</i></h2>
        <hr className="s2" />
        <VariablesQuestion id={"q3"} content={fa15q3} variables={['x_1', 'x_2']} image={['q3.png']} />
        <hr className="s5" />
        <MatrixQuestion id={"q4"} content={fa15q4} rows={2} cols={2} image={['q4-1.png', 'q4-2.png']} />
        <hr className="s5" />
        <FreeFormQuestion id={"q5"} content={fa15q5} hasResponse={false} image={['q5-1.png', 'q5-2.png']} />
        <hr className="s5" />
        <FreeFormQuestion id={"q6"} content={fa15q6} hasResponse={false} image={['q6-1.png', 'q6-2.png']} />
        <hr className="s5" />
        <hr className="margin" />
        <h2>Section 2: Free-form Problems <i>(94 + 15 points)</i></h2>
        <hr className="s2" />
        <MatrixQuestion id={"q7a"} content={fa15q7a} rows={4} cols={4} image={['q7a.png']} />
        <hr className="s5" />
        <FreeFormQuestion id={"q7b"} content={fa15q7b} hasResponse={false} image={['q7b.png']} />
        <hr className="s5" />
        <FreeFormQuestion id={"q7c"} content={fa15q7c} hasResponse={false} image={['q7c.png']} />
        <hr className="s5" />
        <MatrixQuestion id={"q8a"} content={fa15q8a} rows={6} cols={6} image={['q8a.png']} />
        <hr className="s5" />
        <FreeFormQuestion id={"q8b"} content={fa15q8b} hasResponse={false} image={['q8b-1.png', 'q8b-2.png']} />
        <hr className="s5" />
        <FreeFormQuestion id={"q8c"} content={fa15q8c} hasResponse={false} image={['q8c.png']} />
        <hr className="s5" />
        <FreeFormQuestion id={"q8d"} content={fa15q8d} hasResponse={false} image={['q8d.png']} />
        <hr className="s5" />
        <FreeFormQuestion id={"q8e"} content={fa15q8e} hasResponse={false} image={['q8e-1.png', 'q8e-2.png']} />
        <hr className="s5" />
        <FreeFormQuestion id={"q9a"} content={fa15q9a} hasResponse={false} image={['q9a.png']} />
        <hr className="s5" />
        <FreeFormQuestion id={"q9b"} content={fa15q9b} hasResponse={false} image={['q9b.png']} />
        <hr className="s5" />
        <MatrixQuestion id={"q9c"} content={fa15q9c} rows={3} cols={1} image={['q9c.png']} />
        <hr className="s5" />
        <FreeFormQuestion id={"q9d"} content={fa15q9d} hasResponse={false} image={['q9d.png']} />
        <hr className="s5" />
        <FreeFormQuestion id={"q9e"} content={fa15q9e} hasResponse={true} image={['q9e-1.png', 'q9e-2.png']} />
        <hr className="s5" />
        <MatrixQuestion id={"q9f"} content={fa15q9f} rows={3} cols={1} image={['q9f-1.png', 'q9f-2.png']} />
        <hr className="s5" />
    </span>);
  }
}

export default App;
