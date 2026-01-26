import React from 'react'
import { Nav } from 'react-bootstrap'
import VendorNavbar from '../../components/vendor/VendorNavbar'
import { Outlet } from 'react-router-dom'

function VendorHome() {
  return (
    <div>
        <VendorNavbar />
        
        <Outlet />
    </div>
  )
}

export default VendorHome
