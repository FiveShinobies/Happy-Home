import { Routes , Route , Navigate } from 'react-router-dom'
import AdminHome from './pages/admin/AdminHome';
import Dashboard from './pages/admin/Dashboard';
import ServiceListing from './pages/admin/ServiceListing';
import AddService from './pages/admin/AddService';
import AllOrders from './pages/admin/AllOrders';
import AllVendors from './pages/admin/AllVendors';
import AllConsumers from './pages/admin/AllConsumers';
import ConsumerHome from './pages/consumer/ConsumerHome';
import AboutUs from './pages/consumer/AboutUs';
import ConsumerServiceListing from './pages/consumer/ServiceListing';
import VendorDashboard from './pages/vendor/VendorDashboard';
import VendorHome from './pages/vendor/VendorHome';
// import VendorProfile from './pages/vendor/VendorProfile';
import OrderHistory from './pages/vendor/OrderHistory';
import Login from './pages/login';
import Register from './pages/Register';

import BookingCheckout from './pages/consumer/service/BookingCheckout';
import ServiceDetails from './pages/consumer/service/ServiceDetails';

import ContactUs from './pages/consumer/ContactUs';
import ConsumerProfile from './pages/consumer/ConsumerProfile';

import ViewOrderDetails from './pages/consumer/orders/ViewOrderDetails';
import GiveFeedback from './pages/consumer/orders/GiveFeedback';
import EditOrderDetails from './pages/consumer/orders/EditOrderDetails';

import EditConsumerProfile from './pages/consumer/profile/EditConsumerProfile';
import Work from './pages/vendor/Work';
import ViewWorkOrderDetails from './pages/vendor/Order/ViewWorkOrderDetails';
import CompletedOrderDetail from './pages/vendor/Order/CompletedOrderDetail';
import VendorsFeedback from './pages/vendor/Order/VendorsFeedback';
import EditVendorsProfile from './pages/vendor/Profile/EditVendorsProfile';
import EditService from './pages/admin/service/EditService';
import ServiceDetailsAdmin from './pages/admin/service/ServiceDetailsAdmin';
import OrderDetails from './pages/admin/order/OrderDetails';
// import AssignVendor from './pages/admin/order/AssignVendor';
import ViewFeedback from './pages/admin/order/ViewFeedback';
import AdminPanel from './pages/admin/AdminPanel';
import ConsumerDetails from './pages/admin/consumer/ConsumerDetails';
import OrdersPage from './pages/consumer/orders/OrdersPage';
import AdminCompactDashboard from './pages/admin/AdminCompactDashboard';
import Home from './pages/mainHome/Home';



function App() {

  return (
    <div>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* adminroutes */}
        <Route path="/admin-home" element={<AdminHome />}>
          <Route index element={<AdminCompactDashboard />} />
          <Route path='dashboard' element={<Dashboard/>} />
{/* -------------------------------------------------------------------------------------- */}
          <Route path='service-listing' element={<ServiceListing />} />
          <Route path='add-service' element={<AddService />} />

          <Route path='edit-service/:id' element={<EditService />} />
          <Route path='view-service/:id' element={<ServiceDetailsAdmin />} />
{/* -------------------------------------------------------------------------------------- */}
          {/* <Route path='add-service' element={<AddService />} /> */}
{/* -------------------------------------------------------------------------------------- */}
          <Route path='all-orders' element={<AllOrders />} />
          <Route path='order-details/:orderId' element={<OrderDetails />} />
          <Route path='view-feedback' element={<ViewFeedback />} />
          {/* <Route path='assign-vendor' element={<AssignVendor />} /> */}
{/* -------------------------------------------------------------------------------------- */}
          <Route path='admin-panel' element={<AdminPanel />} />
          <Route path='all-vendors' element={<AllVendors />} />
          <Route path='all-consumers' element={<AllConsumers />} />
{/* -------------------------------------------------------------------------------------- */}

          <Route path='consumer-details' element={<ConsumerDetails />} />
{/* -------------------------------------------------------------------------------------- */}
        </Route> 



        <Route path='/' element={<Home />} /> 
        {/* consumer routes */}
        <Route path="/consumer-home" element={<ConsumerHome />}>
  
          <Route index element={<Navigate to="/" replace />} />
  
          <Route path='service-listing' element={<ConsumerServiceListing />} />  
          <Route path='service-details/:id' element={<ServiceDetails />} />
{/* -------------------------------------------------------------------------------------- */}
          <Route path='orders' element={<OrdersPage />} />
          <Route path='view-order-details' element={<ViewOrderDetails />} />
          <Route path='edit-order-details' element={<EditOrderDetails />} />
          <Route path='give-feedback' element={<GiveFeedback />} />
{/* -------------------------------------------------------------------------------------- */}
          <Route path='about-us' element={<AboutUs />} />
{/* -------------------------------------------------------------------------------------- */}
          <Route path='contact-us' element={<ContactUs />} />
{/* -------------------------------------------------------------------------------------- */}
          <Route path='consumer-profile' element={<ConsumerProfile />} />
          <Route path='edit-consumer-profile' element={<EditConsumerProfile />} />
{/* -------------------------------------------------------------------------------------- */}
          <Route path='checkout/:serviceId' element={<BookingCheckout />} />
        </Route>  


        {/* Vendor routes */}
        <Route path="/vendor-home" element={<VendorHome />}>
          <Route index element={<Work />} /> 
          <Route path='work' element={<Work />} />
          <Route path='view-work-order-details' element={<ViewWorkOrderDetails />} />
{/* -------------------------------------------------------------------------------------- */}
          <Route path='vendor-dashboard' element={<VendorDashboard />} />
{/* -------------------------------------------------------------------------------------- */}
          {/* <Route path='vendor-profile' element={<VendorProfile />} /> */}
          <Route path='vendor-profile' element={<EditVendorsProfile />} />
{/* -------------------------------------------------------------------------------------- */}
          <Route path='order-history' element={<OrderHistory />} />
          <Route path='completed-order-details/:orderId' element={<CompletedOrderDetail />} />
          <Route path='vendors-feedback/:orderId' element={<VendorsFeedback />} />
        </Route>  

      </Routes>
    </div>    
  )
}

export default App
