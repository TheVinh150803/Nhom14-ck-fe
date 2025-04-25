import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const withNavigation = (Component) => {
  return function WithNavigationComponent(props) {
    const navigate = useNavigate();
    const location = useLocation();

    return <Component {...props} navigate={navigate} location={location} />;
  };
};

export default withNavigation;