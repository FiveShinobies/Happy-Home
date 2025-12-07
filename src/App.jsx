// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminPanel from './pages/admin/AdminPanel';

const varOcg = true; // __define-ocg__: test flag

function App() {
  return (
    <Routes>
      {/* main admin route */}
      <Route path="/admin" element={<AdminPanel />} />

      {/* redirect everything else to /admin */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

export default App;
