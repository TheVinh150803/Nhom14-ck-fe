import React, { Component } from "react";
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

// Tạo nút chuyển hướng
const NavigateButtons = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", gap: "10px", marginTop: "15px" }}>
      <Button variant="contained" onClick={() => navigate("/")}>
        Sinh Viên
      </Button>
      <Button variant="contained" color="secondary" onClick={() => navigate("/LoginGiangVien")}>
        Giảng Viên
      </Button>
    </Box>
  );
};


function withRouter(Component) {
  return function (props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class LoginSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mssv: "",
      password_sinhvien: "",
      error: "",
    };
  }

  handleMSSVChange = (event) => {
    this.setState({ mssv: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password_sinhvien: event.target.value });
  };

  handleLogin = async () => {
    const { mssv, password_sinhvien } = this.state;

    try {
      const response = await axios.post("https://webdiemdanh-1.onrender.com/api/login", {
        mssv,
        password_sinhvien,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      const data = response.data;
      if (data.status === "success") {
        alert("Đăng nhập thành công!");
        localStorage.setItem('sinhVien', JSON.stringify(data.data.sinh_vien));
        localStorage.setItem('token', data.data.token);
        // Chuyển hướng đến trang thông tin sinh viên
        this.props.navigate("/thongtinSV");
      } else {
        this.setState({ error: data.message || "Sai MSSV hoặc mật khẩu" });
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      this.setState({ error: "Lỗi hệ thống hoặc kết nối. Vui lòng thử lại!" });
    }
  };

  render() {
    const { mssv, password_sinhvien, error } = this.state;

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
            <Box component="img" src={logo} alt="Logo" sx={{ width: "80px", height: "80px", mb: 2 }} />
            <Typography variant="h5" fontWeight="bold" mb={2}>
              LOGIN SINH VIÊN
            </Typography>

            <TextField
              fullWidth
              label="MSSV"
              variant="outlined"
              value={mssv}
              onChange={this.handleMSSVChange}
              sx={{ marginBottom: "15px" }}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              value={password_sinhvien}
              onChange={this.handlePasswordChange}
              sx={{ marginBottom: "20px" }}
            />

            {error && (
              <Typography color="error" sx={{ marginBottom: "15px" }}>
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              onClick={this.handleLogin}
              sx={{ width: "100%", padding: "10px", fontSize: "16px" }}
            >
              LOGIN Sinh Viên
            </Button>

            <NavigateButtons />
          </Box>

          <Divider orientation="vertical" flexItem sx={{ width: "3px", bgcolor: "gray" }} />

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

export default withRouter(LoginSV);