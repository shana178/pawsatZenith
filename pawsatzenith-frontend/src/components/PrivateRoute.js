import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSession } from "../redux/userSlice";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const { userInfo, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userInfo) {
      dispatch(fetchSession());
    }
  }, [dispatch, userInfo]);

  if (loading) return <div>Loading...</div>;
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
