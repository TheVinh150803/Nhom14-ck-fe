// src/withNavigation.js (hoặc src/hoc/withNavigation.js nếu bạn sử dụng thư mục con `hoc`)
import React from "react";
import { useNavigate } from "react-router-dom";

// Tạo HOC (Higher-Order Component)
const withNavigation = (Component) => {
  return function WithNavigationComponent(props) {
    const navigate = useNavigate(); // Hook từ react-router-dom để điều hướng

    // Trả về Component với prop `navigate`
    return <Component {...props} navigate={navigate} />;
  };
};

export default withNavigation;
