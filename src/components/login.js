import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../requests';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      userId: ""
    }
  }

  // SUBMITS & CHECKS LOGIN INFORMATION WITH BACKEND  ---------------------
  submitLogin = async (e) => {
    e.preventDefault()

    var uidFromBack = await login(this.usernameInput.value, this.passwordInput.value)

    if (uidFromBack !== undefined) {
      this.setState({ merchantID: uidFromBack.merchantID, isLoggedIn: true })
      this.props.history.push('/dashboard', { merchantID: uidFromBack.merchantID, isLoggedIn: true })
    }

  }

  render() {
    return (
      <div className='inital-css'>
      <div className='loginWrapper'>
          <h3>Log In:</h3>
          <form>
            <div className='formInput'>
              <input ref={r => this.usernameInput = r} type='text' placeholder='Email' />
            </div>
            <div className='formInput'>
              <input ref={r => this.passwordInput = r} type='password' placeholder='Password' />
            </div>
            <button className='ctaButton' onClick={this.submitLogin}>Submit</button>
          </form>
          <p className='footnote'>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
        </div>
      </div>
    )
  }
}

export default Login