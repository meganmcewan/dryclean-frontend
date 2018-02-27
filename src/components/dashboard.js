import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { createNewOrder, getOpenOrders, getClosedOrders, getPastDueOrders, getMerchantPrices, signout, checkLogin, markPickedUp, getMerchantAddress } from '../requests';
// import Login from './login.js'
// import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'

// import NavBar from './nav.js'
import ViewOrder from './vieworder.js'

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      dashboardOrders: 'OPEN_ORDERS',
      merchantId: undefined,
      isLoggedIn: false,
      openOrders: [],
      pastDueOrders: [],
      completedOrders: []
    }
  }

  logout = () => {
    signout()
    this.props.history.push('/')
  }
  // componentWillMount() {
  //   var uidFromBack = checkLogin()
  //   console.log("2", uidFromBack)
  //   if (uidFromBack.user === null) {
  //     this.props.history.push('/login')

  //   }
  // this.setState({merchantId : this.props.location.state.merchantId, isLoggedIn: true})
  //     var merchantObj = { merchantId: this.props.location.state.merchantId }
  // console.log('merchant obj', merchantObj)

  // else {
  //   // }
  // }
  componentDidMount() {

    var uidFromBack = checkLogin()

      // var orderObject = checkOrder()

    this.setState({merchantId : uidFromBack.user.uid})
          var merchantObj = { merchantId: uidFromBack.user.uid }

    getOpenOrders(merchantObj)
        .then(x => { this.setState({ openOrders: x.openOrders, pastDueOrders: x.pastDueOrders }); })

   
    getClosedOrders(merchantObj)
      .then(x => { this.setState({ completedOrders: x.closedOrders }); })

    getMerchantPrices(merchantObj)
      .then(x => {
        this.setState({ merchantPrices: x.prices })
      })
    
    getMerchantAddress(merchantObj)
      .then(x => {
        this.setState({ merchantAddress: x.merchantAddress })
      })

    // if (this.props.location.state.merchantId == undefined) { return <Redirect to='/login' /> }
    //   console.log('props state log: ', this.props.location.state)
  }
  moveToClosed = (item) => {

    var updatedOpenOrders = this.state.openOrders.filter(order => {
      return order.orderId !== item.orderDetails.orderId
    })
    var updatedPastDueOrders = this.state.pastDueOrders.filter(order => {
      return order.orderId !== item.orderDetails.orderId
    })
    this.setState({ openOrders: updatedOpenOrders, closedOrders: updatedPastDueOrders, closedOrder: this.state.completedOrders.push(item) })

  }


  pickedUp = (item) => {
    var itemClosed = markPickedUp(item)
      .then(closedOrder => {
        this.moveToClosed(closedOrder)
      }
      )
  }


  //------- BUTTON THAT TAKES YOU TO 'NEW ORDER' FORM
  createNewOrder = () => {
    // console.log('this is merchant id state in create new order button', this.state.merchantId)

    console.log('this is merchant id state in create new order button', this.state.merchantId)
    console.log('this is merchant pricescreate new order button', this.state.merchantPrices)
    console.log("this is merchant address in new order button,", this.state.merchantAddress)
    this.props.history.push('/clientorder', { merchantId: this.state.merchantId, 
                                              merchantPrices: this.state.merchantPrices,
                                              merchantAddress: this.state.merchantAddress})

      // var currentMerchant = createNewOrder("-L63lbV5gsOoVOHV6dcb", this.state.merchantId)
      // .then(x => console.log('this is current mertchant in then', x))  

      }

    viewOrder = (item) => {
      console.log(item)
      console.log('this is item.orderID in dashboard', item.orderId)
      this.props.history.push('/vieworder/' + this.state.merchantId + '/' + item.orderId + '/')
    }

//------- FUNCTION THAT RENDER THE 3 DIFFERENT ORDER STATUS LISTS
    openOrders = () => {
    const { openOrders } = this.state;

    return openOrders.map((item, idx) => {

      //------- CALULATES THE TOTAL AMOUNT OF ITEMS IN THE ORDER
      let totalItems = [item.shirt, item.tie, item.blouse, item.jacket, item.skirt, item.dress, item.ladiesSuit, item.overcoat, item.suit, item.trousers]
      let filteredItems = totalItems.filter(function (x) { return x })
      let sumItems = filteredItems.reduce(function (a, b) { return a + b })

      return (
        <div key={idx}>
          <div onClick={() => this.viewOrder(item)} className='order-listing'>
            <div className='dash-order-header'>
              <div className='dash-order-number'>#{item.orderNumber}</div>
              <div className='dash-order-status'>Cleaning</div>
            </div>
            <div>
              <h2>{item.clientObj.clientFullName}</h2>
              <p><span id='highlight'>{sumItems} items</span> on <span id='highlight'>{item.date}</span></p>
            </div>

            <div className='flex-between'>
              <p>Total ${item.totalPrice.toFixed(2)}</p>
              <div>
                <button onClick={() => this.viewOrder(item)}>View Order</button>
                <button onClick={() => this.pickedUp(item)}>Mark Done</button>
              </div>
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
              <p>4</p>
              <p>02/08/18 1:00PM</p>
              <p>$16.00</p>
            </div>
          </div>
        </div>
      )
    })
  }

  completedOrders = () => {
    const { completedOrders } = this.state;

    return completedOrders.map((item, idx) => {

      let totalItems = [item.shirt, item.tie, item.blouse, item.jacket, item.skirt, item.dress, item.ladiesSuit, item.overcoat, item.suit, item.trousers]
      let filteredItems = totalItems.filter(function (x) { return x })
      let sumItems = filteredItems.reduce(function (a, b) { return a + b })

      return (
        <div key={idx}>
          <div onClick={() => this.viewOrder(item)} className='order-listing'>
            <div className='flex'>
            <div className='dash-order-number'>#{item.orderNumber}</div>
            <p><span id='highlight'>{sumItems} items</span></p>
              <p><span id='highlight'>{item.date}</span></p>
              <p>${item.totalPrice.toFixed(2)}</p>
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
          {/* <i onClick={this.logout} class="fas fa-power-off"></i> */}
          <button onClick={this.logout}>logout</button>
        </div>
        <div className='dashboard-wrapper'>
          <form>
            <input className='search-bar' type='text' placeholder='Search' />
          </form>

          <div className='tab-btns-wrapper'>
            <button className='tab-btns' onClick={this.showOpen}>Open</button>
            <button className='tab-btns' onClick={this.showPastDue}>Past Due</button>
            <button className='tab-btns' onClick={this.showCompleted}>Completed</button>
          </div>

        <div>{
          this.state.dashboardOrders === 'OPEN_ORDERS' ? this.openOrders()
            : this.state.dashboardOrders === 'PAST_DUE' ? this.pastDueOrders()
              : this.state.dashboardOrders === 'COMPLETED_ORDERS' ? this.completedOrders()
                : null}
        </div>
        <button id='newOrderButton' onClick={this.createNewOrder}>New Order</button>
      </div>
      </div>
    )
  }
}

export default Dashboard
