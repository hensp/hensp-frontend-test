import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login";
import MedicineList from "./components/MedicineList";
import AddMedicine from "./components/AddMedicine";
import EditMedicine from "./components/EditMedicine";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/medicines" element={<MedicineList />} />
        <Route path="/add-medicine" element={<AddMedicine />} />
        <Route path="/edit-medicine/:id" element={<EditMedicine />} />
      </Routes>
    </Router>
  );
}

export default App;

