import React, { Component } from 'react'
import './App.css'
import { Switch, Route } from 'react-router'
import Home from './components/home.js'
import Login from './components/login.js'
// import signup from './components/signup.js'
import orderForm from './components/orderForm.js'
import { signup, login, signout, addOrder } from './requests';


// these are the imported functions to talk to the backend
import './requests';



class App extends Component {
  signUp = () => {
    signup(this.email.value, this.username.value, this.password.value)

  }

  login = () => {
    var uidFromBack = login(this.email.value, this.password.value)
    console.log(uidFromBack, "this is the user object from the back ")

  }
signOut = () => {

  signout()
}



  // getUsers = async () => {
  //   const data = await getUsers();
  //   console.log(data);
  //   //setstate....
  // }

  add = () => {
    addOrder(this.orderID.value, this.userID.value, this.info1.value, this.info2.value)

  }


  render() {
    return (
      <div>
        <div>
          <input ref={ref => this.email = ref} placeholder="email" type="email" />
          <input ref={ref => this.password = ref} placeholder="password"type="password" />
          <input ref={ref => this.username = ref} placeholder="username" type="text" />
          <button onClick={this.signUp}>Sign Up</button>
          <button onClick={this.login}>login</button>
          <button onClick={this.signOut}>signOut</button>

        </div>

        <div>
          <input ref={ref => this.orderID = ref} type="text" />
          <input ref={ref => this.userID = ref} type="text" />
          <input ref={ref => this.info1 = ref} type="text" />
          <input ref={ref => this.info2 = ref} type="text" />
          <button onClick={this.add}>Add a new order!</button>
        </div>
      </div>
    )
  }
}

export default App
