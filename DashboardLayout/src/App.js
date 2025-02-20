import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayoutBasic from "./components/DashboardLayoutBasic";
import Products from "./pages/Products";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Order from "./pages/Orders"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<DashboardLayoutBasic><Home /></DashboardLayoutBasic>} />
        <Route path="/products" element={<DashboardLayoutBasic><Products /></DashboardLayoutBasic>} />
        <Route path="/dashboard" element={<DashboardLayoutBasic><Dashboard /></DashboardLayoutBasic>} />
        <Route path="/Orders" element={<DashboardLayoutBasic><Order /></DashboardLayoutBasic>} />
        <Route path="/About" element={<DashboardLayoutBasic><About /></DashboardLayoutBasic>} />
        <Route path="/Contact" element={<DashboardLayoutBasic><Contact /></DashboardLayoutBasic>} />
        <Route path="/Login" element={<DashboardLayoutBasic><Login /></DashboardLayoutBasic>} />

      </Routes>
    </Router>
  );
}

export default App;
