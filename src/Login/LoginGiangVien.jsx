import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import schoolImage from "../img/anhtruong.jpg";
import logo from "../img/logo.jpg";

// Component cho nút chuyển hướng
const NavigateButtons = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", gap: "10px", marginTop: "15px" }}>
      <Button variant="contained" onClick={() => navigate("/")}>
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

const LoginGiangVien = () => {
  const [Magiangvien, setMagiangvien] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setMagiangvien(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://webdiemdanh-1.onrender.com/api/giangvien/dangnhap",
        {
          Magiangvien,
          password,
        }
      );
      const data = response.data;
      if (data.canlogin) {
        alert("Đăng nhập thành công!");
        localStorage.setItem("token", data.token);
        navigate("/homepage");
      } else {
        setError(data.message || "Sai MSSV hoặc mật khẩu");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập", error);
      setError("Lỗi hệ thống hoặc kết nối. Vui lòng thử lại!");
    }
  };

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
        {/* Phần login */}
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
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ width: "80px", height: "80px", mb: 2 }}
          />
          <Typography variant="h5" fontWeight="bold" mb={2}>
            LOGIN GIẢNG VIÊN
          </Typography>

          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={Magiangvien}
            onChange={handleUsernameChange}
            sx={{ marginBottom: "15px" }}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            sx={{ marginBottom: "15px" }}
          />

          {/* Thông báo lỗi nằm dưới ô password */}
          {error && (
            <Typography
              color="error"
              sx={{
                marginBottom: "15px",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{ width: "100%", padding: "10px", fontSize: "16px" }}
          >
            LOGIN Giảng Viên
          </Button>

          <NavigateButtons />
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ width: "3px", bgcolor: "gray" }}
        />

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
};

export default LoginGiangVien;
