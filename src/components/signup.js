import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../requests';

class Signup extends Component {

    submitSignup = (e) => {
        e.preventDefault()
        registerUser(this.user.value,)
        console.log('signup username:', this.user.value)
        console.log('signup password:', this.pass.value)
        console.log('signup username:', this.phone.value)



        this.props.history.push('/createaccount')
    }



    render() {
        return (
            <div className='inital-css'>
                <form>
                    <h3>Sign Up:</h3>
                    <div> <input type='text' ref={r => this.user = r} placeholder='Username' /></div>
                    <div> <input type='password' ref={r => this.pass = r} placeholder='Password' /></div>
                    <div> <input type='number' ref={r => this.phone = r} placeholder='Phone Number' /></div>
                    <button onClick={this.submitSignup}>Submit</button>
                    <div>or <Link to='/login'>Log In</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default Signup
