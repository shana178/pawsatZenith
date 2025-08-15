import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/actions/userActions";
import { fetchSession, logout } from "../redux/userSlice"; // Import logout
import { Container, TextField, Button, Typography, Avatar, Box } from "@mui/material";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.user);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!userInfo) {
      dispatch(fetchSession());
    } else {
      setName(userInfo.name || "");
      setEmail(userInfo.email || "");
    }
  }, [dispatch, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserProfile({ name, email }));
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile.");
    }
  };

  const handleLogout = async () => {
    await dispatch(logout()); // Dispatch logout action
  };

  if (!userInfo) return <h3>Please log in to view your profile.</h3>;
  if (loading) return <h3>Loading...</h3>;

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Avatar sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}> {name[0]} </Avatar>
      <Typography variant="h4">User Profile</Typography>
      {error && <Typography color="error">{error}</Typography>}
      
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          value={email}
          disabled
          margin="normal"
        />
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Update Profile
          </Button>
        </Box>
      </form>

      {/* Logout Button - Only show if user is logged in */}
      {userInfo && (
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Profile;
