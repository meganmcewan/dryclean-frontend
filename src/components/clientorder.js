import React, { Component } from 'react'
import { registerMerchant } from '../requests.js'
import { Redirect } from 'react-router'

class ClientOrder extends Component {
    constructor() {
        super()
        this.state = {
            clientObj: {},
            merchantObj: {},
            orderNumber: Math.floor((Math.random() * 10000) + 1),
            clientOrderForm: 'PERSONAL_INFO',
            trousers: null,
            suit: null,
            overcoat: null,
            ladiesSuit: null,
            dress: null,
            skirt: null,
            jacket: null,
            tie: null,
            blouse: null,
            shirt: null,
            totalPrice: null
        }
    }

    componentWillMount(){
        
        if(!this.props.location.state.merchantId){
            this.props.history.push('/dashboard')
        }
        else {this.setState({merchantObj: {merchantId: this.props.location.state.merchantId, merchantPrices: this.props.location.state.merchantPrices.Regular}})}
    }

    // STEP 1/3  CLIENT PERSONAL INFO  ---------------------
    submitPersonalInfoForm = (e) => {
        e.preventDefault()
        console.log('Client Name:', this.clientFullName.value)
        console.log('Client Phone Number:', this.clientPersonalNumber.value)
        this.setState({
            clientObj: {
                clientFullName: this.clientFullName.value,
                clientPersonalNumber: this.clientPersonalNumber.value,
            },
            clientOrderForm: 'ORDER_INFO'
        })
    }

    clientPersonalInfoForm = () => {
        return (
            <div className='inital-css'>
                <div className='app-nav'>
                    <h3>New Order</h3>
                </div>
                <div>
                    <p> 1/2 - Client Personal Info:</p>
                    <form>
                        <div>
                            <input ref={r => this.clientFullName = r} placeholder='Full Name' />
                        </div>
                        <div>
                            <input ref={r => this.clientPersonalNumber = r} placeholder='Phone Number' />
                        </div>
                        <button onClick={this.submitPersonalInfoForm}>Next</button>
                    </form>
                </div>
            </div>
        )
    }

goToReview = () => {
    console.log('clicked go to review')
    this.props.history.push('/confirmation', { orderSummary: this.state })
}

updatePrice = (inp, productName) => {
    var inc = inp * this.state.merchantObj.merchantPrices[productName]
    console.log('inc, from updatePrice:', inc)
    // console.log('PreSt from update Price: ', PreSt.totalPrice)
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

    clientOrderDetails = () => {
        return (
            <div className='inital-css'>
                <div className='app-nav'>
                    <h3>New Order</h3>
                </div>
                <div>
                    <p> 2/2 - Order Details</p>
                    <div>
                    <button type="button" onClick={() => this.updateOrderDetails('trousers')}>Trousers {this.state.trousers} </button>
                    <button type="button" onClick={() => this.updateOrderDetails('suit')}>Suit {this.state.suit} </button>
                  </div>
                  <div>
                    <button type="button" onClick={() => this.updateOrderDetails('overcoat')}>Overcoat {this.state.overcoat} </button>
                    <button type="button" onClick={() => this.updateOrderDetails('ladiesSuit')}>Ladies Suit {this.state.ladiesSuit} </button>
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
                </div>
                <div>
            <div>Sub-Total:</div>
            <div>${this.totalPrice()}</div>
          </div>
                <button onClick={this.goToReview}>Review Order</button>
            </div>
        )
    }

    render() {
       if (this.state.clientOrderForm === 'PERSONAL_INFO') return this.clientPersonalInfoForm()
       if (this.state.clientOrderForm === 'ORDER_INFO') return this.clientOrderDetails()
    }
}

export default ClientOrder
