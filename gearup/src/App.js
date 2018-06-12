import React, { Component } from 'react';
import './App.css';
import './BrowseGear.css'
import BrowseGear from './components/BrowseGear'

import firebase from 'firebase'
require('firebase/auth')

const config = {
    apiKey: "AIzaSyBpiStXZPZ_WaWefQ_cIw27Ipk7oj2e_OI",
    authDomain: "denver-gear-up.firebaseapp.com",
    databaseURL: "https://denver-gear-up.firebaseio.com",
    projectId: "denver-gear-up",
    storageBucket: "denver-gear-up.appspot.com",
    messagingSenderId: "982226317434"
  }
  firebase.initializeApp(config)

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Denver Gear Up</h1>
        <BrowseGear />
      </div>
    );
  }
}

export default App;
