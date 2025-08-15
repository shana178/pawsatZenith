import axios from "axios";

// ✅ Ensure axios sends cookies with requests
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // ✅ CRUCIAL for sessions
});

// Authentication API Calls
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);
export const logoutUser = () => API.post("/auth/logout");
export const getProfile = () => API.get("/auth/profile"); // ✅ Fetch logged-in user

// Pet API Calls
export const getPets = () => API.get("/pets");
export const addPet = (petData) => API.post("/pets", petData);

//Pet Care Guides API Calls
export const getCareGuides = () => API.get("/care-guides");
export const getCareGuideById = (id) => API.get(`/care-guides/${id}`);
//admin Care guides
export const createGuide = (guideData) => API.post("/guides", guideData);
export const updateGuide = (id, guideData) => API.put(`/guides/${id}`, guideData);
