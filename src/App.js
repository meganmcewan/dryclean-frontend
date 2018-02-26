import React, { Component } from 'react'
import './App.css'
import { Switch, Route } from 'react-router'
import Home from './components/home.js'
import Login from './components/login.js'
import Signup from './components/signup.js'
import CreateAccount from './components/createaccount'
import orderForm from './components/orderForm.js'
import Dashboard from './components/dashboard.js'
import Confirmation from './components/confirmation.js'
import ClientOrder from './components/clientorder.js'
import firebase from './firebaseConfig.js'
import ViewOrder from './components/vieworder.js'

import { signUp, getUsers, login } from './requests'

// these are the imported functions to talk to the backend
// import './requests';

class App extends Component {
  constructor () {
    super()
    this.state = {
      loggedIn: false
    }
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      if (user !== null) {
        this.setState({ loggedIn: true })
        // User is signed in.
        // ...
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  render () {
    console.log(this.state.loggedIn)
    return (
      <Switch>
        {!this.state.loggedIn && <Route exact path='/' component={Home} />}
        {!this.state.loggedIn && <Route path='/login' component={Login} />}
        {!this.state.loggedIn && <Route path='/signup' component={Signup} /> }
        {this.state.loggedIn && <Route path='/createaccount' component={CreateAccount} />}
        {this.state.loggedIn && <Route path='/orderform' component={orderForm} />}
        {this.state.loggedIn && <Route path='/clientorder' component={ClientOrder} />}
        {this.state.loggedIn && <Route path='/dashboard' component={Dashboard} />}
        {this.state.loggedIn && <Route path='/confirmation' component={Confirmation} />}
        <Route path='/vieworder/:orderID' component={ViewOrder} />
      </Switch>
    )
  }
}

export default App
