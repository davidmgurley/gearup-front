import React, { Component } from 'react';
import './App.css';
import './BrowseGear.css'
import './HeaderTop.css'
import './PostGear.css'
import HeaderTop from './components/HeaderTop'
import BrowseGear from './components/BrowseGear'
import PostGear from './components/PostGear'
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

const gearUpURL = 'https://gear-up-backend.herokuapp.com/gear'

class App extends Component {

  constructor(props) {
    super(props)
    this.child = React.createRef()
    this.state = {
      loggedInUser: 'Please Log In or Create an Account',
      showProfile: false
      }
    }

  signUp = (event) => {
      const signupPassword = document.getElementById('signup-password')
      const signupEmail = document.getElementById('signup-email')
      const pass = signupPassword.value
      const email = signupEmail.value
      const auth = firebase.auth()
      const promise = auth.createUserWithEmailAndPassword(email, pass)
      promise.catch(e => console.log(e.message))
      firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
          this.setState ({ loggedInUser: firebaseUser.email }, () => {this.child.current.visibleButton()})
          console.log(firebaseUser.email)
        } else {
          console.log('not logged in')
        }})
    }

  logIn = (event) => {
    const signupPassword = document.getElementById('login-password')
    const signupEmail = document.getElementById('login-email')
    const pass = signupPassword.value
    const email = signupEmail.value
    const auth = firebase.auth()
    const promise = auth.signInWithEmailAndPassword(email, pass)
    promise.catch(e => console.log(e.message))
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        this.setState ({ loggedInUser: firebaseUser.email }, () => {this.child.current.visibleButton()})
        // console.log(firebaseUser.email)
      } else {
        console.log('not logged in')
      }})
  }

  logOut = () => {
    firebase.auth().signOut()
    firebase.auth().onAuthStateChanged(firebaseUser => {
        this.setState({ loggedInUser: 'Please Log In or Create an Account' }, () => {this.child.current.visibleButton()})
      })
      alert('Thanks for visiting! You are now logged out')
  }

  showPostGear = () => {
    this.setState({showProfile: true})
  }

  showBrowseGear = () => {
    this.setState({showProfile: false})
  }



  render() {
    return (
      <div className="App">
        <HeaderTop showPostGear={this.showPostGear} signUp={this.signUp} logIn={this.logIn} logOut={this.logOut} loggedInUser={this.state.loggedInUser} ref={this.child}/>
        {this.state.showProfile ? <PostGear showBrowseGear={this.showBrowseGear} user={this.state.loggedInUser} /> : <BrowseGear />}
        <footer>
          <p className="copyright"> &copy;GearUp 2018</p>
          <p>Carter Decker Gurley Hyrka Livingston</p>
        </footer>
      </div>
    );
  }
}

window.onbeforeunload = function(e) {
  firebase.auth().signOut()
}

export default App;
