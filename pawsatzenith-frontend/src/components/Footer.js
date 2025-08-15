import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#333", color: "white", py: 3, textAlign: "center", position: "relative", bottom: 0, width: "100%" }}>
      <Typography variant="body2" sx={{ fontSize: '0.9rem', opacity: 0.7 }}>
        © 2025 Paws at Zenith | All Rights Reserved
      </Typography>
      <Typography variant="body2" sx={{ fontSize: '1rem' }}>
        Follow us on:{" "}
        <IconButton href="#" target="_blank" color="inherit" sx={{ '&:hover': { color: '#FF8C00' } }}>
          <FacebookIcon />
        </IconButton>
        <IconButton href="#" target="_blank" color="inherit" sx={{ '&:hover': { color: '#FF8C00' } }}>
          <InstagramIcon />
        </IconButton>
        <IconButton href="#" target="_blank" color="inherit" sx={{ '&:hover': { color: '#FF8C00' } }}>
          <TwitterIcon />
        </IconButton>
      </Typography>
    </Box>
  );
};

export default Footer;
