import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, TextField, Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import { styled } from '@mui/system'; // Import styled from @mui/system
import Logo from "../assets/logo.png";

// Styled TextField for better contrast
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: '#fff', // Ensure white background
    borderRadius: '25px',
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2, 2),
    fontSize: '16px',
  },
}));

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#fff", boxShadow: 3 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingX: 3,
          minHeight: "100px",
        }}
      >
        {/* Logo & Title */}
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src={Logo}
            alt="Paws at Zenith"
            style={{
              height: "60px",
              width: "auto",
              marginRight: "20px",
            }}
          />
          <Typography variant="h6" sx={{ color: "#333", fontWeight: "bold", fontSize: "1.8rem" }}>
            Paws at Zenith
          </Typography>
        </Link>

        {/* Center: Search Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: { xs: "80%", sm: "40%" },
            marginLeft: 2,
          }}
        >
          <StyledTextField
            fullWidth
            variant="outlined"
            placeholder="Search Pets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: "#888", mr: 1 }} />,
              style: { fontSize: '16px' }, // Set font size here
              sx: { borderRadius: '25px', paddingLeft: 2 }
            }}
            sx={{
              flexGrow: 1,
              boxShadow: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'transparent',
                },
              },
            }}
          />
        </Box>

        {/* Right: Sign In/Up Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Button
            color="inherit"
            component={Link}
            to="/login"
            startIcon={<LoginIcon />}
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            Sign In
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/register"
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
