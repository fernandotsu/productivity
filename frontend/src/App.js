import React, { Component } from 'react';
import './App.css';

import Routes from './Router';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     validatingToken: false
  //   };
  // }

  render() {
    return <Routes />;
  }
}

export default App;
