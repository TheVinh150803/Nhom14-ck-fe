// src/SinhVien/withNavigation.js
import { useNavigate } from "react-router-dom";
import React from "react";

// HOC: Higher-Order Component để truyền navigate vào class component
function withNavigation(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

export default withNavigation;
