import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";

// Import hình ảnh
import schoolImage from "../img/anhtruong.jpg";
import logo from "../img/logo.jpg";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
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
    console.log("Login attempt with:", username, password);
    // Thêm logic đăng nhập ở đây nếu cần
  };

  render() {
    const { username, password } = this.state;

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
          {/* Phần Login */}
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

            {/* Tiêu đề */}
            <Typography variant="h5" fontWeight="bold" mb={2}>
              LOGIN
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

            {/* Nút đăng nhập */}
            <Button
              variant="contained"
              onClick={this.handleLogin}
              sx={{ width: "100%", padding: "10px", fontSize: "16px" }}
            >
              LOGIN
            </Button>

            {/* Hai nút Sinh Viên / Giảng Viên */}
            <Box sx={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <Button variant="contained" color="primary">
                Sinh Viên
              </Button>
              <Button variant="contained" color="secondary">
                Giảng Viên
              </Button>
            </Box>
          </Box>

          {/* Đường phân cách */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ width: "3px", bgcolor: "gray" }}
          />

          {/* Phần hình ảnh */}
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

export default Login;
