import './App.css';
import React, { Component } from 'react';

import Main from './components/MainComponent';
import MyProvider from './contexts/MyProvider';

class App extends Component {
  render() {
    return (
      <MyProvider>
        <Main />
      </MyProvider>
    );
  }
}

export default App;