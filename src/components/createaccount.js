import React, { Component } from 'react'

class CreateAccount extends Component {
    constructor() {
        super()
        this.state = {
            accountSetupForm: 'PERSONAL_INFO'
        }
    }

    // 1/3  MERCHANT PERSONAL INFO  ---------------------
    submitPersonalInfoForm = () => {
        console.log('1/3 merchant personal name: ', this.merchantFullName.value)
        console.log('1/3 merchant personal number: ', this.merchantPersonalNumber.value)
        this.setState({ accountSetupForm: 'BUISNESS_INFO' })
    }

    personalInfoForm = () => {
        return (
            <div className='inital-css'>
                <h3>Merchant Account Setup:</h3>
                <div>
                    <p> 1/3 - Personal Info:</p>
                    <input ref={r => this.merchantFullName = r} placeholder='Full Name' />
                    <input ref={r => this.merchantPersonalNumber = r} placeholder='Phone Number' />
                    <button onClick={this.submitPersonalInfoForm}>Next</button>
                </div>
            </div>
        )
    }

    // 2/3  MERCHANT BUISNESS INFO  ---------------------
    submitBuisnessInfoForm = () => {
        this.setState({accountSetupForm: 'PRICE_INFO'})
    }

    buisnessInfoForm = () => {
        return (
            <div className='inital-css'>
                <h3>Merchant Account Setup:</h3>
                <div>
                    <p>2/3 - Buisness Account Info:</p>
                    <input placeholder='Buisness Name' />
                    <input placeholder='Buisness Phone #' />
                    <input placeholder='Buisness Address' />
                    <input placeholder='City' />
                    <input placeholder='Province / State' />
                    <input placeholder='Postal / Zip Code' />
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
                            <input placeholder='Standard' />
                            <input placeholder='Express' />
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex'>
                        <p>Suit </p>
                        <div>
                            <input placeholder='Standard' />
                            <input placeholder='Express' />
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex'>
                        <p>Overcoat </p>
                        <div>
                            <input placeholder='Standard' />
                            <input placeholder='Express' />
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex'>
                        <p>Ladies Suit </p>
                        <div>
                            <input placeholder='Standard' />
                            <input placeholder='Express' />
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex'>
                        <p>Dress </p>
                        <div>
                            <input placeholder='Standard' />
                            <input placeholder='Express' />
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex'>
                        <p>Skirt </p>
                        <div>
                            <input placeholder='Standard' />
                            <input placeholder='Express' />
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex'>
                        <p>Jacket </p>
                        <div>
                            <input placeholder='Standard' />
                            <input placeholder='Express' />
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex'>
                        <p>Blouse </p>
                        <div>
                            <input placeholder='Standard' />
                            <input placeholder='Express' />
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex'>
                        <p>Tie </p>
                        <div>
                            <input placeholder='Standard' />
                            <input placeholder='Express' />
                        </div>
                    </div>
                </div>
                <button onClick={this.createNewAccount}>Create Account</button>
            </div>
        )
    }

    createNewAccount = () => {
        console.log('create account')
        this.props.history.push('/dashboard')
    }

    render() {
        if (this.state.accountSetupForm === 'PERSONAL_INFO') { return this.personalInfoForm() }
        if (this.state.accountSetupForm === 'BUISNESS_INFO') { return this.buisnessInfoForm() }
        if (this.state.accountSetupForm === 'PRICE_INFO') { return this.priceListForm() }
    }
}

export default CreateAccount
