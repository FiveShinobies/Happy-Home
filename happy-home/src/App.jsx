import { Routes , Route } from 'react-router-dom'
import Login from './pages/consumer/Login'
import ServiceCart from './pages/consumer/Cart'
import Register from './pages/consumer/Register'
import BookingCheckout from './pages/consumer/BookingCheckout'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<ServiceCart />} />
        <Route path="/checkout" element={<BookingCheckout/>} />
      </Routes>
    </div>    
  )
}

export default App
