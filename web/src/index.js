import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {

  render() {
    return <div>Hello react</div>;
  }
}

ReactDOM.render(<App />, document.body.appendChild(document.createElement('div')))
