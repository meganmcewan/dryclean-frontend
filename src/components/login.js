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

    submitLogin = async (e) => {
      e.preventDefault()
      console.log('clicked login submit button')
      console.log('login username: ', this.usernameInput.value)
      console.log('login password: ', this.passwordInput.value)

      var uidFromBack = await login(this.usernameInput.value, this.passwordInput.value)

      if(uidFromBack !== undefined){
        this.setState({userId :uidFromBack })
        this.props.history.push('/dashboard')
      }
      else {alert ('username or password incorrect')}
    }

  render () {
    return (
      <div className='inital-css'>
          <h3>Log In:</h3>
          <form>
        <input ref={r => this.usernameInput = r} type='text' placeholder='Username' />
        <input ref={r => this.passwordInput = r} type='password' placeholder='Password' />
        <button onClick={this.submitLogin}>Submit</button>
        </form>
        <div>or <Link to='/signup'>Sign Up</Link>
        </div>
      </div>
    )
  }
}

export default Login





//   render () {
//     console.log(this.state.userId)
//     return (
//       <div className='inital-css'>
//           <h3>Log In:</h3>
//         <input ref={ref => this.email = ref} type='text' placeholder='email' />
//         <input ref={ref => this.password = ref} type='password' placeholder='Password' />
//         <button onClick={this.submitLogin}>Submit</button>
//         <div>or <Link to='/signup'>Sign Up</Link>
//         </div>
//       </div>
//     )
//   }
// }
