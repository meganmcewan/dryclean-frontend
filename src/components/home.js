import React, { Component } from 'react'
import Login from './login'
import { withRouter } from 'react-router-dom'
import {  checkLogin } from '../requests';








class NakedHome extends Component {

  goToLogin = () => {
    this.props.history.push('/login')
  }

  goToSignUp = () => {
    console.log('sign up')
    this.props.history.push('/signup')
  }  
 

  render () {
   
    return (
      <div className='inital-css' className='home'> 
          <div className='home-btns-wrapper'>
              <button className = 'home-btns' onClick={this.goToLogin}>Login</button>
              <button className = 'home-btns' onClick={this.goToSignUp}>Sign Up</button>
          </div>
          <img alt='clnr logo' id='clnr-logo' src='https://i.imgur.com/m1ff1oB.gif' />
          <div className="iframe-wrapper">
            <iframe className="home-iframe" src="https://player.vimeo.com/video/258202836" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
          </div>
          <h3 className= 'blurb' >clnr.me is a Customer Service Relations platform for dry-cleaners. Delivering efficient order creation & tracking, with easy client communications in a simple and customizable app</h3>
        {/* <LoginWithRouter /> */}
      </div>
    )
  }
}

var Home = withRouter(NakedHome)

export default Home
