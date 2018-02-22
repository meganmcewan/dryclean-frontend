import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
 import { login } from '../requests';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      userId: ""
    }
  }
    
  
  
  // submitLogin = () => {
    // console.log('clicked login submit button')
    // this.props.history.push('/dashboard')
    // }


    submitLogin = async () => {
      var uidFromBack = await login(this.email.value, this.password.value)
    
      if(uidFromBack !== undefined){
        this.setState({userId :uidFromBack })
        this.props.history.push('/dashboard')
      }
      else {alert ('username or password incorrect')}
    }

  render () {
    console.log(this.state.userId)
    return (
      <div className='inital-css'>
          <h3>Log In:</h3>
        <input ref={ref => this.email = ref} type='text' placeholder='email' />
        <input ref={ref => this.password = ref} type='password' placeholder='Password' />
        <button onClick={this.submitLogin}>Submit</button>
        <div>or <Link to='/signup'>Sign Up</Link>
        </div>
      </div>
    )
  }
}

export default Login
