import React, { Component } from 'react'
import { Link } from 'react-router-dom'

function NavBar () {
  return (
    <div>
      <div className='navWrapper'>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/orderForm'>New Order</Link>
      </div>
    </div>
  )
}

export default NavBar
