
import React, { Component } from 'react'
import './App.css'
import { signup, getUsers, login} from './requests';

class App extends Component {
    signUp = () => {
      signup(this.email.value, this.password.value)
        
    }

    login = () =>{
       var uidFromBack =  login(this.email.value, this.password.value)
       console.log(uidFromBack, "this is the uid from the back ")

    }
    getUsers = async () => {
        const data = await getUsers();
        console.log(data);
        //setstate....
    }

    addOrder = ()=>{
        addOrder(this.orderID.value, this.userID.value, this.info1.value, this.info2.value)

    }


    render() {
        return(
            <div>
                <input ref={ref => this.email = ref} type="email" />
                <input ref={ref => this.password = ref} type="password" />    
                <button onClick={this.signUp}>Sign Up</button>
                <button onClick={this.login}>login</button>

            </div>

            <div>
                    <input ref={ref => this.orderID = ref} type="text" />
                    <input ref={ref => this.userID = ref} type="text" /> 
                    <input ref={ref => this.info1 = ref} type="text" /> 
                    <input ref={ref => this.info2 = ref} type="text" /> 
                    <button onClick={this.addOrder}>Add a new order!</button>
            </div>    
        )
    }
}

export default App
