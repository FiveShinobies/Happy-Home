import { Routes, Route } from 'react-router-dom'
//import Login from './pages/consumer/Login'
import Home from "./pages/mainHome/Home";
//import HomePage from './components/Home'
import AdminHome from './pages/admin/AdminHome'
import ServiceListing from './pages/admin/ServiceListing'
import EditService from './pages/admin/service/EditService'
import ServiceDetails from './pages/admin/service/ServiceDetails'
import AddService from './pages/admin/AddService'


function App() {

  return (
    <div>

      <Home />
      {/* <Routes> */}
      {/* <Route path="/" element={<AdminHome />}> */}

      {/* <ServiceListing /> */}
      {/* <AddService/>
      <EditService/>
      <ServiceDetails/> */}
      {/* <Route index element={<ServiceListing />} />
          <Route path="add-service" element={<AddService />} />
          <Route path="edit-service/:id" element={<EditService />} />
          <Route path="service/:id" element={<ServiceDetails />} /> */}
      {/* </Route> */}
      {/* </Routes> */}

    </div>
  )
}

export default App
