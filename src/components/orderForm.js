import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { createNewOrder , checkPhoneNum, addUserDetails } from '../requests';

class orderForm extends Component {
  constructor () {
    super()
    this.state = {orderNumber: 12345, 
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
                  currentPage : '',
                  trousers : null,
                  suit : null,
                  overcoat : null,
                  ladySuit: null  ,
                  dress: null,
                  skirt: null,
                  jacket: null,
                  ties: null,
                  blouse: null,
                  shirt: null,
                  tie: null,
                  custom1 : null,
                  custom2 : null,
                  phoneNumber : '',
                  isPickup: true,
                  isDelivery: false,
                }
  }

  goToOrderHome = (event) => {
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

  businessAddress = () =>{
    return(
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
    return(
      <div className='inital-css'>
            <div>
              <h1>Order Form</h1>
            </div>
            <div>
              <h3>{this.state.orderNumber}</h3>
              <div>{this.businessAddress()}</div>
              <br/>
              <div>{this.orderDate()}</div>
            </div>
            <br/>
        <form onSubmit={this.goToOrderPageOne}>  
            <label for="telNo">Enter a telephone number:</label>
            <input  name="phoneNumber" 
                  type="text" 
                  value={this.state.phoneNumber} 
                  onChange={this.handleInputChange} 
                  placeholder="(111)-222-3333" 
                  required pattern="[0-9]{3}[0-9]{3}[0-9]{4}"/>
            <button type="submit" placeholder="submit">Next</button>
        </form>
      </div >
    )
  }

  goToOrderPageOne = (event) => {
    event.preventDefault()
    this.setState({ currentPage: 'orderFormPageOne'})   
  // goToOrderPageOne = () => {
    console.log('going to page 1')

    /// here you will pass the phoneNumber from the inputs and Merchant ID from state to this function so that it runs

    checkPhoneNum('5556669999', '64I1fz0WTxPmPxt1qRSGRpwsNg53')
    .then( response => {
      console.log('res', response)
      ///this conditional will need to change to 1, is set to zero temporarily to pass the page
      if(response.status===0){
        this.setState(st => ({ currentPage: 'orderFormPageOne' }))
      }
      else{
        //show some error message to user
        
      }
    })
    .catch( err =>{
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
              checked={this.state.isPickup}
              onChange={this.handleInputChange}/>
            <label for="pickup">Pickup</label>
            <input 
              type="radio"
              id="delivery"
              name="deliveryMethod"
              checked={this.state.isDelivery}
              onChange={this.handleInputChange} />
            <label for="delivery">Delivery</label>
          </div>
          <div>
            <input 
              name="clientName"
              value={this.state.clientName}
              onChange={this.handleInputChange} 
              type="text" 
              placeholder="Client Name"/>
          </div>
          <div>
            <input 
              name="clientAddress"
              value={this.state.clientAddress}
              onChange={this.handleInputChange} 
              type="text" placeholder="Client Address (optional)"/>
          </div>
          <div>
            <input 
              name="clientCity"
              value={this.state.clientCity}
              onChange={this.handleInputChange} 
              type="text" placeholder="City (optional)"/>
          </div>
          <div>
            <input 
              name="clientProvinceState"
              value={this.state.clientProvinceState}
              onChange={this.handleInputChange} 
              type="text" placeholder="Province/State (optional)"/>
          </div>
          <div>
            <input 
              name="clientPostalZip"
              value={this.state.clientPostalZip}
              onChange={this.handleInputChange}  
              type="text" placeholder="Postal Code/Zip (optional)"/>
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


    var tempMerchantId = { merchantId:'stOzHE8aelahFyvNxhbP9v1sY7G2' }
    var tempUserObj = {
      clientPostalZip: '12345',
      clientProvinceState:'qc',
      clientCity : 'montreal',
      clientAddress : '1234 street',
      clientName : 'bobly bob',
      userId: '-L63lbV5gsOoVOHV6dcb',
      phoneNumber: '5556669999'
      // isPickup :
      // isDelivery : 

    }
    addUserDetails (tempUserObj, tempMerchantId)


    
    this.setState(st => ({ currentPage: 'orderFormPageTwo' }))
    this.setState(st => ({ 
      currentPage: 'orderFormPageTwo', 
      // clientPostalZip: this.clientPostalZip.value, 
      // clientProvinceState: this.clientProvinceState.value, 
      // clientCity : this.clientCity.value,
      // clientAddress : this.clientAddress.value,
      // clientName : this.clientName.value,
      // isPickup : this.ispickup.value,
      // isDelivery : this.isdelivery.value
    }))
    
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
        <form onSubmit={this.goToReview}>
          <div>
            <div>
              <button type="button" onClick={() => this.setState(PreSt => ({trousers: PreSt.trousers + 1}))}>Trousers {this.state.trousers} </button>
              <button type="button" onClick={() => this.setState(PreSt => ({ suit: PreSt.suit + 1 }))}>Suit {this.state.suit} </button>
            </div> 
            <div>
              <button type="button" onClick={() => this.setState(PreSt => ({ overcoat: PreSt.overcoat + 1 }))}>Overcoat {this.state.overcoat} </button>
              <button type="button" onClick={() => this.setState(PreSt => ({ ladySuit: PreSt.ladySuit + 1 }))}>Ladies Suit {this.state.ladySuit} </button>
            </div> 
            <div>
              <button type="button" onClick={() => this.setState(PreSt => ({ dress: PreSt.dress + 1 }))}>Dress {this.state.dress} </button>
              <button type="button" onClick={() => this.setState(PreSt => ({ skirt: PreSt.skirt + 1 }))}>Skirt {this.state.skirt} </button>
            </div> 
            <div>
              <button type="button" onClick={() => this.setState(PreSt => ({ jacket: PreSt.jacket + 1 }))}>Jacket {this.state.jacket} </button>
              <button type="button" onClick={() => this.setState(PreSt => ({ blouse: PreSt.blouse + 1 }))}>Blouse {this.state.blouse} </button>
            </div> 
            <div>
              <button type="button" onClick={() => this.setState(PreSt => ({ shirt: PreSt.shirt + 1 }))}>Shirt {this.state.shirt} </button>
              <button type="button" onClick={() => this.setState(PreSt => ({ tie: PreSt.tie + 1 }))}>Tie {this.state.tie} </button>
            </div> 
            <div>
              <button type="button" onClick={() => this.setState(PreSt => ({ custom1: PreSt.custom1 + 1 }))}>Custom Item {this.state.custom1} </button>
              <button type="button" onClick={() => this.setState(PreSt => ({ custom2: PreSt.custom2 + 1 }))}>Custom Item {this.state.custom2} </button>
            </div> 
            </div>
        <div>
            <input ref={inp => this.isRegService = inp} type="radio" id="RegService" name="serviceType" value="text" />
          <label for="pickup">Regular Service</label>
            <input ref={inp => this.isExpressService = inp} type="radio" id="ExpressService" name="serviceType" value="text" />
          <label for="delivery">Express Service</label>
            <input ref={inp => this.isCustomService = inp} type="radio" id="isCustomService" name="serviceType" value="text" />
          <label for="delivery">Custom Service</label>
        </div>
          <div>{this.state.regServPickup}</div>
          <div>{this.state.expServPickup}</div>
          <div>Custom Date!?</div>

        <div>
          <button onClick={this.goToOrderPageOne}>Back/Edit</button>
          <button type="submit">Review</button>
        </div>
        </form>
      </div>
    )
  }

  goToReview = (event) => {
    event.preventDefault()
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
        <form onSubmit={this.confirmation}>
        <div>
          <input ref={inp => this.isPaid = inp} type="radio" id="Paid" name="Payment" value="Paid" />
          <label for="pickup">Pay Now</label>
          <input ref={inp => this.isPickupPay = inp} type="radio" id="pickupPay" name="Payment" value="pickupPay" />
          <label for="pickupPay">Pay on Pick-up</label>
        </div>
        <div>
        <button type="submit">Submit Form</button>
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
    this.setState(st => ({orderStatus : 'cancelled'}))
    this.dashboard()
  }

  suspendOrder = () => {
    alert('order suspended')
    this.setState(st => ({orderStatus : 'suspended' }))
    this.dashboard()
  }

  confirmation = () => {
    this.props.history.push('/confirmation')
  }

  dashboard = () => {
    this.props.history.push('/dashboard')
  }

render () {
  
  if (this.state.currentPage === '') return (this.orderFormHome())
  if (this.state.currentPage === 'orderFormPageOne') return (this.orderFormOne())
  if (this.state.currentPage === 'orderFormPageTwo') return (this.orderFormTwo())
  if (this.state.currentPage === 'orderFormPageThree') return (this.orderFormThree())
  if (this.state.currentPage === 'orderFormReview') return (this.orderFormReview())
  }
}

export default orderForm
