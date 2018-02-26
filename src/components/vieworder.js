import React, { Component } from 'react'
import Confirmation from './confirmation.js'

class ViewOrder extends Component {
  constructor () {
    super()
    this.state = {}
  }
  componentDidMount () {
        // fetch order with this.props.match.params.orderID
  }
  render () {
    return (

      <div>View Order</div>
        /* <Confirmation orderSummary={this.state} /> */
    )
  }
}

export default ViewOrder
