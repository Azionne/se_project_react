import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProtectedRoute({
  isLoggedIn,
  children,
  anonymous = false,
}) {
  const location = useLocation();
  const from = location.state?.from || "/";

  if (isLoggedIn && anonymous) {
    return <Navigate to={from} />;
  }

  if (!isLoggedIn && anonymous) {
    return (
      <Navigate
        to="/"
        replace
        state={{ from: location, openRegisterModal: true }}
      />
    );
  }

  // If user is not logged in and route is not anonymous, redirect to home
  if (!isLoggedIn && !anonymous) {
    return <Navigate to="/" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node,
  anonymous: PropTypes.bool,
};
