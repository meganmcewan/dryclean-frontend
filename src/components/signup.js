import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Signup extends Component {

    submitSignup = () => {
        console.log('clicked signup submit button')
    }

    render() {
        return (
            <div className='inital-css'>
                <h3>Sign Up:</h3>
                <div> <input type='text' placeholder='Username' /></div>
                <div> <input type='password' placeholder='Password' /></div>
                <div> <input type='number' placeholder='Phone Number' /></div>
                <button onClick={this.submitSignup}>Submit</button>
                <div>or <Link to='/login'>Log In</Link>
                </div>
            </div>
        )
    }
}

export default Signup
