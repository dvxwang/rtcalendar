import React from 'react';

import MainbodyBox from './Components/MainbodyBox/MainbodyBox'

import './App.css';

//Main app
var App = React.createClass({
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="Header-image"></div>
          <div className="Head-title">Rocketrip Itinerary</div>
          <div className="Header-image"></div>
        </div>
        <MainbodyBox />
      </div>
    );
  }
})

export default App;
