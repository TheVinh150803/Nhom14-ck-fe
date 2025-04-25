import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
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

class ChinhSuaThongTinSinhVien extends Component {
  constructor(props) {
    super(props);

    console.log("ChinhSuaThongTinSinhVien props:", props);
    console.log("Location state:", props.location?.state);

    const studentData = props.location?.state?.student || {
      id_sinhvien: "",
      mssv: "",
      name_sinhvien: "",
      lop_sinhvien: "",
      gioitinh_sinhvien: "",
      ngaysinh_sinhvien: "",
      diachi_sinhvien: "",
      email_sinhvien: "",
      sdt_sinhvien: "",
      password_sinhvien: "",
    };

    console.log("Received student data:", studentData);

    if (!props.location?.state?.student) {
      alert("Không có dữ liệu sinh viên để chỉnh sửa. Vui lòng chọn lại.");
      this.props.navigate("/QuanLySinhVien");
    }

    this.state = {
      student: studentData,
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

  handleInputChange = (field) => (event) => {
    this.setState({
      student: {
        ...this.state.student,
        [field]: event.target.value,
      },
      error: null, // Xóa lỗi khi người dùng nhập
    });
  };

  handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, please login first");
        this.props.navigate("/AdminLogin");
        return;
      }

      const { student } = this.state;
      const payload = {
        mssv: student.mssv,
        name_sinhvien: student.name_sinhvien,
        sdt_sinhvien: student.sdt_sinhvien,
        email_sinhvien: student.email_sinhvien,
        password_sinhvien: student.password_sinhvien || undefined, // Gửi plain text, backend sẽ mã hóa bằng Hash::make
        diachi_sinhvien: student.diachi_sinhvien,
        gioitinh_sinhvien: student.gioitinh_sinhvien,
        ngaysinh_sinhvien: student.ngaysinh_sinhvien,
        lop_sinhvien: student.lop_sinhvien,
      };

      const response = await axios.put(
        `https://webdiemdanh-1.onrender.com/api/admin/capnhatsinhvien/${student.id_sinhvien}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Cập nhật sinh viên thành công:", response.data);
      alert("Cập nhật thông tin sinh viên thành công!");
      this.props.navigate("/QuanLySinhVien");
    } catch (error) {
      console.error("Lỗi khi cập nhật sinh viên:", error.response);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        this.props.navigate("/AdminLogin");
      }
      const errorMessage =
        error.response?.data?.message ||
        Object.values(error.response?.data?.errors || {}).flat().join(", ") ||
        "Cập nhật thông tin sinh viên thất bại. Vui lòng thử lại!";
      this.setState({ error: errorMessage });
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

        <Container sx={{ flex: 1, p: 4 }}>
          <Typography variant="h6" mb={2}>
            Chỉnh sửa thông tin sinh viên
          </Typography>

          {error && (
            <Typography color="error" mb={2}>
              {error}
            </Typography>
          )}

          <Box display="flex" flexDirection="column" gap={2} maxWidth={500}>
            <TextField
              label="ID Sinh viên"
              value={student.id_sinhvien || ""}
              onChange={this.handleInputChange("id_sinhvien")}
              fullWidth
              disabled
            />
            <TextField
              label="Mã sinh viên"
              value={student.mssv || ""}
              onChange={this.handleInputChange("mssv")}
              fullWidth
              disabled
              required
            />
            <TextField
              label="Tên sinh viên"
              value={student.name_sinhvien || ""}
              onChange={this.handleInputChange("name_sinhvien")}
              fullWidth
              required
            />
            <TextField
              label="Tên lớp"
              value={student.lop_sinhvien || ""}
              onChange={this.handleInputChange("lop_sinhvien")}
              fullWidth
              required
            />
            <TextField
              label="Số điện thoại"
              value={student.sdt_sinhvien || ""}
              onChange={this.handleInputChange("sdt_sinhvien")}
              fullWidth
              required
            />
            <TextField
              label="Email"
              value={student.email_sinhvien || ""}
              onChange={this.handleInputChange("email_sinhvien")}
              fullWidth
              required
            />
            <TextField
              label="Địa chỉ"
              value={student.diachi_sinhvien || ""}
              onChange={this.handleInputChange("diachi_sinhvien")}
              fullWidth
            />
            <TextField
              label="Ngày sinh"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={student.ngaysinh_sinhvien || ""}
              onChange={this.handleInputChange("ngaysinh_sinhvien")}
              fullWidth
              required
            />
            <FormControl fullWidth>
              <InputLabel>Giới tính</InputLabel>
              <Select
                value={student.gioitinh_sinhvien || ""}
                onChange={this.handleInputChange("gioitinh_sinhvien")}
              >
                <MenuItem value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
              </Select>
            </FormControl>

          </Box>

          <Box mt={3} display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleUpdate}
            >
              Lưu thông tin
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.props.navigate("/QuanLySinhVien")}
            >
              Quay lại
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(ChinhSuaThongTinSinhVien);