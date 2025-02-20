import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";

const Login = ({ setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.email !== credentials.email || storedUser.password !== credentials.password) {
      setError("Invalid email or password.");
      return;
    }

    // Authentication success
    localStorage.setItem("auth", "true"); // Store authentication state
    setIsAuthenticated(true);
    navigate("/"); // Redirect to Home
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center">
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleLogin}>
          <TextField fullWidth label="Email" name="email" type="email" variant="outlined" margin="normal" onChange={handleChange} required />
          <TextField fullWidth label="Password" name="password" type="password" variant="outlined" margin="normal" onChange={handleChange} required />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
        <Typography align="center" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Button onClick={() => navigate("/signup")} sx={{ textTransform: "none" }}>
            Signup
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
