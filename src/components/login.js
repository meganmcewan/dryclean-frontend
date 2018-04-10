import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { login, checkLogin } from '../requests';

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

      this.setState({ merchantId: uidFromBack.merchantId })
      this.props.history.push('/dashboard', { merchantId: uidFromBack.merchantId })

    }

  }



  render() {

    return (
      <div>
        <div className='app-nav'>
          <h3>Login to <img id='logo-type-nav' src='https://i.imgur.com/3rrt8WL.png'/></h3>
        </div>
        <div className='loginWrapper'>
          <div className='inital-css'>
          <img id='logo-login' src='https://i.imgur.com/HdPaVzf.png'/>
            <form>
              <div>
                <input ref={r => this.usernameInput = r} type='text' placeholder='Email' />
              </div>
              <div>
                <input ref={r => this.passwordInput = r} type='password' placeholder='Password' />
              </div>
              <button id='color-cta' className='large-footer-btn' onClick={this.submitLogin}>Submit</button>

            </form>
            <p id='footnote'>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
          </div>
        </div>
      </div>
    )
  }
}
export default Login