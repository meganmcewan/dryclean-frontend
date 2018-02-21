import React, { Component } from 'react'
import { Link } from 'react-router-dom'

function navBar () {
  return (
    <div>
      <div className='navWrapper'>
        <Link to='/'>Dashboard</Link>
        <Link to='/'>New Order</Link>
      </div>
    </div>
  )
}

export default navBar
