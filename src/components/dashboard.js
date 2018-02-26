import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { createNewOrder, getOpenOrders, getClosedOrders, getPastDueOrders, getPricingInfo } from '../requests';
// import Login from './login.js'
// import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'

// import NavBar from './nav.js'

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      dashboardOrders: 'OPEN_ORDERS',
      isLoggedIn: false,
      openOrders: [],
      pastDueOrders: [],
      completedOrders: []
    }
  }


  componentDidMount() {
  
    
   
    this.setState({merchantId : this.props.location.state.merchantId})
        var merchantObj = { merchantId: this.props.location.state.merchantId }
  

    getOpenOrders(merchantObj)
      .then(x => { this.setState({ openOrders: x.openOrders }); })

    getClosedOrders(merchantObj)
      .then(x => { this.setState({ completedOrders: x.closedOrders }); })

    getPastDueOrders(merchantObj)
      .then(x => { this.setState({ pastDueOrders: x.pastDueOrders }); })

   

    // if (this.props.location.state.merchantId == undefined) { return <Redirect to='/login' /> }
    //   console.log('props state log: ', this.props.location.state)
  }

  // componentWillMount (){
  //   console.log('this is state.merchantid', this.state.merchantId)
  //   getPricingInfo (this.state.merchantId)
  //   .then (x => {console.log('this is hte x response to prices', x)
  //      {this.setState({prices: x.prices})
  //     } })  

  // }
   
  

  //------- BUTTON THAT TAKES YOU TO 'NEW ORDER' FORM


  createNewOrder = () => {
    
    console.log('this is the state when you go to start a new order', this.state)
    this.props.history.push('/orderform', 

      { merchantId :this.state.merchantId , 
            currentPage: 'EnterClientPhone',
            prices: this.state.prices
        })
  
    }

  //------- FUNCTION THAT RENDER THE 3 DIFFERENT ORDER STATUS LISTS
  openOrders = () => {
    const { openOrders } = this.state;

    return openOrders.map((item, idx) => {
      return (
        <div key={idx}>
          <div className='order-listing'>
            <div className='flex'>
              <div>#{item.orderNum}</div>
              <p>5</p>
              <p>02/13/18 12PM</p>
              <p>$12.00</p>
            </div>
          </div>
        </div>
      )
    })
  }

  pastDueOrders = () => {
    const { pastDueOrders } = this.state;

    return pastDueOrders.map((item, idx) => {
      return (
        <div key={idx}>
          <div className='order-listing'>
            <div className='flex'>
              <p>#{item.orderNum}</p>
              <p>2</p>
              <p>01/13/18 12:00PM</p>
              <p>$8.00</p>
            </div>
          </div>
        </div>
      )
    })
  }

  completedOrders = () => {
    const { completedOrders } = this.state;

    return completedOrders.map((item, idx) => {
      return (
        <div key={idx}>
          <div className='order-listing'>
            <div className='flex'>
              <p>#{item.orderNum}</p>
              <p>4</p>
              <p>02/08/18 1:00PM</p>
              <p>$16.00</p>
            </div>
          </div>
        </div>
      )
    })
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


   render() {
    // if (this.props.location.state.merchantId === undefined) { return <Redirect to='/login' /> }
    // if (this.props.location.state.merchantId == undefined){
    //   return <Redirect to='/login'></Redirect>
    // }
    return (
      <div className='inital-css' >

        <div className='app-nav'>
          <h3>Dashboard</h3>
        </div>
        <input type='text' placeholder='Search' />
        <button>Submit</button>

        <div>
          <button onClick={this.showOpen}>Open</button>
          <button onClick={this.showPastDue}>Past Due</button>
          <button onClick={this.showCompleted}>Completed</button>
        </div>

        <div className='flex'>
          <p>Order</p>
          <p>Items</p>
          <p>Ready</p>
          <p>Total</p>
        </div>

        <div>{
          this.state.dashboardOrders === 'OPEN_ORDERS' ? this.openOrders()
            : this.state.dashboardOrders === 'PAST_DUE' ? this.pastDueOrders()
              : this.state.dashboardOrders === 'COMPLETED_ORDERS' ? this.completedOrders()
                : null}
        </div>
        <button id='newOrderButton' onClick={this.createNewOrder}>New Order</button>
      </div>
    )
  }
}


export default Dashboard
