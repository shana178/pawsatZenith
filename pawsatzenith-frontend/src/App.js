import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import Pets from "./pages/Pets";
import PetDetails from "./pages/PetDetails";
import UserDashboard from "./pages/UserDashboard";
import ShelterDashboard from "./pages/ShelterDashboard";
import LostFound from "./pages/LostFound";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Store from "./pages/Store";
import PetCareGuidesPage from "./pages/PetCareGuidesPage";
import CareGuideDetailsPage from "./pages/CareGuideDetailsPage"
import AdminCareGuides from "./pages/AdminCareGuides";
import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSession } from "./redux/userSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSession()); // ✅ Ensures session is restored on refresh
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/shelter-dashboard" element={<ShelterDashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/lost-found" element={<LostFound />} />
          <Route path="/store" element={<Store />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/care-guides" element={<PetCareGuidesPage />} />
          <Route path="/care-guides/:id" element={<CareGuideDetailsPage />} />
          <Route path="/admin/care-guides" element={<AdminCareGuides />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
