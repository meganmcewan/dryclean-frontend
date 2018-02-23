import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../requests';

class Signup extends Component {

    constructor(){
        super()
        this.state = {
            formError: ''
        }
    }
    
    submitSignup = async (e) => {
        e.preventDefault()
        if(this.pass.value !== this.confirmPass.value){
            this.setState({formError: 'Passwords must match'})
            console.log('passwords dont match')
        } else {
         
        console.log('signup username:', this.user.value)
        console.log('signup password:', this.pass.value)
        console.log('signup username:', this.confirmPass.value)
         
        
        ///// we still need to figure out how to pas "user" 
        var uidFromBack = await  registerUser(this.user.value,"user",this.pass.value)
        
        
        console.log(uidFromBack)
        if(uidFromBack !== undefined){
            this.setState({userId :uidFromBack })
            this.props.history.push('/createaccount')
          }
        }
    }



    render() {
        return (
            <div className='inital-css'>
                <form>
                    <h3>Sign Up:</h3>
                    <div> <input type='text' ref={r => this.user = r} placeholder='Username' /></div>
                    <div> <input type='password' ref={r => this.pass = r} placeholder='Password' /></div>
                    <div> <input type='password' ref={r => this.confirmPass = r} placeholder='Confirm Password' /></div>
                    <div>{this.state.formError}</div>
                    <button onClick={this.submitSignup}>Submit</button>
                    <div>or <Link to='/login'>Log In</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default Signup
