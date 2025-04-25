import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import axios from "axios";

class ThemThongTinSinhVien extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {
        mssv: "",
        name_sinhvien: "",
        lop_sinhvien: "",
        gioitinh_sinhvien: "",
        ngaysinh_sinhvien: "",
        diachi_sinhvien: "",
        email_sinhvien: "",
        sdt_sinhvien: "",
        password_sinhvien: "",
      },
      error: null,
    };
  }

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

  handleChange = (field) => (event) => {
    this.setState({
      student: {
        ...this.state.student,
        [field]: event.target.value,
      },
    });
  };

  handleSave = async () => {
    try {
      const token = localStorage.getItem("token"); // Sử dụng key "token"
      if (!token) {
        console.log("Token không tồn tại, chuyển hướng về đăng nhập");
        this.props.navigate("/AdminLogin");
        return;
      }

      const { student } = this.state;
      const response = await axios.post(
        "https://webdiemdanh-1.onrender.com/api/admin/themsinhvien", // Cập nhật URL API
        {
          mssv: student.mssv,
          name_sinhvien: student.name_sinhvien,
          sdt_sinhvien: student.sdt_sinhvien,
          email_sinhvien: student.email_sinhvien,
          password_sinhvien: student.password_sinhvien,
          diachi_sinhvien: student.diachi_sinhvien,
          gioitinh_sinhvien: student.gioitinh_sinhvien,
          ngaysinh_sinhvien: student.ngaysinh_sinhvien,
          lop_sinhvien: student.lop_sinhvien,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Thêm sinh viên thành công:", response.data);
      this.props.navigate("/QuanLySinhVien");
    } catch (error) {
      console.error("Lỗi khi thêm sinh viên:", error.response);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        this.props.navigate("/login");
      }
      this.setState({
        error: error.response?.data?.message || "Không thể thêm sinh viên",
      });
    }
  };

  render() {
    const { student, error } = this.state;
    const menuItems = [
      { text: "Quản lý User", icon: <PersonIcon fontSize="large" /> },
      { text: "Quản lý lớp học", icon: <AssignmentIcon fontSize="large" /> },
      { text: "Quản lý lịch học", icon: <QrCodeScannerIcon fontSize="large" /> },
      { text: "Quản lý Môn Học", icon: <MenuBookIcon fontSize="large" /> },
    ];

    return (
      <Box display="flex" height="100vh">
        {/* Sidebar */}
        <Box width={240} bgcolor="primary.main" p={2}>
          <Box component="img" src={logo} width="100%" mb={4} />
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => this.handleMenuClick(item.text)}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "white" }} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Content */}
        <Container sx={{ flex: 1, p: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Thêm thông tin sinh viên
          </Typography>

          {error && <Typography color="error">{error}</Typography>}

          <Paper elevation={3} sx={{ p: 3 }}>
            <Grid container spacing={4}>
              {/* Left column */}
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Mã sinh viên"
                      value={student.mssv}
                      onChange={this.handleChange("mssv")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Họ và tên"
                      value={student.name_sinhvien}
                      onChange={this.handleChange("name_sinhvien")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Tên lớp"
                      value={student.lop_sinhvien}
                      onChange={this.handleChange("lop_sinhvien")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Giới tính</InputLabel>
                      <Select
                        value={student.gioitinh_sinhvien}
                        label="Giới tính"
                        onChange={this.handleChange("gioitinh_sinhvien")}
                      >
                        <MenuItem value="Nam">Nam</MenuItem>
                        <MenuItem value="Nữ">Nữ</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Ngày sinh"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={student.ngaysinh_sinhvien}
                      onChange={this.handleChange("ngaysinh_sinhvien")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Địa chỉ"
                      value={student.diachi_sinhvien}
                      onChange={this.handleChange("diachi_sinhvien")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={student.email_sinhvien}
                      onChange={this.handleChange("email_sinhvien")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      value={student.sdt_sinhvien}
                      onChange={this.handleChange("sdt_sinhvien")}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Right column */}
              <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Mật khẩu"
                      type="password"
                      value={student.password_sinhvien}
                      onChange={this.handleChange("password_sinhvien")}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Buttons */}
            <Box mt={4} display="flex" gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSave}
              >
                Lưu thay đổi
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => this.props.navigate("/QuanLySinhVien")}
              >
                Quay lại
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(ThemThongTinSinhVien);