import React, { Component } from 'react';
import './App.css';

//import Main from './pages/Main/main';
import Signin from './pages/Singin/signin';
import Routes from './Router';
import api from './services/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validatingToken: false
    };
  }

  componentWillMount = async () => {
    const json = localStorage.getItem('__agile_token')
    const userData = JSON.parse(json);

    if (!userData) {
      this.validatingToken = false;
      this.props.history.push('/signin');
    }

    const res = await api.post('/validateToken', userData);

    if (res.data) {
      this.validatingToken = true;
    } else {
      localStorage.removeItem('__agile_token');
      this.props.history.push('/signin');
    }
  }

  render() {
    // return this.state.user ? (<Main />) : (<Routes />);
    return this.state.validatingToken ? (<Routes />) : (<Signin />);
  }
}

export default App;
