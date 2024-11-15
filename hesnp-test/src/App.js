import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Medicamentos from './pages/Medicamentos';
import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica el token para proteger la ruta

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/medicamentos"
          element={isAuthenticated ? <Medicamentos /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
