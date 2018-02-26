import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { createNewOrder, checkPhoneNum, addUserDetails } from '../requests';

class orderForm extends Component {
  constructor() {
    super()
    this.state = {
    
      currentPage: '',
      isPickup: true,
      isDelivery: false,
      clientName: '',
      clientAddress: '',
      clientCity: '', 
      clientProvinceState: '',
      clientPostalZip: '',
      trousers: null,
      suit: null,
      overcoat: null,
      ladySuit: null,
      dress: null,
      skirt: null,
      jacket: null,
      ties: null,
      blouse: null,
      shirt: null,
      tie: null,
      custom1: null,
      custom2: null,
      phoneNumber: '',
      totalPrice: null,
      prices: {
        trousers: 3.50,
        suit: 12.99,
        overcoat: 15.99,
        ladySuit: 12.99,
        dress: 18.99,
        skirt: 5.99,
        jacket: 21.99,
        ties: 4.00,
        blouse: 3.00,
        shirt: 3.00,
        tie: 4.99,
        custom1: null,
        custom2: null,

      }
    }
  }

  goToPhonePage = (event) => {
    
    event.preventDefault()
    console.log(this.state.phoneNumber)
    this.setState({ currentPage: '' })

  }


  orderDate = () => {
    return (
      <div>
        <div>current date</div>
        <div>current time</div>
      </div>
    )
  }

  enterClientPhonePage = () => {
   
    return (
      <div className='inital-css'>
        <div>
          <h1>Order Form</h1>
        </div>
        <div>
          <h3>{this.state.orderNumber}</h3>
          {/* <div>{this.businessAddress()}</div> */}
          <br />
          <div>{this.orderDate()}</div>
        </div>
        <br />
        <form onSubmit={this.goToClientInfoPage}>
          <label for="telNo">Enter a telephone number:</label>
          <input name="phoneNumber"
            ref={r => this.phoneNumber = r}
            type="text"
            // value={this.state.phoneNumber} 
            // onChange={this.handleInputChange}
            placeholder="(111)-222-3333"
            required pattern="[0-9]{3}[0-9]{3}[0-9]{4}" />
          <button type="submit" placeholder="submit">Next</button>
        </form>
      </div >
    )
  }

  goToClientInfoPage = (event) => {

    
    event.preventDefault()
  
    var phoneNum = this.phoneNumber.value
  
    checkPhoneNum(this.phoneNumber.value, this.props.location.state.merchantId)

      .then(response => {
    
        if (response.status === 0) {
          this.setState({
            currentPage: 'enterClientInfoPage',
            userId: response.userId,
            phoneNumber: phoneNum,
            clientName: response.clientName,
            clientAddress: response.clientAddress,
            clientCity: response.clientCity,
            clientProvinceState: response.clientProvinceState,
            clientPostalZip: response.clientPostalZip,
          })
          
          console.log('merchant respnose', response )
        }
        else {
          this.setState(st => ({
            currentPage: 'enterClientInfoPage',
            userId: response.userId,
            phoneNumber: phoneNum,       

          }))
          console.log('merchant respnose', response )
        }
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  enterClientInfoPage = () => {
    return (
      <div className='inital-css'>
        <div>
          <h1>Order Form</h1>
        </div>
        <div>
          <h3>Client Information</h3>
        </div>
        <form onSubmit={this.goToOrderDetailsPage}>
      
          <div>
            <input
              ref={r => this.clientName = r}
              name="clientName"
              value={this.state.clientName}
              // onChange={this.handleInputChange}
              type="text"
              placeholder="Client Name" />
          </div>
          <div>
            <input
              ref={r => this.clientAddress = r}
              name="clientAddress"
              value={this.state.clientAddress}
              // onChange={this.handleInputChange}
              type="text" placeholder="Client Address (optional)" />
          </div>
          <div>
            <input
              ref={r => this.clientCity = r}
              name="clientCity"
              value={this.state.clientCity}
              // onChange={this.handleInputChange}
              type="text" placeholder="City (optional)" />
          </div>
          <div>
            <input
              ref={r => this.clientProvinceState = r}
              name="clientProvinceState"
              value={this.state.clientProvinceState}
              // onChange={this.handleInputChange}
              type="text" placeholder="Province/State (optional)" />
          </div>
          <div>
            <input
              ref={r => this.clientPostalZip = r}
              name="clientPostalZip"
              value={this.state.clientPostalZip}
              // onChange={this.handleInputChange}
              type="text" placeholder="Postal Code/Zip (optional)" />
          </div>
          <div>
            <button onClick={this.goToPhonePage}>Edit/Back</button> 
            <button type="submit">Next</button>
          </div>
        </form>
      </div>
    )
  }

  goToOrderDetailsPage = (event) => {
    event.preventDefault()
    console.log('going to page 2')


    this.setState({
      clientPostalZip: this.clientPostalZip.value,
      clientProvinceState: this.clientProvinceState.value,
      clientCity: this.clientCity.value,
      clientAddress: this.clientAddress.value,
      clientName: this.clientName.value,
      userId: this.state.userId,
      // phoneNumber: this.phoneNumber.value,
      // isPickup :this.ispickup.value,
      // isDelivery : this.isdelivery.value


    }
    )


    // addUserDetails (tempUserObj, tempMerchantId)

  
    this.setState(st => ({
      currentPage: 'enterOrderDetailsPage',

    }))

  }

  updatePrice = (inp, productName) => {
    var inc = inp * this.state.prices[productName]
    console.log(inc)
    this.setState(PreSt => ({ totalPrice: inc + PreSt.totalPrice }))
  }

  updateOrderDetails = (productName) => {
    this.setState(PreSt => {
      let newProductQty = PreSt[productName] + 1;
      this.updatePrice(1, productName);
      let newState = {};
      newState[productName] = newProductQty
      return newState;
      console.log('this is new state in update order details, ' ,newState)
    })
  }

  totalPrice = () => {
    let ret = Math.floor(this.state.totalPrice * 100) / 100
    console.log(ret)
    return (ret)
  }
  enterOrderDetailsPage = () => {
    return (
      <div className='inital-css'>
        <div>
          <h1>Order Form</h1>
        </div>
        <div>
          <h3>Order Details - Tap to add</h3>
        </div>
        <form >
          <div>
            <div>
              <button type="button" onClick={() => this.updateOrderDetails('trousers')}>Trousers {this.state.trousers} </button>
              <button type="button" onClick={() => this.updateOrderDetails('suit')}>Suit {this.state.suit} </button>
            </div>
            <div>
              <button type="button" onClick={() => this.updateOrderDetails('overcoat')}>Overcoat {this.state.overcoat} </button>
              <button type="button" onClick={() => this.updateOrderDetails('ladySuit')}>Ladies Suit {this.state.ladySuit} </button>
            </div>
            <div>
              <button type="button" onClick={() => this.updateOrderDetails('dress')}>Dress {this.state.dress} </button>
              <button type="button" onClick={() => this.updateOrderDetails('skirt')}>Skirt {this.state.skirt} </button>
            </div>
            <div>
              <button type="button" onClick={() => this.updateOrderDetails('jacket')}>Jacket {this.state.jacket} </button>
              <button type="button" onClick={() => this.updateOrderDetails('blouse')}>Blouse {this.state.blouse} </button>
            </div>
            <div>
              <button type="button" onClick={() => this.updateOrderDetails('shirt')}>Shirt {this.state.shirt} </button>
              <button type="button" onClick={() => this.updateOrderDetails('tie')}>Tie {this.state.tie} </button>
            </div>
            {/* <div>
              <button type="button" onClick={() => this.updateOrderDetails('custom1')}>Custom Item {this.state.custom1} </button>
              <button type="button" onClick={() => this.updateOrderDetails('custom2')}>Custom Item {this.state.custom2} </button>
            </div> */}
          </div>
          <div>
            <div>This is the sub-total:</div>
            <div>${this.totalPrice()}</div>
          </div>
  
          <div>
            <button onClick={this.goToClientInfoPage}>Back/Edit</button>
            <button onClick={this.goToReview}>Review</button>
          </div>
        </form>
      </div>
    )
  }

  goToReview = (event) => {
  
    event.preventDefault()
    var UserObj = {
      clientPostalZip: this.state.clientPostalZip,
      clientProvinceState: this.state.clientProvinceState,
      clientCity: this.state.clientCity,
      clientAddress: this.state.clientAddress,
      clientName: this.state.clientName,
      userId: this.state.userId,
      phoneNumber: this.state.phoneNumber,
    }



  
    addUserDetails(UserObj, this.props.location.state.merchantId)

    this.setState(st => ({ currentPage: 'orderFormReview' }))

  }

  orderFormReview = () => {
    return (
      <div className='inital-css'>
        <div>
          <h1>Review Form</h1>
        </div>
        <div>
          <li>{}
            </li>
          
        </div>
        <form >
        
          <div>
            <button type="submit" onClick={this.confirmation}>Submit Form</button>
          </div>
        </form>
        <div>
        
          <button onClick={this.cancelOrder}>Cancel</button>
          
        </div>
      </div>
    )
  }

  cancelOrder = () => {
    alert('order cancelled')
    this.setState(st => ({ orderStatus: 'cancelled' }))
    this.dashboard()
  }

 
// sendSms = () => {
//   var number = '+15147120366';
//   var message = 'SEND NUDES'
//    fetch('/sendSms', {
//      method: "POST",
     
//      body: JSON.stringify({
//       test: number,
//       message: message
//      })
 
//    }).then()
//    }


  confirmation = (event) => {
    event.preventDefault()
  
    // this.sendSms()
   console.log('this is merchant id', this.state.merchantId)
    var currentMerchant = createNewOrder(this.state.userId, this.state.merchantId,)
    .then(response => {
        
        this.setState({newOrder: response.newOrder})
    })
    
  
    console.log('this state in confirmation change', this.state)
    this.props.history.push('/confirmation', 
     { merchantId :this.props.location.state.merchantId,
       orderNum: this.props.location.state.merchantId
     })

  }

  dashboard = () => {
    this.props.history.push('/dashboard')
  }

  render() {

    if (this.state.currentPage === '') return (this.enterClientPhonePage())
    if (this.state.currentPage === 'enterClientInfoPage') return (this.enterClientInfoPage())
    if (this.state.currentPage === 'enterOrderDetailsPage') return (this.enterOrderDetailsPage())
    if (this.state.currentPage === 'orderFormReview') return (this.orderFormReview())
  }
}

export default orderForm