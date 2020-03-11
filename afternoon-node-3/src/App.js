import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'


class App extends Component {
  createTable = () => {
  axios.post(`http://localhost:8080/api/table`)
  .then(res => console.log(res))
  .catch(err => console.log(err))
  }

  render(){
    return (
    <div className="App">
      <button onClick={this.createTable}>add</button>
    </div>
  );
}
}

export default App;
