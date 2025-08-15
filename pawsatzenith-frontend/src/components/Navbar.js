import React from "react";
import { useMediaQuery, AppBar, Toolbar, Button, Container, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import PetsIcon from "@mui/icons-material/Pets";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { Link } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#FF8C00", boxShadow: 3 }}>
      <Toolbar>
        <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {/* Combined Navigation Links */}
          <Box sx={{ display: "flex", width: "100%", justifyContent: isSmallScreen ? "space-between" : "space-evenly" }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              startIcon={<HomeIcon />}
              sx={{
                fontWeight: "bold",
                color: "#fff",
                padding: "10px 20px",
                margin: "0 10px", // Added margin for spacing
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/pets"
              startIcon={<PetsIcon />}
              sx={{
                fontWeight: "bold",
                color: "#fff",
                padding: "10px 20px",
                margin: "0 10px", // Added margin for spacing
              }}
            >
              Adopt a Pet
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/store"
              startIcon={<StorefrontIcon />}
              sx={{
                fontWeight: "bold",
                color: "#fff",
                padding: "10px 20px",
                margin: "0 10px", // Added margin for spacing
              }}
            >
              Store
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/lost-found"
              startIcon={<HelpOutlineIcon />}
              sx={{
                fontWeight: "bold",
                color: "#fff",
                padding: "10px 20px",
                margin: "0 10px", // Added margin for spacing
              }}
            >
              Lost & Found
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/care-guides"
              startIcon={<VolunteerActivismIcon />}
              sx={{
                fontWeight: "bold",
                color: "#fff",
                padding: "10px 20px",
                margin: "0 10px", // Added margin for spacing
              }}
            >
              Pet Care Guides
            </Button>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
