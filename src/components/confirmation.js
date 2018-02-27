import React, { Component } from 'react'
import { createNewOrder } from '../requests.js'

class Confirmation extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    this.setState({ orderSummary: this.props.location.state.orderSummary })
  }

  confirmOrder = () => {
   console.log("orderSummary",this.state.orderSummary)
    createNewOrder(this.state.orderSummary)
    .then(x => this.props.history.push('/dashboard', {merchantId: x.merchantId}))

    // setTimeout(() => this.props.history.push('/dashboard'), 1000)
    // this.props.history.push('/dashboard', this.state.orderSummary.merchantObj.merchantId)
  }

  render() {

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
            <div className='line'></div>
          </div>

          <div className='item-list-wrapper'>
            <div className='item-list'>
              <div id='form-header' className='item-type'>Article</div>
              <div id='form-header' className='item-amount'>QTY</div>
              <div id='form-header' className='item-amount'>AMOUNT</div>
            </div>

            <div className='item-list'>
              <div className='item-type'>Trousers</div>
              <div className='item-amount'>{this.state.orderSummary.trousers}</div>
              <div className='item-amount'>{this.state.orderSummary.trousers > 0 && <div>${this.state.orderSummary.trousers * this.state.orderSummary.merchantObj.merchantPrices.trousers}</div>}</div>
              </div>

            <div className='item-list'>
              <div className='item-type'>Suit</div>
              <div className='item-amount'>{this.state.orderSummary.suit}</div>
              <div className='item-amount'>{this.state.orderSummary.suit > 0 && <div>${this.state.orderSummary.suit * this.state.orderSummary.merchantObj.merchantPrices.suit}</div>}</div>
              </div>

            <div className='item-list'>
              <div className='item-type'>Overcoat</div>
              <div className='item-amount'>{this.state.orderSummary.overcoat}</div>
              <div className='item-amount'>{this.state.orderSummary.overcoat > 0 && <div>${this.state.orderSummary.overcoat * this.state.orderSummary.merchantObj.merchantPrices.overcoat}</div>}</div>
              </div>

            <div className='item-list'>
              <div className='item-type'>Ladies Suit</div>
              <div className='item-amount'>{this.state.orderSummary.ladiesSuit}</div>
              <div className='item-amount'>{this.state.orderSummary.ladiesSuit > 0 && <div>${this.state.orderSummary.ladiesSuit * this.state.orderSummary.merchantObj.merchantPrices.ladiesSuit}</div>}</div>
              </div>

            <div className='item-list'>
              <div className='item-type'>Dress</div>
              <div className='item-amount'>{this.state.orderSummary.dress}</div>
              <div className='item-amount'>{this.state.orderSummary.dress > 0 && <div>${this.state.orderSummary.dress * this.state.orderSummary.merchantObj.merchantPrices.dress}</div>}</div>
              </div>

            <div className='item-list'>
              <div className='item-type'>Skirt</div>
              <div className='item-amount'>{this.state.orderSummary.skirt}</div>
              <div className='item-amount'>{this.state.orderSummary.skirt > 0 && <div>${this.state.orderSummary.skirt * this.state.orderSummary.merchantObj.merchantPrices.skirt}</div>}</div>
              </div>

            <div className='item-list'>
              <div className='item-type'>Jacket</div>
              <div className='item-amount'>{this.state.orderSummary.jacket}</div>
              <div className='item-amount'>{this.state.orderSummary.jacket > 0 && <div>${this.state.orderSummary.jacket * this.state.orderSummary.merchantObj.merchantPrices.jacket}</div>}</div>
              </div>

            <div className='item-list'>
              <div className='item-type'>Blouse</div>
              <div className='item-amount'>{this.state.orderSummary.blouse}</div>
              <div className='item-amount'>{this.state.orderSummary.blouse > 0 && <div>${this.state.orderSummary.blouse * this.state.orderSummary.merchantObj.merchantPrices.blouse}</div>}</div>
              </div>

            <div className='item-list'>
              <div className='item-type'>Shirt</div>
              <div className='item-amount'>{this.state.orderSummary.shirt}</div>
              <div className='item-amount'>{this.state.orderSummary.shirt > 0 && <div>${this.state.orderSummary.shirt * this.state.orderSummary.merchantObj.merchantPrices.shirt}</div>}</div>
              </div>

            <div className='item-list'>
              <div className='item-type'>Tie</div>
              <div className='item-amount'>{this.state.orderSummary.tie}</div>
              <div className='item-amount'>{this.state.orderSummary.tie > 0 && <div>${this.state.orderSummary.tie * this.state.orderSummary.merchantObj.merchantPrices.tie}</div>}</div>
              </div>

            <div className='item-list'>
              <div id='last-item' className='item-type'></div>
              <div id='last-item' className='item-amount'>TOTAL</div>
              <div id='last-item' className='item-amount'>${this.state.orderSummary.totalPrice.toFixed(2)}</div>
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

export default Confirmation
