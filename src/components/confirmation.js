import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class confirmation extends Component {
  constructor () {
    super()
    this.state = {}
  }

    dashboard = () => {
        this.props.history.push('/dashboard')
    }

    newOrder = () => {
        this.props.history.push('/orderForm')
    }

  render () {
    return (
      <div className='inital-css'>
        <div>
          <h3>'Merchant Confirmation Page'</h3>
        </div>
        <div>
            <h2>This is where all of the information goes!</h2>
        </div>
        <div>
          <button onClick={this.dashboard}>Dashboard</button>
          <button onClick={this.newOrder}>New Order</button>
        </div>
      </div>
    )
  }
}

export default confirmation
