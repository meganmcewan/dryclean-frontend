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
    .then(x =>{console.log(x)
      this.setState({
      orderSummary: x.orderObject, merchantAddress: x.merchantAddress })}
    )
  }

  render () {
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
            <h3>Order Summary</h3>
          </div>

          <div className='confirmation-wrapper'>

            <div className='confirmation-header'>
              <div className='order-status'>
                <div>Status: In Progress</div>
                <div>Service: Regular</div>
              </div>

              <div id='order-num'>{this.state.orderSummary.orderNumber}</div>
            </div>

            <div className='merchant-adress-info'>
              <div className='store-name'>{this.state.merchantAddress.businessName}</div>
              <div>{this.state.merchantAddress.businessAddress}</div>
              <div>{this.state.merchantAddress.city}</div>
              <div>{this.state.merchantAddress.province}</div>
              <div>{this.state.merchantAddress.postalCode}</div>
              <div>{this.state.merchantAddress.businessPhoneNum}</div>
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

            <div className='item-list-wrapper'>
              <div className='item-list'>
                <div id='form-header' className='item-type'>Article</div>
                <div id='form-header' className='item-amount'>QTY</div>
                <div id='form-header' className='item-amount'>AMOUNT</div>
              </div>

              {this.state.orderSummary.trousers > 0 &&
              <div className='item-list'>
                <div className='item-type'>Trousers</div>
                <div className='item-amount'>{this.state.orderSummary.trousers}</div>
                <div className='item-amount'>${this.state.orderSummary.trousers * this.state.orderSummary.merchantObj.merchantPrices.trousers}</div>
              </div>}

              {this.state.orderSummary.suit > 0 &&
              <div className='item-list'>
                <div className='item-type'>Suit</div>
                <div className='item-amount'>{this.state.orderSummary.suit}</div>
                <div className='item-amount'>${this.state.orderSummary.suit * this.state.orderSummary.merchantObj.merchantPrices.suit}</div>
              </div>}

              {this.state.orderSummary.overcoat > 0 &&
              <div className='item-list'>
                <div className='item-type'>Overcoat</div>
                <div className='item-amount'>{this.state.orderSummary.overcoat}</div>
                <div className='item-amount'>${this.state.orderSummary.overcoat * this.state.orderSummary.merchantObj.merchantPrices.overcoat}</div>
              </div>}

              {this.state.orderSummary.ladiesSuit > 0 &&
              <div className='item-list'>
                <div className='item-type'>Ladies Suit</div>
                <div className='item-amount'>{this.state.orderSummary.ladiesSuit}</div>
                <div className='item-amount'>${this.state.orderSummary.ladiesSuit * this.state.orderSummary.merchantObj.merchantPrices.ladiesSuit}</div>
              </div>}

              {this.state.orderSummary.dress > 0 &&
              <div className='item-list'>
                <div className='item-type'>Dress</div>
                <div className='item-amount'>{this.state.orderSummary.dress}</div>
                <div className='item-amount'>${this.state.orderSummary.dress * this.state.orderSummary.merchantObj.merchantPrices.dress}</div>
              </div>}

              {this.state.orderSummary.skirt > 0 &&
              <div className='item-list'>
                <div className='item-type'>Skirt</div>
                <div className='item-amount'>{this.state.orderSummary.skirt}</div>
                <div className='item-amount'>${this.state.orderSummary.skirt * this.state.orderSummary.merchantObj.merchantPrices.skirt}</div>
              </div>}

              {this.state.orderSummary.jacket > 0 &&
              <div className='item-list'>
                <div className='item-type'>Jacket</div>
                <div className='item-amount'>{this.state.orderSummary.jacket}</div>
                <div className='item-amount'>${this.state.orderSummary.jacket * this.state.orderSummary.merchantObj.merchantPrices.jacket}</div>
              </div>}

              {this.state.orderSummary.blouse > 0 &&
              <div className='item-list'>
                <div className='item-type'>Blouse</div>
                <div className='item-amount'>{this.state.orderSummary.blouse}</div>
                <div className='item-amount'>${this.state.orderSummary.blouse * this.state.orderSummary.merchantObj.merchantPrices.blouse}</div>
              </div>}

              {this.state.orderSummary.shirt > 0 &&
              <div className='item-list'>
                <div className='item-type'>Shirt</div>
                <div className='item-amount'>{this.state.orderSummary.shirt}</div>
                <div className='item-amount'>${this.state.orderSummary.shirt * this.state.orderSummary.merchantObj.merchantPrices.shirt}</div>
              </div>}

              {this.state.orderSummary.tie > 0 &&
              <div className='item-list'>
                <div className='item-type'>Tie</div>
                <div className='item-amount'>{this.state.orderSummary.tie}</div>
                <div className='item-amount'>${this.state.orderSummary.tie * this.state.orderSummary.merchantObj.merchantPrices.tie}</div>
              </div>}

              <div className='item-list'>
                <div id='last-item' className='item-type' />
                <div id='last-item' className='item-amount'>TOTAL</div>
                <div id='last-item' className='item-amount'>${this.state.orderSummary.totalPrice.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default ViewOrder
