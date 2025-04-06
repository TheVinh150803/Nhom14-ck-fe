import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import schoolImage from "../img/anhtruong.jpg";
import logo from "../img/logo.jpg";

// Hàm này sẽ chuyển hướng (navigate) khi nhấn vào nút
const NavigateButtons = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", gap: "10px", marginTop: "15px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")} // Chuyển đến trang login sinh viên
      >
        Sinh Viên
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/LoginGiangVien")} 
      >
        Giảng Viên
      </Button>
    </Box>
  );
};

class LecturerLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "", // Dùng để hiển thị thông báo lỗi
    };
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleLogin = () => {
    const { username, password } = this.state;
    if (username === "" || password === "") {
      this.setState({ error: "Vui lòng điền đủ thông tin!" });
    } else {
      // Thực hiện logic đăng nhập cho giảng viên tại đây
      console.log("Login attempt with:", username, password);
      this.setState({ error: "" });
      // Chuyển hướng sau khi đăng nhập thành công (nếu có)
    }
  };

  render() {
    const { username, password, error } = this.state;

    return (
      <Container
        maxWidth={false}
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "900px",
            height: "500px",
            boxShadow: 3,
            borderRadius: "10px",
            overflow: "hidden",
            bgcolor: "white",
          }}
        >
          {/* Lecturer Login Section */}
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "30px",
            }}
          >
            {/* Logo */}
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{ width: "80px", height: "80px", marginBottom: "10px" }}
            />

            {/* Title */}
            <Typography variant="h5" fontWeight="bold" mb={2}>
              LOGIN GIẢNG VIÊN
            </Typography>

            {/* Username */}
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={this.handleUsernameChange}
              sx={{ marginBottom: "15px" }}
            />

            {/* Password */}
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={this.handlePasswordChange}
              sx={{ marginBottom: "20px" }}
            />

            {/* Login Button */}
            <Button
              variant="contained"
              onClick={this.handleLogin}
              sx={{ width: "100%", padding: "10px", fontSize: "16px" }}
            >
              LOGIN Giảng Viên
            </Button>

            {/* Display error message */}
            {error && (
              <Typography color="error" sx={{ marginTop: "10px" }}>
                {error}
              </Typography>
            )}

            {/* Switch between Sinh Viên / Giảng Viên */}
            <NavigateButtons />
          </Box>

          {/* Divider between the login form and the image */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ width: "3px", bgcolor: "gray" }}
          />

          {/* Image section */}
          <Box
            sx={{
              width: "50%",
              backgroundImage: `url(${schoolImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Box>
      </Container>
    );
  }
}

export default LecturerLogin;
