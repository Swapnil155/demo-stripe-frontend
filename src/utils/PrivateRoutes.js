import { useSelector } from "react-redux";
import { Outlet, Route, Navigate } from "react-router-dom";
import TokenService from "../services/tokenService";
// import { isLogin } from '../utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.users);
  // console.log(isAuthenticated);
  const user = TokenService.getUser();
  // console.log(user.isAuthenticate);
  // return user && user.isAuthenticate ? <Outlet /> : <Navigate to="/Login" />;
  return user && isAuthenticated ? <Outlet /> : <Navigate to="/Login" />;
};

export default PrivateRoute;
