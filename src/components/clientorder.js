import React, { Component } from 'react'
import { registerMerchant } from '../requests.js'
import { Redirect } from 'react-router'

class ClientOrder extends Component {
    constructor() {
        super()
        this.state = {
            clientObj: {},
            merchantObj: {},
            orderNumber: 2434,
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
        this.setState({merchantObj: {merchantId: this.props.location.state.merchantId, merchantPrices: this.props.location.state.merchantPrices.Regular}})
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

    //     // STEP 2/3  MERCHANT BUSINESS INFO  ---------------------
    //     submitBusinessInfoForm = () => {
    //         this.setState({
    //             accountSetupForm: 'PRICE_INFO',
    //             merchantSubmittedInformation: {
    //                 merchantId: this.props.location.state.merchantId,
    //                 merchantFullName: this.state.merchantSubmittedInformation.merchantFullName,
    //                 merchantPersonalNumber: this.state.merchantSubmittedInformation.merchantPersonalNumber,
    //                 businessName: this.businessName.value,
    //                 businessPhoneNum: this.businessPhoneNum.value,
    //                 businessAddress: this.businessAddress.value,
    //                 city: this.city.value,
    //                 province: this.province.value,
    //                 postalCode: this.postalCode.value,
    //             }
    //         })
    //     }

    //     businessInfoForm = () => {
    //         return (
    //             <div className='inital-css'>
    //                 <div className='app-nav'>
    //                     <h3>Account Setup:</h3>
    //                 </div>
    //                 <div>
    //                     <p>2/3 - Business Account Info:</p>
    //                     <input ref={r => this.businessName = r} placeholder='Business Name' />
    //                     <input ref={r => this.businessPhoneNum = r} placeholder='Business Phone #' />
    //                     <input ref={r => this.businessAddress = r} placeholder='Business Address' />
    //                     <input ref={r => this.city = r} placeholder='City' />
    //                     <input ref={r => this.province = r} placeholder='Province / State' />
    //                     <input ref={r => this.postalCode = r} placeholder='Postal / Zip Code' />
    //                     <button onClick={this.submitBusinessInfoForm}>Next</button>
    //                 </div>
    //             </div>
    //         )
    //     }


    // // SUBMITS ALL FORMS & CREATES A NEW MERCHANT ACCOUNT  ---------------------
    //     createNewAccount = () => {
    //         var prices = {
    //             regular: {
    //                 trousers: + this.trousersRegular.value,
    //                 suit: + this.suitRegular.value,
    //                 overcoat: + this.overcoatRegular.value,
    //                 ladiesSuit: + this.ladiesSuitRegular.value,
    //                 dress: + this.dressRegular.value,
    //                 skirt: + this.skirtRegular.value,
    //                 jacket: + this.jacketRegular.value,
    //                 blouse: + this.blouseRegular.value,
    //                 tie: + this.tieRegular.value
    //             },
    //             express: {
    //                 trousers: + this.trousersExpress.value,
    //                 suit: + this.suitExpress.value,
    //                 overcoat: + this.overcoatExpress.value,
    //                 ladiesSuit: + this.ladiesSuitExpress.value,
    //                 dress: + this.dressExpress.value,
    //                 skirt: + this.skirtExpress.value,
    //                 jacket: + this.jacketExpress.value,
    //                 blouse: + this.blouseExpress.value,
    //                 tie: + this.tieExpress.value
    //             }
    //         }

    //         this.setState({ prices: prices },
    //             () => this.props.history.push('/dashboard', {
    //                 merchantId: this.props.location.state.merchantId,
    //                 merchantSubmittedInformation: this.state.merchantSubmittedInformation,
    //                 prices: this.state.prices
    //             })
    //         )
    //         registerMerchant(this.state.merchantSubmittedInformation, prices)
    //     }

    // componentWillMount() {
    //     console.log(this.state.merchantId)
    //     if (this.state.merchantId === undefined) { return <Redirect to='/' /> }
    //     this.setState({ merchantId: this.props.location.state.merchantId }, () => console.log('user ID', this.state.merchantId))
    // }

    render() {

       if (this.state.clientOrderForm === 'PERSONAL_INFO') return this.clientPersonalInfoForm()
       if (this.state.clientOrderForm === 'ORDER_INFO') return this.clientOrderDetails()
       

        // if (this.state.merchantId === undefined) { return <Redirect to='/signup' /> }
        // if (this.state.accountSetupForm === 'PERSONAL_INFO') { return this.personalInfoForm() }
        // if (this.state.accountSetupForm === 'BUSINESS_INFO') { return this.businessInfoForm() }
        // if (this.state.accountSetupForm === 'PRICE_INFO') { return this.priceListForm() }
    }
}

export default ClientOrder
