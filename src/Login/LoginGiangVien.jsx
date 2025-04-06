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
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
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




function withRouter(Component) {
  return function (props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}


class LoginGiangVien extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maGV: "", // Thêm thuộc tính cho username
      password: "",  // Thêm thuộc tính cho password
    };
  }


  handleUsernameChange = (event) => {
    this.setState({ maGV: event.target.value });
  };


  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };


  handleLogin = async () => {
    const { maGV, password } = this.state;


    try {
      const response = await axios.post("http://localhost:8000/api/dangnhapGV", {
        maGV,
        password,
      });
      console.log(response);
      const data = response.data;
      if (data.canlogin) {
        alert("Đăng nhập thành công!");
        this.props.navigate("/thongtinGV"); // Chuyển hướng khi đăng nhập thành công
      } else {
        alert("Sai tên đăng nhập hoặc mật khẩu");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập", error);
      alert("Lỗi hệ thống hoặc kết nối");
    }
  };


  render() {
    const { maGV, password } = this.state;


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
              LOGIN GIẢNG VIÊN
            </Typography>


            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={maGV}
              onChange={this.handleUsernameChange}
              sx={{ marginBottom: "15px" }}
            />


            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={this.handlePasswordChange}
              sx={{ marginBottom: "20px" }}
            />


            <Button
              variant="contained"
              onClick={this.handleLogin}
              sx={{ width: "100%", padding: "10px", fontSize: "16px" }}
            >
              LOGIN Giảng Viên
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


export default withRouter(LoginGiangVien);
