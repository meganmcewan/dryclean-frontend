import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class orderForm extends Component {
  constructor () {
    super()
    this.state = {currentPage : null}
  }

  submitButton = () => {
    console.log('submit button clicked')
  }

  orderFormHomePage = () => {
    this.setState(st => ({ currentPage: null }))
    return(
    <div className='inital-css'>
    <div>This is the home page</div>
      <button onClick={this.orderFormPageOne} />
          </div >
    )
  }

  orderFormPageOne = () => {
    this.setState(st => ({currentPage: this.orderFormPageOne}))
    return (
      <div id="orderFormPageOne">
        This is page one.
        <button onClick={this.orderFormPageOne} />
      </div>
    )
  }

  orderFormPageTwo = () => {
    this.setState(st => ({ currentPage: this.orderFormPageTwo }))
    return (
      <div id="orderFormPageTwo">
        This is page two.
        <button onClick={this.orderFormPageThree} />
      </div>
    )
  }

  orderFormPageThree = () => {
    this.setState(st => ({ currentPage: this.orderFormPageThree }))
    return (
      <div id="orderFormPageThree">
      This is page three.
        <button onClick={this.orderFormHomePage} />
      </div>
    )
  }

render () {
  
    if (this.state.currentPage === null) return (this.orderFormHomePage())
    if (this.state.currentPage === this.orderFormPageOne) return (this.orderFormPageOne())
  if (this.state.currentPage === this.orderFormPageTwo) return (this.orderFormPageTwo())
   if (this.state.currentPage === this.orderFormPageThree) return (this.orderFormPageThree())
    
  }
}

export default orderForm
