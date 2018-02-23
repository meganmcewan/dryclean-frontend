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

  submitLogin = async (e) => {
    e.preventDefault()

    var uidFromBack = await login(this.usernameInput.value, this.passwordInput.value)

    if (uidFromBack !== undefined) {
      this.setState({ userId: uidFromBack, isLoggedIn: true })
      this.props.history.push('/dashboard', { userId: uidFromBack, isLoggedIn: true })
    }
    else { alert('username or password is incorrect') }
  }

  render() {
    return (
      <div className='inital-css'>
        <h3>Log In:</h3>
        <form>
          <input ref={r => this.usernameInput = r} type='text' placeholder='Email' />
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
