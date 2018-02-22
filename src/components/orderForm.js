import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class orderForm extends Component {
  constructor () {
    super()
    this.state = {currentPage : null,
                  trousers : null,
                  suit : null,
                  ladiesSuit: null,
                  dress: null,
                  skirt: null,
                  jacket: null,
                  ties: null,
                  blouse: null,
                  shirt: null,
                  ties: null,
                  custom1 : null,
                  custom2 : null
              
                }
  }

  orderFormHome = () => {
    return(
    <div className='inital-css'>
        <div>
          <h1>Order Form</h1>
        </div>
        <div>
          <h3>Client Information</h3>
        </div>
      <form>  
      <label for="telNo">Enter a telephone number:</label>
      <input id="telNo" type="tel" placeholder="(111)-222-3333" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
      <button type="submit" onClick={this.goToOrderPageOne} placeholder="submit">Next</button>
      </form>
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
      <div>
        <h1>Order Form</h1>
      </div>
        <div>
          <h3>Client Information</h3>
        </div>
        <form>
          <div>
            <input ref={inp => this.ispickup = inp} type="checkbox" id="pickup" name="pickup" value="pickup"/>
            <label for="pickup">Pickup</label>
            <input ref={inp => this.isdelivery = inp} type="checkbox" id="delivery" name="delivery" value="delivery"/>
            <label for="delivery">Delivery</label>
          </div>
          <div>
            <input ref={inp => this.clientName = inp} type="text" placeholder="Client Name"/>
              <input ref={inp => this.clientAddress = inp} type="text" placeholder="Client Address (optional)"/>
                <input ref={inp => this.clientCity = inp} type="text" placeholder="City (optional)"/>
                  <input ref={inp => this.clientProvinceState = inp} type="text" placeholder="Province/State (optional)"/>
                    <input ref={inp => this.clientPostalZip = inp} type="text" placeholder="Postal Code/Zip (optional)"/>
          </div>
          {/* Here it would be really great to display the status of any outstanding orders that are past due
          OR/ALSO the last time the client came to the shop */}
          <div>
          <button onClick={this.goToOrderPageTwo}>Next</button>
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
        <div>
          <h1>Order Form</h1>
        </div>
        <div>
          <h3>Order Details - Tap to add</h3>
        </div>
        <form>
          <div>
            <div>
              <button type="button" onClick={() => this.setState(PreSt => ({trousers: PreSt.trousers + 1}))}>Trousers {this.state.trousers} </button>
              <button type="button" onClick={() => this.setState(PreSt => ({ suit: PreSt.suit + 1 }))}>Suit {this.state.suit} </button>
            </div> 
            <div>
              <button >Overcoat</button>
              <button >Ladies Suit</button>
            </div> 
            <div>
              <button >Dress</button>
              <button >Skirt</button>
            </div> 
            <div>
              <button >Jacket</button>
              <button >Blouse</button>
            </div> 
            <div>
              <button >Shirt</button>
              <button >Ties</button>
            </div> 
            <div>
              <button >CUSTOM FIELD</button>
              <button >CUSTOM FIELD</button>
            </div> 
            </div>
        <div>
            <input ref={inp => this.isRegService = inp} type="checkbox" id="RegService" name="RegService" value="RegService" />
          <label for="pickup">Regular Service</label>
            <input ref={inp => this.isExpressService = inp} type="checkbox" id="ExpressService" name="ExpressService" value="ExpressService" />
          <label for="delivery">Express Service</label>
            <input ref={inp => this.isCustomService = inp} type="checkbox" id="isCustomService" name="isCustomService" value="isCustomService" />
          <label for="delivery">Custom Service</label>
          {/* This is where the delivery times are shown */}
        </div>
        </form>
        <button onClick={this.goToOrderPageOne}>Back/Edit</button>
        <button onClick={this.goToReview}>Review</button>
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
        <div>
          <h1>Review Form</h1>
        </div>
        <div>
          <h3>This is where the information goes</h3>
        </div>
        <form>
        <div>
          <input ref={inp => this.isPaid = inp} type="checkbox" id="Paid" name="Paid" value="Paid" />
          <label for="pickup">Pay Now</label>
          <input ref={inp => this.isPickupPay = inp} type="checkbox" id="pickupPay" name="pickupPay" value="pickupPay" />
          <label for="pickupPay">Pay on Pick-up</label>
        </div>
        </form>
        {/* would be nice to put a notes section */}
        <div>
        <button onClick={this.goToOrderPageTwo}>Edit/Back</button>
        <button onClick={this.confirmation}>Submit Form</button>
        </div>
      </div>
    )
  }

  confirmation = () => {
    this.props.history.push('/confirmation')
  }


render () {
  
  if (this.state.currentPage === null) return (this.orderFormHome())
  if (this.state.currentPage === 'orderFormPageOne') return (this.orderFormOne())
  if (this.state.currentPage === 'orderFormPageTwo') return (this.orderFormTwo())
  if (this.state.currentPage === 'orderFormPageThree') return (this.orderFormThree())
  if (this.state.currentPage === 'orderFormReview') return (this.orderFormReview())
  }
}

export default orderForm
