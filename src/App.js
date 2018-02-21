import React, { Component } from 'react'
import './App.css'
import Login from './components/login.js'

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
      <div className='App'>
        Hello World
      </div>
    )
  }
}

export default App
