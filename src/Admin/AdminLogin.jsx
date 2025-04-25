import React, { Component } from "react";
import axios from "axios";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import withNavigation from "./withNavigation";

class AdminLogin extends Component {
  state = {
    username: "", // Đổi từ email thành username
    password: "",
    error: "",
  };

  handleInputChange = (field) => (event) => {
    this.setState({ [field]: event.target.value });
  };

  handleLogin = () => {
    const { username, password } = this.state;
    axios
      .post("https://webdiemdanh-1.onrender.com/api/admin/login", {
        name_admin: username, // Đổi từ username_admin thành name_admin
        password_admin: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token); // Lưu token vào localStorage
        localStorage.setItem("id_admin", response.data.id_admin); // Lưu id_admin vào localStorage
        this.props.navigate("/QuanLyGiangVien"); // Chuyển hướng đến QuanLyGiangVien
      })
      .catch((error) => {
        this.setState({ error: "Username hoặc mật khẩu không đúng" });
      });
  };

  render() {
    const { username, password, error } = this.state;

    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Đăng nhập Admin
        </Typography>
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <Box display="flex" flexDirection="column" gap={2}>
        <TextField
            label="Username" 
            value={username}
            onChange={this.handleInputChange("username")}
            fullWidth
          />
          <TextField
            label="Mật khẩu"
            type="password"
            value={password}
            onChange={this.handleInputChange("password")}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={this.handleLogin}>
            Đăng nhập
          </Button>
        </Box>
      </Container>
    );
  }
}

export default withNavigation(AdminLogin);