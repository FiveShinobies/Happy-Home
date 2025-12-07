import React from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar.jsx'
import { Outlet } from 'react-router-dom'
function AdminHome() {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
    </div>
  )
}

export default AdminHome
