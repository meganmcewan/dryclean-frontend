import React, { Component } from 'react'
import Login from './login'
import { withRouter } from 'react-router-dom'

var LoginWithRouter = withRouter(Login)
class Home extends Component {
  render () {
    return (
      <div className='inital-css'>
        <h3>Home Page:</h3>
        <LoginWithRouter />
      </div>
    )
  }
}

export default Home
