import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class orderForm extends Component {
  constructor () {
    super()
    this.state = {currentPage : null}
  }

  orderFormHome = () => {
    return(
    <div className='inital-css'>
      <label for="telNo">Enter a telephone number:</label>
      <input id="telNo" type="tel" placeholder="(111)-222-3333" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
      <button type="submit" onClick={this.goToOrderPageOne} placeholder="submit">Submit</button>
      {/* at this point we send the number to the backend and receive if there is any user information already */}
    </div >
    )
  }

  goToOrderPageOne = () => {
    console.log('going to page 1')
    this.setState(st => ({ currentPage: 'orderFormPageOne' }))
  
  }

  orderFormOne = () => {
    return (
      <div className='inital-css'>
        <form>
          <div>
            <input type="checkbox" id="pickup" name="pickup" value="pickup"/>
            <label for="pickup">Pickup</label>
            <input type="checkbox" id="delivery" name="delivery" value="delivery"/>
            <label for="delivery">Delivery</label>
          </div>
          <div>
            "This is where the rest of the form goes"
          </div>
          <div>
          <button onClick={this.goToOrderPageTwo}>Submit</button>
          </div>
        </form>
      </div>
    )
  }

  goToOrderPageTwo = () => {
    console.log('going to page 2')
    this.setState(st => ({ currentPage: 'orderFormPageTwo' }))
    
  }

  orderFormTwo = () => {
    return (
      <div className='inital-css'>
        This is page two.
        <button onClick={this.goToOrderPageOne} />
        <button onClick={this.goToOrderPageThree} />
      </div>
    )
  }

  goToOrderPageThree = () => {
    console.log('going to page 3')
    this.setState(st => ({ currentPage: 'orderFormPageThree' }))
    
  }

  orderFormThree = () => {
    return (
      <div className='inital-css'>
      This is page three.
        <button onClick={this.goToOrderPageTwo} />
        <button onClick={this.goToReview} />
      </div>
    )
  }

  goToReview = () => {
    console.log('going to Review')
      this.setState(st => ({ currentPage: 'orderFormReview' }))
    
  }

  orderFormReview = () => {
    return (
      <div className='inital-css'>
        This is the review!
        <button onClick={this.goToOrderPageThree} />
        <button onClick={this.goToConfirmation} />
      </div>
    )
  }

  goToConfirmation = () => {
    return (
      this.setState(st => ({ currentPage: 'orderFormConfirmation'}))
    )
  }

  orderFormConfirmation = () => {
    return (
      <div className='inital-css'>
        This is the confirmation!
        <button onClick={this.goToOrderPageThree} />
        <button onClick={this.goToDashboard}/>
      </div>
    )
  }

  goToDashboard = () => {
      this.setState(st => ({ currentPage: 'dashboard' }))
  }

  dashboard = () => {
    this.props.history.push('/dashboard')
  }


render () {
  
    if (this.state.currentPage === null) return (this.orderFormHome())
    if (this.state.currentPage === 'orderFormPageOne') return (this.orderFormOne())
  if (this.state.currentPage === 'orderFormPageTwo') return (this.orderFormTwo())
   if (this.state.currentPage === 'orderFormPageThree') return (this.orderFormThree())
  if (this.state.currentPage === 'orderFormReview') return (this.orderFormReview())
  if (this.state.currentPage === 'orderFormConfirmation') return (this.orderFormConfirmation())
  if (this.state.currentPage === 'dashboard') return (this.dashboard())

  }
}

export default orderForm
