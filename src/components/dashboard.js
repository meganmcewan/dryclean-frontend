import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { createNewOrder, getOpenOrders, getClosedOrders, getPastDueOrders, getMerchantPrices, signout, checkLogin, markPickedUp, getMerchantAddress, getSearchResults } from '../requests';
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
      completedOrders: [],
      searchResults: []
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

    this.setState({ merchantId: uidFromBack.user.uid })
    var merchantObj = { merchantId: uidFromBack.user.uid }

    console.log("this is merchant object 1", merchantObj)
    console.log(this.state)

    getOpenOrders(merchantObj)
      .then(x => { this.setState({ openOrders: x.openOrders, pastDueOrders: x.pastDueOrders }); })


    getClosedOrders(merchantObj)
      .then(x => { this.setState({ completedOrders: x.closedOrders }); })

    getMerchantPrices(merchantObj)
      .then(x => {
        console.log(x)
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
    
    var merchantObj = { merchantId: this.state.merchantId }
    
    getOpenOrders(merchantObj)
    .then(x => { this.setState({ openOrders: x.openOrders, pastDueOrders: x.pastDueOrders }); })


    getClosedOrders(merchantObj)
    .then(x => { this.setState({ completedOrders: x.closedOrders }); })


  }


  pickedUp = (item, event) => {

    console.log('in pickedUp', event)
    event.stopPropagation();
    var itemClosed = markPickedUp(item)
      .then(closedOrder => {
        this.moveToClosed(closedOrder)
      }
      )
  }


  //------- BUTTON THAT TAKES YOU TO 'NEW ORDER' FORM
  createNewOrder = () => {

    this.props.history.push('/clientorder', {
      merchantId: this.state.merchantId,
      merchantPrices: this.state.merchantPrices,
      merchantAddress: this.state.merchantAddress
    })


  }

  viewOrder = (item, event) => {
    console.log('in viewOrder', event)
    console.log(item)
    this.props.history.push('/vieworder/' + this.state.merchantId + '/' + item.orderId + '/',
      { merchantAddress: this.state.merchantAddress })
  }

  //------- FUNCTION THAT RENDER THE 3 DIFFERENT ORDER STATUS LISTS
  openOrders = () => {
    const { openOrders } = this.state;

    //
    if (this.state.dashboardOrders === 'OPEN_ORDERS' && this.state.openOrders.length < 1){
      return (
        <div>
     <div className='no-orders order-listing'>
      <div>Welcome to your <mark>clnr</mark> dashboard. </div>
      <div>Looks like there's nothing to clean.</div>
      </div>
        <img id='dash-logo' src='https://i.imgur.com/o7rNnfK.png'/>
      </div>
      )
    }


    return openOrders.map((item, idx) => {

      //------- CALULATES THE TOTAL AMOUNT OF ITEMS IN THE ORDER
      let totalItems = [item.shirt, item.tie, item.blouse, item.jacket, item.skirt, item.dress, item.ladiesSuit, item.overcoat, item.suit, item.trousers]
      let filteredItems = totalItems.filter(function (x) { return x })
      let sumItems = filteredItems.reduce(function (a, b) { return a + b })

      return (
        <div key={idx}>
          <div onClick={(event) => this.viewOrder(item, event)} className='order-listing'>
            <div className='dash-order-header'>
              <div className='dash-order-number'>#{item.orderNumber}</div>
              {item.inProgress === true ? <div className='dash-order-status'>Cleaning</div> : <div id='order-ready' className='dash-order-status'>Ready</div>}
            </div>
            <div>
              <h2>{item.clientObj.clientFullName}</h2>
              <p><span id='highlight'>{sumItems} Items</span> on <span id='highlight'>{item.date}</span></p>
            </div>

            <div className='flex-between'>
              <p>Total <span id='highlight'>${item.totalPrice.toFixed(2)}</span></p>
              <div>
                <button onClick={(event) => this.pickedUp(item, event)}>Mark Done</button>
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

      let totalItems = [item.shirt, item.tie, item.blouse, item.jacket, item.skirt, item.dress, item.ladiesSuit, item.overcoat, item.suit, item.trousers]
      let filteredItems = totalItems.filter(function (x) { return x })
      let sumItems = filteredItems.reduce(function (a, b) { return a + b })

      return (
        <div key={idx}>
          <div onClick={(event) => this.viewOrder(item, event)} className='order-listing'>
            <div className='dash-order-header'>
              <div className='dash-order-number'>#{item.orderNumber}</div>
              <div id='past-due' className='dash-order-status'>Past Due</div>
            </div>
            <div>
              <h2>{item.clientObj.clientFullName}</h2>
              <p><span id='highlight'>{sumItems} Items</span> on <span id='highlight'>{item.date}</span></p>
            </div>
            <div className='flex-between'>
              <p>Total <span id='highlight'>${item.totalPrice.toFixed(2)}</span></p>
              <div>
                <button onClick={(event) => this.pickedUp(item, event)}>Mark Done</button>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }


  completedOrders = () => {
    console.log('this is the state in ompleted orders', this.state)
    const { completedOrders } = this.state;

    return completedOrders.map((item, idx) => {

      let totalItems = [item.shirt, item.tie, item.blouse, item.jacket, item.skirt, item.dress, item.ladiesSuit, item.overcoat, item.suit, item.trousers]
      let filteredItems = totalItems.filter(function (x) { return x })
      console.log(filteredItems)
      let sumItems = filteredItems.reduce(function (a, b) { return a + b })

      return (
        <div key={idx}>
          <div onClick={() => this.viewOrder(item)} className='order-listing'>
            <div className='flex'>
              <div className='dash-order-number'>#{item.orderNumber}</div>
              <p><span id='highlight'>{sumItems} Items</span></p>
              <p><span id='highlight'>{item.date}</span></p>
              <p>${item.totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )
    })
  }

  showSearchResults =() =>{
    const { searchResults } = this.state;

    //
    if (this.state.dashboardOrders === 'SEARCH_RESULTS' && this.state.searchResults.length < 1){
      return (
        <div>
     <div className='no-orders order-listing'>
      <div>Looks like there are no matches to your search request</div>
      </div>
        <img id='dash-logo' src='https://i.imgur.com/o7rNnfK.png'/>
      </div>
      )
    }


    return searchResults.map((item, idx) => {

      //------- CALULATES THE TOTAL AMOUNT OF ITEMS IN THE ORDER
      let totalItems = [item.shirt, item.tie, item.blouse, item.jacket, item.skirt, item.dress, item.ladiesSuit, item.overcoat, item.suit, item.trousers]
      let filteredItems = totalItems.filter(function (x) { return x })
      let sumItems = filteredItems.reduce(function (a, b) { return a + b })

      return (
        <div key={idx}>
          <div onClick={(event) => this.viewOrder(item, event)} className='order-listing'>
            <div className='dash-order-header'>
              <div className='dash-order-number'>#{item.orderNumber}</div>
              {item.inProgress === true ? <div className='dash-order-status'>Cleaning</div> : <div id='order-ready' className='dash-order-status'>Ready</div>}
            </div>
            <div>
              <h2>{item.clientObj.clientFullName}</h2>
              <p><span id='highlight'>{sumItems} Items</span> on <span id='highlight'>{item.date}</span></p>
            </div>

            <div className='flex-between'>
              <p>Total <span id='highlight'>${item.totalPrice.toFixed(2)}</span></p>
              <div>
                <button onClick={(event) => this.pickedUp(item, event)}>Mark Done</button>
              </div>
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

  runSearch =() =>{

    getSearchResults(this.state.merchantId, this.searchInput.value)
      .then(x => {
        this.setState({ searchResults: x.searchResults, dashboardOrders: 'SEARCH_RESULTS' })
      })
    this.searchInput.value=''
  }

  


  render() {
    // if (this.props.location.state.merchantId === undefined) { return <Redirect to='/login' /> }
    // if (this.props.location.state.merchantId == undefined){
    //   return <Redirect to='/login'></Redirect>
    // }

    return (
      <div className='inital-css' >

        <div className='app-nav'>
          <img className='logo-icon' src='https://i.imgur.com/mJDVmQH.png' />
          <h3>Dashboard</h3>
          <div className='logout' onClick={this.logout}>Logout</div>
        </div>
        <div className='dashboard-wrapper'>
         
            <input className='search-bar' type='search' placeholder='Search'ref={srch => this.searchInput = srch} />
            <button onClick={this.runSearch}>Search</button>
        

          <div className='tab-btns-wrapper'>
            <button className={`tab-btns ${this.state.dashboardOrders === 'OPEN_ORDERS' ? 'tab-selected' : ''}`} onClick={this.showOpen}>Open</button>
            <button className={`tab-btns ${this.state.dashboardOrders === 'PAST_DUE' ? 'tab-selected' : ''}`} onClick={this.showPastDue}>Past Due</button>
            <button className={`tab-btns ${this.state.dashboardOrders === 'COMPLETED_ORDERS' ? 'tab-selected' : ''}`} onClick={this.showCompleted}>Completed</button>

            {/* className={`tab-btns ${this.state.dashboardOrders === 'OPEN_ORDERS ? 'tab-selected' : ''}`} */}

          </div>

          <div>{
            this.state.dashboardOrders === 'OPEN_ORDERS'  ? this.openOrders()
              : this.state.dashboardOrders === 'PAST_DUE'? this.pastDueOrders()
                : this.state.dashboardOrders === 'COMPLETED_ORDERS' ? this.completedOrders()
                  : this.state.dashboardOrders === 'SEARCH_RESULTS' ? this.showSearchResults():null}
          </div>

        </div>
        <div className='footer-btn-wrapper'>
          <button id='color-cta' className='large-footer-btn' onClick={this.createNewOrder}>Create New Order</button>
        </div>
      </div>
    )
  }
}

export default Dashboard
