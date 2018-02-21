import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Login extends Component {
    submitLogin = () => {
    console.log('clicked login submit button')
    }

  render () {
    return (
      <div className='inital-css'>
          <h3>Log In:</h3>
        <input type='text' placeholder='Username' />
        <input type='password' placeholder='Password' />
        <button onClick={this.submitLogin}>Submit</button>
        <div>or <Link to='/signup'>Sign Up</Link>
        </div>
      </div>
    )
  }
}

export default Login
