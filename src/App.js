import React, { Component } from 'react'
import './App.css'
import { Switch, Route } from 'react-router'
import Home from './components/home.js'
import Login from './components/login.js'
import Signup from './components/signup.js'
import CreateAccount from './components/createaccount'
import orderForm from './components/orderForm.js'
import dashboard from './components/dashboard.js'
import confirmation from './components/confirmation.js'

import { signUp, getUsers, login} from './requests'

// these are the imported functions to talk to the backend
// import './requests';


class App extends Component {
  // signUp = () => {
  //   signup(this.email.value, this.username.value, this.password.value)

  // }

  render () {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/createaccount' component={CreateAccount} />
        <Route path='/orderform' component={orderForm} />
        <Route path='/dashboard' component={dashboard} />
        <Route path='/confirmation' component={confirmation} />
      </Switch>
    )
  }
}

export default App
