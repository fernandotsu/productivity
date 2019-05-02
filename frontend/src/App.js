import React, { Component } from 'react';
import './App.css';

//import Main from './pages/Main/main';
import Routes from './Router';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {

  }

  render() {
    // return this.state.user ? (<Main />) : (<Routes />);
    return <Routes />
  }
}

export default App;
