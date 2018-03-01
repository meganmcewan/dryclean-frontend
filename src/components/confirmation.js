import React, { Component } from 'react'
import { createNewOrder } from '../requests.js'

class Confirmation extends Component {
  constructor() {
    super()
    this.state = {
      isExpress: false,
      surCharge: null
    }
  }

  componentWillMount() {

    let ndate = new Date()  /// // give the curent that in time
    let year = ndate.getFullYear()
    let month = ndate.getMonth() + 1
    let day = ndate.getDate()
    let date = month + '/' + day + '/' + year


    // var orderObject = findOrder(merchantId, orderId)

    // .then(x =>{console.log('this is the respnose in view order', x)
    //   this.setState({
    //   orderSummary: x.orderObject, merchantAddress: x.merchantAddress })}
    // )
    console.log("orderSummary", this.props.location.state.orderSummary)
    this.setState({
      orderSummary: this.props.location.state.orderSummary,
      totalPrice: this.props.location.state.orderSummary.totalPrice,
      date: date
    })
  }

  sendSms = (x) => {
    console.log(x)
    console.log(x.orderConfirmation.date)
    var number = '' + this.state.orderSummary.clientObj.clientPersonalNumber;
    var newTimeStamp = x.orderConfirmation.timestamp + 172800000;
    var pickupDate = (new Date(newTimeStamp)).toLocaleDateString();
    var message = 'Hi ' + this.state.orderSummary.clientObj.clientFullName + ', welcome to clnr! Your dry cleaning order no.' + this.state.orderSummary.orderNumber + ' will be ready on ' + pickupDate + " at 1pm. Don't worry, we'll also send you a reminder."


    fetch('/sendSms', {
      method: 'POST',
      body: JSON.stringify({
        phoneNumber: number,
        message: message
      })
    }).then()
  }


  confirmOrder = () => {
    createNewOrder(this.state)
      .then(x => this.sendSms(x))
      .then(x => this.state.orderSummary)
      .then(x => this.props.history.push('/dashboard', { merchantId: x.merchantId }))

    // setTimeout(() => this.props.history.push('/dashboard'), 1000)
    // this.props.history.push('/dashboard', this.state.orderSummary.merchantObj.merchantId)
  }

  toggleExpress = (event) => {
    console.log('toggle is clicked')
    this.setState({ isExpress: !this.state.isExpress });
    this.toggleSurcharge(!this.state.isExpress);
  }


  toggleSurcharge = (isExpress) => {
    if (isExpress) {
      var incPrice = this.state.totalPrice * 1.25
      var surCharge = incPrice - this.state.totalPrice
      this.setState({ totalPrice: incPrice, surCharge: surCharge })
    } else {
      var newTotalPrice = this.state.totalPrice - this.state.surCharge
      this.setState({ totalPrice: newTotalPrice, surCharge: null })
    }

  }

  goToDash = () => {
    this.props.history.push('/dashboard')
  }

  render() {

    return (
      <div className='inital-css'>
        <div className='app-nav'>
          <img className='logo-icon' src='https://i.imgur.com/mJDVmQH.png' />
          <h3>Review Order</h3>
          <div id='back-arrow' onClick={this.goToDash}>✕</div>
        </div>


        <div className='confirmation-wrapper'>
          <div className='confirmation-header'>
            <div className='date-wrapper'>
              <div className='date'>
                <div className='confirmation-field-title'>Recieved</div>
                <div className='client-info'>{this.state.date}</div>
              </div>
            </div>

            <div id='order-num'>{this.state.orderSummary.orderNumber}</div>
          </div>

          <div className='line' />
          <div className='merchant-adress-info'>
            <div className='store-name'>{this.state.orderSummary.merchantObj.merchantAddress.businessName}</div>
            <div>{this.state.orderSummary.merchantObj.merchantAddress.businessAddress}</div>
            <div>{this.state.orderSummary.merchantObj.merchantAddress.city + ' ' + this.state.orderSummary.merchantObj.merchantAddress.province}</div>
            <div>{this.state.orderSummary.merchantObj.merchantAddress.businessPhoneNum}</div>
          </div>

          <div>
            <div>
              <div className='item-list'>
                <div id='form-header' className='item-type'>Client Name</div>
                <div id='form-header' className='item-type'>Client Phone #</div>
              </div>
              <div className='item-list'>
                <div id='last-item' className='item-type'>{this.state.orderSummary.clientObj.clientFullName}</div>
                <div id='last-item' className='item-type'>{this.state.orderSummary.clientObj.clientPersonalNumber}</div>
              </div>
            </div>
          </div>

          <div className='flex'>
            <p id='order-summary'>Order Summary</p>
            <div className='express-order'>
              <input id='express' type="checkbox" onClick={this.toggleExpress} />
              <p id='order-summary'>Express Service</p>
            </div>
          </div>

          <div className='item-list-wrapper'>
            <div className='item-list'>
              <div id='form-header' className='item-amount'>QTY</div>
              <div id='form-header' className='item-type'>Article</div>
              <div id='form-header' className='item-amount'>AMOUNT</div>
            </div>

            {this.state.orderSummary.trousers > 0 &&
              <div className='item-list'>
                <div className='item-amount'>{this.state.orderSummary.trousers}</div>
                <div className='item-type'>Trousers</div>
                <div className='item-amount'>${this.state.orderSummary.trousers * this.state.orderSummary.merchantObj.merchantPrices.Regular.trousers}</div>
              </div>}

            {this.state.orderSummary.suit > 0 &&
              <div className='item-list'>
                <div className='item-amount'>{this.state.orderSummary.suit}</div>
                <div className='item-type'>Suit</div>
                <div className='item-amount'>${this.state.orderSummary.suit * this.state.orderSummary.merchantObj.merchantPrices.Regular.suit}</div>
              </div>}

            {this.state.orderSummary.overcoat > 0 &&
              <div className='item-list'>
                <div className='item-amount'>{this.state.orderSummary.overcoat}</div>
                <div className='item-type'>Overcoat</div>
                <div className='item-amount'>${this.state.orderSummary.overcoat * this.state.orderSummary.merchantObj.merchantPrices.Regular.overcoat}</div>
              </div>}

            {this.state.orderSummary.ladiesSuit > 0 &&
              <div className='item-list'>
                <div className='item-amount'>{this.state.orderSummary.ladiesSuit}</div>
                <div className='item-type'>Ladies Suit</div>
                <div className='item-amount'>${this.state.orderSummary.ladiesSuit * this.state.orderSummary.merchantObj.merchantPrices.Regular.ladiesSuit}</div>
              </div>}

            {this.state.orderSummary.dress > 0 &&
              <div className='item-list'>
                <div className='item-amount'>{this.state.orderSummary.dress}</div>
                <div className='item-type'>Dress</div>
                <div className='item-amount'>${this.state.orderSummary.dress * this.state.orderSummary.merchantObj.merchantPrices.Regular.dress}</div>
              </div>}

            {this.state.orderSummary.skirt > 0 &&
              <div className='item-list'>
                <div className='item-amount'>{this.state.orderSummary.skirt}</div>
                <div className='item-type'>Skirt</div>
                <div className='item-amount'>${this.state.orderSummary.skirt * this.state.orderSummary.merchantObj.merchantPrices.Regular.skirt}</div>
              </div>}

            {this.state.orderSummary.jacket > 0 &&
              <div className='item-list'>
                <div className='item-amount'>{this.state.orderSummary.jacket}</div>
                <div className='item-type'>Jacket</div>
                <div className='item-amount'>${this.state.orderSummary.jacket * this.state.orderSummary.merchantObj.merchantPrices.Regular.jacket}</div>
              </div>}

            {this.state.orderSummary.blouse > 0 &&
              <div className='item-list'>
                <div className='item-amount'>{this.state.orderSummary.blouse}</div>
                <div className='item-type'>Blouse</div>
                <div className='item-amount'>${this.state.orderSummary.blouse * this.state.orderSummary.merchantObj.merchantPrices.Regular.blouse}</div>
              </div>}

            {this.state.orderSummary.shirt > 0 &&
              <div className='item-list'>
                <div className='item-amount'>{this.state.orderSummary.shirt}</div>
                <div className='item-type'>Shirt</div>
                <div className='item-amount'>${this.state.orderSummary.shirt * this.state.orderSummary.merchantObj.merchantPrices.Regular.shirt}</div>
              </div>}

            {this.state.orderSummary.tie > 0 &&
              <div className='item-list'>
                <div className='item-amount'>{this.state.orderSummary.tie}</div>
                <div className='item-type'>Tie</div>
                <div className='item-amount'>${this.state.orderSummary.tie * this.state.orderSummary.merchantObj.merchantPrices.Regular.tie}</div>
              </div>}

              <div className='item-list'>
                <div className='item-type' />
                <div className='item-amount service'>EXPRESS</div>
                <div className='item-amount service'>${this.state.isExpress ? this.state.surCharge.toFixed(2) : Number(0).toFixed(2)}</div>
              </div>

              <div className='item-list'>
              <div className='item-type'></div>
              <div className='item-amount service'>SUBTOTAL</div>
              <div className='item-amount service'>${this.state.totalPrice.toFixed(2)}</div>
            </div>
            <div className='item-list'>
              <div className='item-type'></div>
              <div className='item-amount service'>TAX (15%)</div>
              <div className='item-amount service'>${(this.state.totalPrice *0.15).toFixed(2)}</div>
            </div>
            <div className='item-list'>
            <div id='last-item' className='item-type service'>Service: {this.state.isExpress ? "Express" : "Standard"}</div>
            <div id='last-item' className='item-amount total-cost'>TOTAL</div>
              <div id='last-item' className='item-amount total-cost'>${(this.state.totalPrice * 1.15).toFixed(2)}</div>
            </div>

          </div>
        </div>
        <div>
          <div className='footer-btn-wrapper'>
            <button id='color-cta' className='large-footer-btn' onClick={this.confirmOrder}>Submit</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Confirmation
