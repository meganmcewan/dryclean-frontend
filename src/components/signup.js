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
            console.log('signup username:', this.user.value)
            console.log('signup password:', this.pass.value)
            console.log('signup username:', this.confirmPass.value)
            console.log('merchant type selected:', this.state.userType)

            ///// we still need to figure out how to pas "user"
            var uidFromBack = await registerUser(this.user.value, this.state.userType, this.pass.value)

            if (uidFromBack !== undefined) {
                this.setState({ userId: uidFromBack })
                console.log(this.state.userId)
                this.props.history.push('/createaccount', {userId: uidFromBack})
            }
        }
    }

    handleOnChange = (event) => {
        console.log('merchant type selected:', event.target.value)
        this.setState({userType: event.target.value})
    }

    render() {
        return (
            <div className='inital-css'>
                <form>
                    <h3>Sign Up:</h3>

                    <input ref={r => this.usertype = r} type="radio" id="merchant" name="usertype" value="merchant" defaultChecked onChange={this.handleOnChange}/>
                    <label for="merchant">Merchant</label>
                    <input ref={r => this.usertype = r} type="radio" id="customer" name="usertype" value="customer" onChange={this.handleOnChange}/>
                    <label for="customer">Customer</label>

                    <div> <input type='text' ref={r => this.user = r} placeholder='Email' /></div>
                    <div> <input type='password' ref={r => this.pass = r} placeholder='Password' /></div>
                    <div> <input type='password' ref={r => this.confirmPass = r} placeholder='Confirm Password' /></div>

                    <div>{this.state.formError}</div>
                    <button onClick={this.submitSignup}>Submit</button>
                    <div>or <Link to='/login'>Log In</Link></div>
                </form>
            </div>
        )
    }
}

export default Signup
