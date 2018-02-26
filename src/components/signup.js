import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../requests';

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            formError: '',
            userType: 'merchant',
        }
    }

    submitSignup = async (e) => {
        e.preventDefault()
        if (this.pass.value !== this.confirmPass.value) {
            this.setState({ formError: 'Passwords must match' })
        } else {
            var uidFromBack = await registerUser(this.user.value, this.pass.value)

            if (uidFromBack !== undefined) {
                this.setState({ merchantId: uidFromBack.merchantId })
                this.props.history.push('/createaccount', {merchantId: uidFromBack.merchantId})
            }
        }
    }

//CHECKS THE 'RADIO' SELECT BUTTONS IF MERCHANT OR CUSTOMER ACCOUNT IS SELECTED
    handleOnChange = (event) => {
        this.setState({userType: event.target.value})
    }

    render() {
        return (
            <div className='inital-css'>
            <div className='loginWrapper'>
                <form>
                    <h3>Sign Up:</h3>

                    {/* <input ref={r => this.usertype = r} type="radio" id="merchant" name="usertype" value="merchant" defaultChecked onChange={this.handleOnChange}/>
                    <label for="merchant">Merchant</label>
                    <input ref={r => this.usertype = r} type="radio" id="customer" name="usertype" value="customer" onChange={this.handleOnChange}/>
                    <label for="customer">Customer</label> */}

                    <div> <input type='text' ref={r => this.user = r} placeholder='Email' /></div>
                    <div> <input type='password' ref={r => this.pass = r} placeholder='Password' /></div>
                    <div> <input type='password' ref={r => this.confirmPass = r} placeholder='Confirm Password' /></div>

                    <div>{this.state.formError}</div>
                    <button onClick={this.submitSignup}>Submit</button>
                    <p className='footnote'>Already have an account? <Link to='/login'>Log In</Link></p>
                </form>
            </div>
            </div>
        )
    }
}

export default Signup
