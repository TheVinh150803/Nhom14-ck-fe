import React, { Component } from "react";
import axios from "axios";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

class ThemThongTinGiangVien extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherInfo: {
        id: "",
        name: "",
        phone: "",
        email: "",
        password: "",
        address: "", // Thêm địa chỉ
        gender: "",  // Thêm giới tính
      },
    };
  }

  handleInputChange = (field) => (event) => {
    this.setState({
      teacherInfo: {
        ...this.state.teacherInfo,
        [field]: event.target.value,
      },
    });
  };

  handleMenuClick = (text) => {
    if (text === "Quản lý User") {
      this.props.navigate("/quanlysinhvien");
    } else if (text === "Quản lý lớp học") {
      this.props.navigate("/quanlylophoc");
    } else if (text === "Quản lý lịch học") {
      this.props.navigate("/QuanLyLichHoc");
    } else if (text === "Quản lý Môn Học") {
      this.props.navigate("/quanlymonhoc");
    }
  };

  handleSubmit = () => {
    const { teacherInfo } = this.state;
    const id_admin = localStorage.getItem("id_admin");
    const token = localStorage.getItem("token");
  
    console.log("Token:", token); // Kiểm tra token
    console.log("Dữ liệu gửi đi:", {
      Magiangvien: teacherInfo.id,
      name_giangvien: teacherInfo.name,
      email_giangvien: teacherInfo.email,
      sdt_giangvien: teacherInfo.phone,
      password_giangvien: teacherInfo.password,
      diachi_giangvien: teacherInfo.address,
      gioitinh_giangvien: teacherInfo.gender,
      id_admin: id_admin,
    });
  
    axios
      .post(
        "https://webdiemdanh-1.onrender.com/api/admin/themgiangvien",
        {
          Magiangvien: teacherInfo.id,
          name_giangvien: teacherInfo.name,
          email_giangvien: teacherInfo.email,
          sdt_giangvien: teacherInfo.phone,
          password_giangvien: teacherInfo.password,
          diachi_giangvien: teacherInfo.address,
          gioitinh_giangvien: teacherInfo.gender,
          id_admin: id_admin,
        },
        {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`, // Gửi token trong header
          },
        }
      )
      .then((response) => {
        console.log("Thêm giảng viên thành công:", response.data);
        this.props.navigate("/QuanLyGiangVien");
      })
      .catch((error) => {
        console.error("Lỗi khi thêm giảng viên:", error.response?.data || error);
        alert("Thêm giảng viên thất bại. Vui lòng kiểm tra lại thông tin.");
      });
  };

  handleBack = () => {
    this.props.navigate("/QuanLyGiangVien");
  };

  render() {
    const { teacherInfo } = this.state;

    const menuItems = [
      { text: "Quản lý User", icon: <PersonIcon fontSize="large" /> },
      { text: "Quản lý lớp học", icon: <AssignmentIcon fontSize="large" /> },
      {
        text: "Quản lý lịch học",
        icon: <QrCodeScannerIcon fontSize="large" />,
      },
      { text: "Quản lý Môn Học", icon: <MenuBookIcon fontSize="large" /> },
    ];

    return (
      <Box display="flex" height="100vh">
        {/* Sidebar */}
        <Box width={240} bgcolor="primary.main" p={2}>
          <Box component="img" src={logo} width="100%" mb={4} />
          {menuItems.map((item, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              color="white"
              mb={2}
              sx={{ cursor: "pointer" }}
              onClick={() => this.handleMenuClick(item.text)}
            >
              {item.icon}
              <Typography variant="subtitle1" ml={2}>
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Main content */}
        <Container sx={{ flex: 1, p: 4 }}>
          <Typography variant="h6" mb={2}>
            Thêm thông tin giảng viên
          </Typography>

          <Box display="flex" flexDirection="column" gap={2} maxWidth={500}>
            <TextField
              label="Mã giảng viên"
              value={teacherInfo.id}
              onChange={this.handleInputChange("id")}
              fullWidth
            />
            <TextField
              label="Tên giảng viên"
              value={teacherInfo.name}
              onChange={this.handleInputChange("name")}
              fullWidth
            />
            <TextField
              label="Số điện thoại"
              value={teacherInfo.phone}
              onChange={this.handleInputChange("phone")}
              fullWidth
            />
            <TextField
              label="E-mail"
              value={teacherInfo.email}
              onChange={this.handleInputChange("email")}
              fullWidth
            />
             <TextField
              label="Địa chỉ"
              value={teacherInfo.address}
              onChange={this.handleInputChange("address")}
              fullWidth
            />
            <FormControl fullWidth>
            <InputLabel>Giới tính</InputLabel>
            <Select
              value={teacherInfo.gender}
              onChange={this.handleInputChange("gender")}
            >
              <MenuItem value="Nam">Nam</MenuItem>
              <MenuItem value="Nữ">Nữ</MenuItem>
            </Select>
          </FormControl>
            <TextField
              label="Mật khẩu"
              type="password"
              value={teacherInfo.password}
              onChange={this.handleInputChange("password")}
              fullWidth
            />
          </Box>

          <Box mt={3} display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Lưu thông tin
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={this.handleBack}
            >
              Quay lại
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(ThemThongTinGiangVien);
