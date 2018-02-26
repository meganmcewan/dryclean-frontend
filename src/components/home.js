import React, { Component } from 'react'
import Login from './login'
import { withRouter } from 'react-router-dom'
import {  checkLogin } from '../requests';

// var LoginWithRouter = withRouter(Login)
class Home extends Component {

  goToLogin = () => {
    this.props.history.push('/login')
  }

  goToSignUp = () => {
    console.log('sign up')
    this.props.history.push('/signup')
  }  
 
  // componentWillMount () {
    
  //   var uidFromBack = checkLogin()
  //   console.log("1",uidFromBack)
  //   if(uidFromBack.user !== null){
  //     this.props.history.push('/dashboard', { merchantId: uidFromBack.user.uid, isLoggedIn: true })
  //   }
  // }
  render () {
    return (
      <div className='inital-css'>
        <h3>Welcome to CLNR!</h3>
        <img alt='clnr logo' id='clnr-logo' src='https://i.imgur.com/yJBUFUu.png' />
        <div className='home-btns-wrapper'>
        <button onClick={this.goToLogin}>Login</button>
        <button onClick={this.goToSignUp}>Sign Up</button>
        </div>
        {/* <LoginWithRouter /> */}
      </div>
    )
  }
}

export default Home
