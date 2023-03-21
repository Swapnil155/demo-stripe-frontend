import { useSelector } from "react-redux";
import { Outlet, Route, Navigate } from "react-router-dom";
import TokenService from "../services/tokenService";
// import { isLogin } from '../utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // return (
  //   // Show the component only when the user is logged in
  //   // Otherwise, redirect the user to /signin page
  //   <Route
  //     {...rest}
  //     render={(props) =>
  //       isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
  //     }
  //   />
  // );
  const user = TokenService.getUser();
  console.log(user.isAuthenticate);
  return user && user.isAuthenticate ? <Outlet /> : <Navigate to="/Login" />;
};

export default PrivateRoute;
