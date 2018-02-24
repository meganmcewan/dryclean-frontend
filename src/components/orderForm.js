import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { createNewOrder, checkPhoneNum, addUserDetails } from '../requests';

class orderForm extends Component {
  constructor() {
    super()
    this.state = {
      orderNumber: 12345,
      uniqueOrderNo: '',
      businessName: 'Dry cleaner & Tailor St-Viateur',
      businessAddress: '150 Rue Saint Viateur O',
      businessAddress2: 'Montréal, QC H2T 2L3',
      businessPhoneNumber: '(514) 276-3106',
      currentDate: 'Jan, 01, 2018',
      currentTime: '10:00am',
      regServPickup: '1pm, Jan 04, 2018',
      expServPickup: '1pm, Jan 03, 2018',
      orderStatus: 'open',
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
      isPickup: true,
      isDelivery: false,
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

  goToOrderHome = (event) => {
    ``
    event.preventDefault()
    console.log(this.state.phoneNumber)
    this.setState({ currentPage: '' })

  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  pickupClicked = () => {
    this.setState({ isDelivery: false, isPickup: true })
  }

  deliveryClicked = () => {
    this.setState({ isDelivery: true, isPickup: false })
    alert('confirm the delivery address with the client: ')
  }

  businessAddress = () => {
    return (
      <div>
        <div>{this.state.businessName}</div>
        <div>{this.state.businessAddress}</div>
        <div>{this.state.businessAddress2}</div>
        <div>{this.state.businessPhoneNumber}</div>
      </div>
    )
  }

  orderDate = () => {
    return (
      <div>
        <div>{this.state.currentDate}</div>
        <div>{this.state.currentTime}</div>
      </div>
    )
  }

  orderFormHome = () => {
    return (
      <div className='inital-css'>
        <div>
          <h1>Order Form</h1>
        </div>
        <div>
          <h3>{this.state.orderNumber}</h3>
          <div>{this.businessAddress()}</div>
          <br />
          <div>{this.orderDate()}</div>
        </div>
        <br />
        <form onSubmit={this.goToOrderPageOne}>
          <label for="telNo">Enter a telephone number:</label>
          <input name="phoneNumber"
            ref={r => this.phoneNumber = r}
            type="text"
            // value={this.state.phoneNumber} 
            onChange={this.handleInputChange}
            placeholder="(111)-222-3333"
            required pattern="[0-9]{3}[0-9]{3}[0-9]{4}" />
          <button type="submit" placeholder="submit">Next</button>
        </form>
      </div >
    )
  }

  goToOrderPageOne = (event) => {
    event.preventDefault()
    this.setState({ currentPage: 'orderFormPageOne' })
    // goToOrderPageOne = () => {
    console.log('going to page 1')

    /// here you will pass the phoneNumber from the inputs and Merchant ID from state to this function so that it runs
    var phoneNum = this.phoneNumber.value

    checkPhoneNum(this.phoneNumber.value, this.props.location.state.merchantId.merchantId)

      .then(response => {
        console.log('respose', response)
        ///this conditional will need to change to 1, is set to zero temporarily to pass the page
        if (response.status === 0) {
          this.setState(st => ({
            currentPage: 'orderFormPageOne',
            userId: response.userId,
            phoneNumber: phoneNum
          }))
          console.log("user id", this.state.userId)
        }
        else {
          this.setState(st => ({
            currentPage: 'orderFormPageOne',
            userId: response.userId,
            phoneNumber: phoneNum

          }))
          console.log("user id", this.state.userId)
        }
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  orderFormOne = () => {
    return (
      <div className='inital-css'>
        <div>
          <h1>Order Form</h1>
        </div>
        <div>
          <h3>Client Information</h3>
        </div>
        <form onSubmit={this.goToOrderPageTwo}>
          <div>
            <input
              type="radio"
              id="pickup"
              name="deliveryMethod"
              onClick={this.pickupClicked} />
            <label for="pickup">Pickup</label>
            <input
              type="radio"
              id="delivery"
              name="deliveryMethod"
              onClick={this.deliveryClicked} />
            <label for="delivery">Delivery</label>
          </div>
          <div>
            <input
              ref={r => this.clientName = r}
              name="clientName"
              value={this.state.clientName}
              onChange={this.handleInputChange}
              type="text"
              placeholder="Client Name" />
          </div>
          <div>
            <input
              ref={r => this.clientAddress = r}
              name="clientAddress"
              value={this.state.clientAddress}
              onChange={this.handleInputChange}
              type="text" placeholder="Client Address (optional)" />
          </div>
          <div>
            <input
              ref={r => this.clientCity = r}
              name="clientCity"
              value={this.state.clientCity}
              onChange={this.handleInputChange}
              type="text" placeholder="City (optional)" />
          </div>
          <div>
            <input
              ref={r => this.clientProvinceState = r}
              name="clientProvinceState"
              value={this.state.clientProvinceState}
              onChange={this.handleInputChange}
              type="text" placeholder="Province/State (optional)" />
          </div>
          <div>
            <input
              ref={r => this.clientPostalZip = r}
              name="clientPostalZip"
              value={this.state.clientPostalZip}
              onChange={this.handleInputChange}
              type="text" placeholder="Postal Code/Zip (optional)" />
          </div>
          {/* Here it would be really great to display the status of any outstanding orders that are past due
          OR/ALSO the last time the client came to the shop */}
          <div>
            <button onClick={this.goToOrderHome}>Edit/Back</button>
            <button type="submit">Next</button>
          </div>
        </form>
      </div>
    )
  }

  goToOrderPageTwo = (event) => {
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



    this.setState(st => ({ currentPage: 'orderFormPageTwo' }))
    this.setState(st => ({
      currentPage: 'orderFormPageTwo',

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
    })
  }

  totalPrice = () => {
    let ret = Math.floor(this.state.totalPrice * 100) / 100
    console.log(ret)
    return (ret)
  }
  orderFormTwo = () => {
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
            <div>
              <button type="button" onClick={() => this.updateOrderDetails('custom1')}>Custom Item {this.state.custom1} </button>
              <button type="button" onClick={() => this.updateOrderDetails('custom2')}>Custom Item {this.state.custom2} </button>
            </div>
          </div>
          <div>
            <div>This is the sub-total:</div>
            <div>${this.totalPrice()}</div>
          </div>
          <div>
            <input ref={inp => this.isRegService = inp} type="radio" id="RegService" name="serviceType" value="text" />
            <label for="pickup">Regular Service</label>
            <input ref={inp => this.isExpressService = inp} type="radio" id="ExpressService" name="serviceType" value="text" />
            <label for="delivery">Express Service</label>
            <input ref={inp => this.isCustomService = inp} type="radio" id="isCustomService" name="serviceType" value="text" />
            <label for="delivery">Custom Service</label>
          </div>
          <div>
            <div>{this.state.regServPickup}</div>
            <div>{this.state.expServPickup}</div>
            <div>Custom Date!?</div>
          </div>
          <div>
            <button onClick={this.goToOrderPageOne}>Back/Edit</button>
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



    console.log(this.props.location.state.merchantId)
    console.log(UserObj)
    addUserDetails(UserObj, this.props.location.state.merchantId)


    console.log(this.state)
    console.log('going to Review')
    this.setState(st => ({ currentPage: 'orderFormReview' }))

  }

  orderFormReview = () => {
    return (
      <div className='inital-css'>
        <div>
          <h1>Review Form</h1>
        </div>
        <div>
          <h3>{this.state.value}</h3>
        </div>
        <form >
          <div>
            <input ref={inp => this.isPaid = inp} type="radio" id="Paid" name="Payment" value="Paid" />
            <label for="pickup">Pay Now</label>
            <input ref={inp => this.isPickupPay = inp} type="radio" id="pickupPay" name="Payment" value="pickupPay" />
            <label for="pickupPay">Pay on Pick-up</label>
          </div>
          <div>
            <button type="submit" onClick={this.confirmation}>Submit Form</button>
          </div>
        </form>
        <div>
          <button onClick={this.goToOrderPageTwo}>Edit/Back</button>
          <button onClick={this.cancelOrder}>Cancel</button>
          <button onClick={this.suspendOrder}>Suspend Order</button>
        </div>
      </div>
    )
  }

  cancelOrder = () => {
    alert('order cancelled')
    this.setState(st => ({ orderStatus: 'cancelled' }))
    this.dashboard()
  }

  suspendOrder = () => {
    alert('order suspended')
    this.setState(st => ({ orderStatus: 'suspended' }))
    this.dashboard()
  }

  confirmation = (event) => {
    event.preventDefault()
    this.props.history.push('/confirmation')
   
    var currentMerchant = createNewOrder(this.state.userId,"ZJMpfNdnzAd4LCwJyVclUI9BuK82")
    .then(x => console.log('this is current mertchant in then', x))

    console.log("this is current merchant from back", currentMerchant)
    this.props.history.push('/orderform', { userId: this.props.location.state })
  }

  dashboard = () => {
    this.props.history.push('/dashboard')
  }

  render() {

    if (this.state.currentPage === '') return (this.orderFormHome())
    if (this.state.currentPage === 'orderFormPageOne') return (this.orderFormOne())
    if (this.state.currentPage === 'orderFormPageTwo') return (this.orderFormTwo())
    if (this.state.currentPage === 'orderFormReview') return (this.orderFormReview())
  }
}

export default orderForm
