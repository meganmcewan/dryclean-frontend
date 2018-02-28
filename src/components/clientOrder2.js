// import React, { Component } from 'react'
// import { registerMerchant, signout } from '../requests.js'
// import { Redirect } from 'react-router'
// import { createNewOrder, getOpenOrders, getClosedOrders, getPastDueOrders, getMerchantPrices, checkLogin, markPickedUp, getMerchantAddress } from '../requests';

// class ClientOrder extends Component {
//     constructor() {
//         super()
//         this.state = {
//             clientObj: {},
//             merchantObj: {},
//             orderNumber: Math.floor((Math.random() * 10000) + 1),
//             clientOrderForm: 'PERSONAL_INFO',
//             trousers: null,
//             suit: null,
//             overcoat: null,
//             ladiesSuit: null,
//             dress: null,
//             skirt: null,
//             jacket: null,
//             tie: null,
//             blouse: null,
//             shirt: null,
//             totalPrice: null
//         }
//     }

//     componentWillMount() {
//         if (!this.props.location.state.merchantId) {
//             this.props.history.push('/dashboard')
//         }
//         // console.log('this is in merhcant', this.props.location.state.merchantId)
//         // console.log('this is in the else merchant prices',this.props.location.state.merchantPrices.Regular )
       
//         else { 
            
            
//             var uidFromBack = checkLogin()
//             var merchantObj = { merchantId: uidFromBack.user.uid }
//             getMerchantPrices(merchantObj)
//             .then(x => {
//                 console.log('this is merchant prices',x)
//                 //this.setState({ merchantPrices: x.prices })

            
//                 this.setState({ merchantObj: { merchantId: this.props.location.state.merchantId, 
//                     merchantPrices: x.prices,//this.props.location.state.merchantPrices.Regular,
//                     merchantAddress: this.props.location.state.merchantAddress 
//                 }})
//             })
//                                             }
//     }

//     // STEP 1/3  CLIENT PERSONAL INFO  ---------------------
//     submitPersonalInfoForm = (e) => {
//         e.preventDefault()
//         console.log('Client Name:', this.clientFullName.value)
//         console.log('Client Phone Number:', this.clientPersonalNumber.value)
//         this.setState({
//             clientObj: {
//                 clientFullName: this.clientFullName.value,
//                 clientPersonalNumber: this.clientPersonalNumber.value,
//             },
//             clientOrderForm: 'ORDER_INFO'
//         })
//     }

//     clientPersonalInfoForm = () => {
//         return (
//             <div className='inital-css'>
//                 <div className='app-nav'>
//                     <img className='logo-icon' src='https://i.imgur.com/mJDVmQH.png' />
//                     <h3>New Order</h3>
//                     <div className='logout' onClick={this.logout}>Logout</div>
//                 </div>
//                 <div>
//                     <p> 1/2 - Client Personal Info:</p>
//                     <form>
//                         <div>
//                             <input ref={r => this.clientFullName = r} placeholder='Full Name' />
//                         </div>
//                         <div>
//                             <input ref={r => this.clientPersonalNumber = r} placeholder='Phone Number' />
//                         </div>
//                         <div className='page-circles'>
//                             <div className='circles'></div>
//                             <div id='unselected' className='circles'></div>
//                         </div>

//                         <div className='footer-btn-wrapper'>
//                             <button className='large-footer-btn' onClick={this.submitPersonalInfoForm}>Next</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         )
//     }

//     goToReview = () => {
//         console.log('clicked go to review')
//         this.props.history.push('/confirmation', { orderSummary: this.state })
//     }

//     updatePrice = (inp, productName) => {
//         var inc = inp * this.state.merchantObj.merchantPrices[productName]
//         console.log('inc, from updatePrice:', inc)
//         // console.log('PreSt from update Price: ', PreSt.totalPrice)
//         this.setState(PreSt => ({ totalPrice: inc + PreSt.totalPrice }))
//     }

//     updateOrderDetails = (productName) => {
//         this.setState(PreSt => {
//             let newProductQty = PreSt[productName] + 1;
//             this.updatePrice(1, productName);
//             let newState = {};
//             newState[productName] = newProductQty
//             return newState;
//         })
//     }

//     totalPrice = () => {
//         let ret = Math.floor(this.state.totalPrice * 100) / 100
//         console.log(ret)
//         // 
//         this.setState({totalPrice: ret})
//     }

//     logout = () => {
//         signout()
//         this.props.history.push('/')
//     }

//     addSurchage =()=>{ 
//         var incPrice = this.state.totalPrice * 1.5
//         var surCharge = incPrice - this.state.totalPrice
//         this.setState({totalPrice: incPrice, surCharge: surCharge})
//     }

//     clientOrderDetails = () => {
//         return (
//             <div className='inital-css'>
//                 <div className='app-nav'>
//                     <img className='logo-icon' src='https://i.imgur.com/mJDVmQH.png' />
//                     <h3>New Order</h3>
//                     <div className='logout' onClick={this.logout}>Logout</div>
//                 </div>

//                 <div className='order-subtotal'>
//                             <div>Subtotal: <b>${this.state.totalPrice}</b></div>
//                             <div>Reset</div>
//                             <button onClick = {this.addSurchage} >Express</button>
//                         </div>

//                 <div className='client-order-wrapper'>
//                     <div>
//                         <div className='order-buttons-wrapper'>
//                             <div className='flex'>
//                                 <div className='order-button' onClick={() => this.updateOrderDetails('trousers')}>Trousers {this.state.trousers} </div>
//                                 <div className='order-button' onClick={() => this.updateOrderDetails('suit')}>Suit {this.state.suit} </div>
//                             </div>

//                             <div className='flex'>
//                                 <div className='order-button' onClick={() => this.updateOrderDetails('overcoat')}>Overcoat {this.state.overcoat} </div>
//                                 <div className='order-button' onClick={() => this.updateOrderDetails('ladiesSuit')}>Ladies Suit {this.state.ladiesSuit} </div>
//                             </div>

//                             <div className='flex'>
//                                 <div className='order-button' onClick={() => this.updateOrderDetails('dress')}>Dress {this.state.dress} </div>
//                                 <div className='order-button' onClick={() => this.updateOrderDetails('skirt')}>Skirt {this.state.skirt} </div>
//                             </div>

//                             <div className='flex'>
//                                 <div className='order-button' onClick={() => this.updateOrderDetails('jacket')}>Jacket {this.state.jacket} </div>
//                                 <div className='order-button' onClick={() => this.updateOrderDetails('blouse')}>Blouse {this.state.blouse} </div>
//                             </div>

//                             <div className='flex'>
//                                 <div className='order-button' onClick={() => this.updateOrderDetails('shirt')}>Shirt {this.state.shirt} </div>
//                                 <div className='order-button' onClick={() => this.updateOrderDetails('tie')}>Tie {this.state.tie} </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className='page-circles'>
//                         <div id='unselected' className='circles'></div>
//                         <div className='circles'></div>
//                     </div>
//                 </div>

//                 <div className='footer-btn-wrapper'>
//                     <button className='large-footer-btn' onClick={this.goToReview}>Review Order</button>
//                 </div>
//             </div>
//         )
//     }

//     render() {
//         if (this.state.clientOrderForm === 'PERSONAL_INFO') return this.clientPersonalInfoForm()
//         if (this.state.clientOrderForm === 'ORDER_INFO') return this.clientOrderDetails()
//     }
// }

// export default ClientOrder

