import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PersistentDrawerLeft from './Drawer.jsx';
import User from './User.jsx';
import Shop from './Shop.jsx';
import Home from './Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private Routes (Protected) */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <PersistentDrawerLeft>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/user" element={<User />} />
                  <Route path="/shop" element={<Shop />} />
                </Routes>
              </PersistentDrawerLeft>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
