import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { createNewOrder } from '../requests';
// import Login from './login.js'
// import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
// import NavBar from './nav.js'

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      dashboardOrders: 'OPEN_ORDERS',
      isLoggedIn: false
    }
  }

  //------- BUTTON THAT TAKES YOU TO 'NEW ORDER' FORM
  createNewOrder = () => {
    this.props.history.push('/orderform')
    var currentMerchant = createNewOrder("-L63lbV5gsOoVOHV6dcb",'stOzHE8aelahFyvNxhbP9v1sY7G2')
    
    .then(x => console.log('this is current mertchant in then', x))
    
    console.log("this is current merchant from back", currentMerchant)
    // this.props.history.push('/orderform', {userId: this.props.location.state})
  }

  //------- FUNCTION THAT RENDER THE 3 DIFFERENT ORDER STATUS LISTS
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
    return (
      <div>
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
    return (<div>
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
    this.setState({ dashboardOrders: 'COMPLETED_ORDERS' })
  }

  componentWillMount() {
    console.log('user id:', this.props.location.state)
  //   console.log('props state log: ', this.props.location.state)
  }

  render() {
    if (this.props.location.state === undefined){
      return <Redirect to='/'></Redirect>
    }
    return (
      <div className='inital-css'>
      {/* <NavBar/> */}
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
              : null}
        </div>

        <button onClick={this.createNewOrder}>NEW ORDER</button>
      </div>
    )
  }
}


export default Dashboard
