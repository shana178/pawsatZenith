import React, { useState } from "react";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { Container, TextField, Button, Typography, Paper, Box, Link } from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Registration successful! Logging in...");
      await dispatch(login({ email: formData.email, password: formData.password })).unwrap();
      navigate("/profile");
    } catch (err) {
      setError("Error registering user. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "calc(100vh - 100px)", // Adjust based on footer height
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "50px", // Ensure extra space above the footer
        }}
      >
        <Paper elevation={3} sx={{ padding: "40px", width: "100%", maxWidth: "400px" }}>
          <Typography variant="h4" sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}>
            Register
          </Typography>

          {/* Error Message */}
          {error && (
            <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              required
              sx={{
                backgroundColor: "#f9f9f9", // Input background
                borderRadius: "8px",
              }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              required
              sx={{
                backgroundColor: "#f9f9f9", // Input background
                borderRadius: "8px",
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              required
              sx={{
                backgroundColor: "#f9f9f9", // Input background
                borderRadius: "8px",
              }}
            />

            <Box sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  padding: "12px",
                  fontSize: "16px",
                  '&:hover': { backgroundColor: "#FF6A00" }, // Hover effect
                }}
              >
                Register
              </Button>
            </Box>
          </form>

          {/* Link to Login page */}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link href="/login" variant="body2" sx={{ textDecoration: "none" }}>
                Login here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
