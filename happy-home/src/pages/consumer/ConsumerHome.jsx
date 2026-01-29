import React from 'react'
import ConsumerNavbar from '../../components/consumer/ConsumerNavbar'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function ConsumerHome() {

  return (
    <div>
      <ConsumerNavbar/>
      <Outlet/>
    </div>
  )
}

export default ConsumerHome
