import axios from "axios";
import { 
  USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, 
  USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL 
} from "../constants/userConstants";

// Fetch User Profile
export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST }); // Add this before API call

    const { user: { userInfo } } = getState();
    const token = userInfo?.token; 

    if (!token) throw new Error("No authentication token found");

    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data } = await axios.get("/api/users/profile", config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

    // Update Redux store with new profile info
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response?.data?.message || "Error fetching profile",
    });
  }
};

// Update User Profile
export const updateUserProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const { data } = await axios.put("/api/users/profile", userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // ✅ Send session-based request
    });

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: error.response?.data?.message || "Profile update failed" });
  }
};

