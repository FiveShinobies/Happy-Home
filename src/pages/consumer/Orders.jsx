import React from 'react'
import { Link } from 'react-router-dom'

function Orders() {
  return (
    <div>
      <h1>Consumer Orders</h1>
      <Link to='/consumer-home/view-order-details'>View Details</Link>
    </div>
  )
}

export default Orders
