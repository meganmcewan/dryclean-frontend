import React, { Component } from 'react'

class CreateAccount extends Component {
    constructor() {
        super()
        this.state = {
            accountSetupForm: 'PERSONAL_INFO',
            merchantSubmittedInformation: {
                merchantFullName: '',
                merchantPersonalNumber: '',
                buisnessName: '',
                buisnessNumber: '',
                buisnessAddress: '',
                city: '',
                province: '',
                postalCode: ''
            },
            // prices: {
            //     standard: {
            //         trousers: 0,
            //         suit: 0,
            //         overcoat: 0,
            //         ladiesCoat: 0,
            //         dress: 0,
            //         skirt: 0,
            //         jacket: 0,
            //         blouse: 0,
            //         tie: 0
            //     },
            //     express: {
            //         trousers: 0,
            //         suit: 0,
            //         overcoat: 0,
            //         ladiesCoat: 0,
            //         dress: 0,
            //         skirt: 0,
            //         jacket: 0,
            //         blouse: 0,
            //         tie: 0
            //     }
            // }
        }
    }

    // 1/3  MERCHANT PERSONAL INFO  ---------------------
    submitPersonalInfoForm = (e) => {
        e.preventDefault()
        this.setState({
            accountSetupForm: 'BUISNESS_INFO',
            merchantSubmittedInformation: {
                merchantFullName: this.merchantFullName.value,
                merchantPersonalNumber: this.merchantPersonalNumber.value
            }
        })
    }

    personalInfoForm = () => {
        return (
            <div className='inital-css'>
                <h3>Merchant Account Setup:</h3>
                <div>
                    <p> 1/3 - Personal Info:</p>
                    <form>
                        <input ref={r => this.merchantFullName = r} placeholder='Full Name' />
                        <input ref={r => this.merchantPersonalNumber = r} placeholder='Phone Number' />
                        <button onClick={this.submitPersonalInfoForm}>Next</button>
                    </form>
                </div>
            </div>
        )
    }

    // 2/3  MERCHANT BUISNESS INFO  ---------------------
    submitBuisnessInfoForm = () => {
        this.setState({
            accountSetupForm: 'PRICE_INFO',
            merchantSubmittedInformation: {
                merchantFullName: this.state.merchantSubmittedInformation.merchantFullName,
                merchantPersonalNumber: this.state.merchantSubmittedInformation.merchantPersonalNumber,
                buisnessName: this.buisnessName.value,
                buisnessNumber: this.buisnessNumber.value,
                buisnessAddress: this.buisnessAddress.value,
                city: this.city.value,
                province: this.province.value,
                postalCode: this.postalCode.value,
            }
        })
    }

    buisnessInfoForm = () => {
        return (
            <div className='inital-css'>
                <h3>Merchant Account Setup:</h3>
                <div>
                    <p>2/3 - Buisness Account Info:</p>
                    <input ref={r => this.buisnessName = r} placeholder='Buisness Name' />
                    <input ref={r => this.buisnessNumber = r} placeholder='Buisness Phone #' />
                    <input ref={r => this.buisnessAddress = r} placeholder='Buisness Address' />
                    <input ref={r => this.city = r} placeholder='City' />
                    <input ref={r => this.province = r} placeholder='Province / State' />
                    <input ref={r => this.postalCode = r} placeholder='Postal / Zip Code' />
                    <button onClick={this.submitBuisnessInfoForm}>Next</button>
                </div>
            </div>
        )
    }

    // 3/3  MERCHANT SERVICES / PRICE INFO  ---------------------
    priceListForm = () => {
        return (
            <div className='inital-css'>
                <h3>Merchant Account Setup:</h3>
                <div>
                    <p>3/3 - Price List Setup:</p>
                    <div className='flex'>
                        <p>Trousers </p>
                        <div>
                            <input ref={r => this.trousersStandard = r} placeholder='Standard' />
                            <input ref={r => this.trousersExpress = r} placeholder='Express' />
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex'>
                        <p>Suit </p>
                        <div>
                            <input type='number' ref={r => this.suitStandard = r} placeholder='Standard' />
                            <input type='number' ref={r => this.suitExpress = r} placeholder='Express' />
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex'>
                        <p>Overcoat </p>
                        <div>
                            <input type='number' ref={r => this.overcoatStandard = r} placeholder='Standard' />
                            <input type='number' ref={r => this.overcoatExpress = r} placeholder='Express' />
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex'>
                        <p>Ladies Suit </p>
                        <div>
                            <input type='number' ref={r => this.ladySuitStandard = r} placeholder='Standard' defaultValue='0' />
                            <input type='number' ref={r => this.ladySuitExpress = r} placeholder='Express' />
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex'>
                        <p>Dress </p>
                        <div>
                            <input type='number' ref={r => this.dressStandard = r} placeholder='Standard' />
                            <input type='number' ref={r => this.dressExpress = r} placeholder='Express' />
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex'>
                        <p>Skirt </p>
                        <div>
                            <input type='number' ref={r => this.skirtStandard = r} placeholder='Standard' />
                            <input type='number' ref={r => this.skirtExpress = r} placeholder='Express' />
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex'>
                        <p>Jacket </p>
                        <div>
                            <input type='number' ref={r => this.jacketStandard = r} placeholder='Standard' />
                            <input type='number' ref={r => this.jacketExpress = r} placeholder='Express' />
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex'>
                        <p>Blouse </p>
                        <div>
                            <input type='number' ref={r => this.blouseStandard = r} placeholder='Standard' />
                            <input type='number' ref={r => this.blouseExpress = r} placeholder='Express' />
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex'>
                        <p>Tie </p>
                        <div>
                            <input type='number' ref={r => this.tieStandard = r} placeholder='Standard' />
                            <input type='number' ref={r => this.tieExpress = r} placeholder='Express' />
                        </div>
                    </div>
                </div>
                <button onClick={this.createNewAccount}>Create Account</button>
            </div>
        )
    }

    createNewAccount = () => {
        // console.log('create account')
        // console.log(this.state)
        var prices = {
            standard: {
                trousers: + this.trousersStandard.value,
                suit: + this.suitStandard.value,
                overcoat: + this.overcoatStandard.value,
                ladiesCoat: + this.ladySuitStandard.value,
                dress: + this.dressStandard.value,
                skirt: + this.skirtStandard.value,
                jacket: + this.jacketStandard.value,
                blouse: + this.blouseStandard.value,
                tie: + this.tieStandard.value
            },
            express: {
                trousers: + this.trousersExpress.value,
                suit: + this.suitExpress.value,
                overcoat: + this.overcoatExpress.value,
                ladiesCoat: + this.ladySuitExpress.value,
                dress: + this.dressExpress.value,
                skirt: + this.skirtExpress.value,
                jacket: + this.jacketExpress.value,
                blouse: + this.blouseExpress.value,
                tie: + this.tieExpress.value
            }
        }

        this.setState({ prices: prices },
            () =>     this.props.history.push('/dashboard', {
                userId: this.props.location.state,
                merchantSubmittedInformation: this.state.merchantSubmittedInformation,
                prices: this.state.prices
            })
        )

        // console.log('input value concole log',
        //     this.trousersStandard.value,
        //     this.suitStandard.value,
        //     this.overcoatStandard.value,
        //     this.ladySuitStandard.value,
        //     this.dressStandard.value,
        //     this.skirtStandard.value,
        //     this.jacketStandard.value,
        //     this.blouseStandard.value,
        //     this.tieStandard.value)
        // console.log('state console log', this.state)
    
    }

    componentWillMount() {
        // console.log('create-account-page userID:', this.props.location.state)
        this.setState({ userId: this.props.location.state })
    }

    render() {
        if (this.state.accountSetupForm === 'PERSONAL_INFO') { return this.personalInfoForm() }
        if (this.state.accountSetupForm === 'BUISNESS_INFO') { return this.buisnessInfoForm() }
        if (this.state.accountSetupForm === 'PRICE_INFO') { return this.priceListForm() }
    }
}

export default CreateAccount
