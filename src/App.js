import React, { Component } from 'react'
import './App.css'
import { Switch, Route } from 'react-router'
import Home from './components/home.js'
import Login from './components/login.js'
import Signup from './components/signup.js'
import orderForm from './components/orderForm.js'
import dashboard from './components/dashboard.js'

class App extends Component {
  constructor () {
    super()
    this.state = {
      loggedIn: false,
      userType: 'merchant',
      displayPage: null,
      openOrders: [],
      closedOrders: [],
      pastDue: []
    }
  }

  render () {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/orderform' component={orderForm} />
        <Route path='/dashboard' component={dashboard} />
      </Switch>
    )
  }
}

export default App
