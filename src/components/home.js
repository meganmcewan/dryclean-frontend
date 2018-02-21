import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Login from './login'

class Home extends Component {
  render () {
    return (
      <div className='inital-css'>
        <h3>Home Page:</h3>
        <Login />
      </div>
    )
  }
}

export default Home