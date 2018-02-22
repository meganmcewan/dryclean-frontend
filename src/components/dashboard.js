import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      dashboardOrders: 'OPEN_ORDERS'
    }
  }

//------- BUTTON THAT TAKES YOU TO A 'NEW ORDER' FORM
  createNewOrder = () => {
    console.log('new order button pressed')
    this.props.history.push('/orderform')
  }

 //------- FUNCTIONS THAT RENDER THE 3 DIFFERENT ORDER STATUS LISTS
  openOrders = () => {
    return (
      <div>
        <h3>Open Orders</h3>
        <div className='flex'>
          <p>Order</p>
          <p>Items</p>
          <p>Ready</p>
          <p>Total</p>
        </div>


        <div className='order-listing'>
          <div className='flex'>
            <p>#1234</p>
            <p>5</p>
            <p>02/13/18 12PM</p>
            <p>$12.00</p>
          </div>
        </div>
      </div>

    )
  }

  pastDueOrders = () => {
    return
    (<div>
      <h3>Past Due Orders</h3>
      <div className='flex'>
        <p>Order</p>
        <p>Items</p>
        <p>Ready</p>
        <p>Total</p>
      </div>


      <div className='order-listing'>
        <div className='flex'>
          <p>#24343</p>
          <p>2</p>
          <p>01/13/18 12:00PM</p>
          <p>$8.00</p>
        </div>
      </div>
    </div>
    )
  }

  completedOrders = () => {
    return(<div>
      <h3>Completed Orders</h3>
      <div className='flex'>
        <p>Order</p>
        <p>Items</p>
        <p>Ready</p>
        <p>Total</p>
      </div>


      <div className='order-listing'>
        <div className='flex'>
          <p>#9847</p>
          <p>4</p>
          <p>02/08/18 1:00PM</p>
          <p>$16.00</p>
        </div>
      </div>
    </div>
    )
  }

//------- ON-CLICK FUNCTIONS THAT CHANGES STATE TO DISPLAY DIFFERENT LISTS
  showOpen = () => {
    this.setState({ dashboardOrders: 'OPEN_ORDERS' })
  }

  showPastDue = () => {
    this.setState({ dashboardOrders: 'PAST_DUE' })
  }

  showCompleted = () => {
    console.log('completed order button pressed')
    this.setState({ dashboardOrders: 'COMPLETED_ORDERS' })
  }

  render() {
    return (
      <div className='inital-css'>
        <h3>Order Dashboard</h3>
        <input type='text' placeholder='Search' />
        <button>Submit</button>

        <div>
          <button onClick={this.showOpen}>Open</button>
          <button onClick={this.showPastDue}>Past Due</button>
          <button onClick={this.showCompleted}>Completed</button>
        </div>

        <div>{this.state.dashboardOrders === 'OPEN_ORDERS' ? this.openOrders()
            : this.state.dashboardOrders === 'PAST_DUE' ? this.pastDueOrders()
            : this.state.dashboardOrders === 'COMPLETED_ORDERS' ? this.completedOrders()
            : null }
        </div>

        <button onClick={this.createNewOrder}>NEW ORDER</button>
      </div>
    )
  }
}

export default Dashboard
