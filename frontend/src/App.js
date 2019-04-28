import React, { Component } from 'react';
import './App.css';
import fire from './services/Fire';

//import Login from './pages/Login/Singin/signin'
import Main from './pages/Main/main';
import Routes from './Router';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.authLisnter();
  }

  authLisnter() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        //localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        //localStorage.removeItem('user');
      }
    });
  }

  render() {
    return this.state.user ? (<Main />) : (<Routes />);
  }
}

export default App;
