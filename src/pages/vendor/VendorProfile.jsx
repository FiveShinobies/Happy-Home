import React from 'react'
import { Link } from 'react-router-dom'

function VendorProfile() {
  return (
    <div>
      <h1>Vendor Profile Page</h1>
      <Link to="/vendor-home/edit-vendor-profile">Edit Profile</Link>
    </div>
  )
}

export default VendorProfile
