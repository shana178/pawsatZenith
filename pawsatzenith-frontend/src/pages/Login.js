import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, Box, Link } from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) navigate("/profile");
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData)).unwrap();
      alert("Login Successful!");
      navigate("/profile");
    } catch (err) {
      alert("Login failed: " + (err.message || "Invalid credentials"));
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
            Login
          </Typography>
          
          {error && (
            <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
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

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Link href="/forgot-password" variant="body2" sx={{ textDecoration: "none" }}>
                Forgot password?
              </Link>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{
                  padding: "10px",
                  fontSize: "16px",
                  '&:hover': { backgroundColor: "#FF6A00" }, // Hover effect
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Box>
          </form>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link href="/register" variant="body2" sx={{ textDecoration: "none" }}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
