import React, { Component } from 'react'
import Confirmation from './confirmation.js'
import { findOrder } from '../requests.js'
class ViewOrder extends Component {
  constructor () {
    super()
    this.state = {
      orderSummary: null
    }
  }
  componentWillMount () {
    var orderId = this.props.match.params.orderId
    var merchantId = this.props.match.params.merchantId
    console.log(orderId)
    console.log(merchantId)

    var orderObject = findOrder(merchantId, orderId)
    .then(x => this.setState({orderSummary: x.orderObject}))
  }

  render () {
    console.log('state log', this.state.orderSummary)
    if (!this.state.orderSummary) {
      return (
        <div>
          <div>loading...</div>
        </div>
      )
    } else {
      return (
        <div className='inital-css'>
          <div className='app-nav'>
            <h3>Review Order</h3>
          </div>

          <div className='confirmation-wrapper'>

            <div className='confirmation-header'>
              <div className='order-status'>
                <div>Status: In Progress</div>
                <div>PAID</div>
              </div>

              <div id='order-num'>{this.state.orderSummary.orderNumber}</div>
            </div>

            <div className='merchant-adress-info'>
              <div className='store-name'>Dry Cleaner and Tailor St-Viateur</div>
              <div>150 rue Saint Viateur Montreal, QC, H2T 2L3</div>
              <div>Phone: 514-276-3106</div>
            </div>

            <div>
              <div>

                <div className='client-info-fields'>
                  <div className='client-phone'>
                    <div className='confirmation-field-title'>Phone</div>
                    <div className='client-info'>{this.state.orderSummary.clientObj.clientPersonalNumber}</div>
                  </div>

                  <div>
                    <div className='date'>
                    <div className='confirmation-field-title'>Name</div>
                    <div className='client-info'>{this.state.orderSummary.clientObj.clientFullName}</div>

                    <div className='date'>
                      <div className='confirmation-field-title'>Date</div>
                      <div className='client-info'>02/25/2018</div>
                    </div>

                  </div>
                  </div>
                </div>

              </div>
              <div className='line' />
            </div>

            <div className='ready-date-wrapper'>
              <div className='ready-date'>Mon</div>
              <div className='ready-date'>Feb</div>
              <div className='ready-date'>28</div>
              <div className='ready-date'>2018</div>
              <div className='ready-date'>12 PM</div>
            </div>

            <div className='item-list-wrapper'>
              <div className='item-list'>
                <div id='form-header' className='item-type'>Article</div>
                <div id='form-header' className='item-amount'>QTY</div>
                <div id='form-header' className='item-amount'>AMOUNT</div>
              </div>

              <div className='item-list'>
                <div id='last-item' className='item-type' />
                <div id='last-item' className='item-amount'>TOTAL</div>
                <div id='last-item' className='item-amount'>${this.state.orderSummary.totalPrice}</div>
              </div>
            </div>

            <p>Service: Regular</p>

          </div>
          <div>
            <button onClick={this.confirmOrder}>Confirm Order</button>
            {/* <button onClick={this.newOrder}>New Order</button> */}
          </div>
        </div >
      )
    }
  }
}

export default ViewOrder
