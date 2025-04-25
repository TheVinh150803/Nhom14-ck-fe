import React, { Component } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeIcon from "@mui/icons-material/QrCode";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

class ThongTinCaNhan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: "",
      fullName: "",
      className: "",
      birthDate: "",
      gender: "",
      address: "",
      email: "",
      phone: "",
      isEditing: false,
      error: null,
    };
  }

  componentDidMount() {
    const sinhVien = JSON.parse(localStorage.getItem("sinhVien"));
    if (sinhVien) {
      this.setState({
        studentId: sinhVien.mssv || "",
        fullName: sinhVien.name_sinhvien || "",
        className: sinhVien.lop_sinhvien || "",
        birthDate: sinhVien.ngaysinh_sinhvien || "",
        gender: sinhVien.gioitinh_sinhvien || "",
        address: sinhVien.diachi_sinhvien || "",
        email: sinhVien.email_sinhvien || "",
        phone: sinhVien.sdt_sinhvien || "",
      });
    } else {
      this.props.navigate("/");
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleMenuClick = (text) => {
    if (text === "Quét Mã điểm danh") {
      console.log("Quét Mã điểm danh clicked");
      this.props.navigate("/quetmaqr");
    } else if (text === "Thông tin cá nhân") {
      console.log("Thông tin cá nhân clicked");
      this.props.navigate("/thongtinSV");
    } else if (text === "Thời khóa biểu") {
      console.log("Thời khóa biểu clicked");
      this.props.navigate("/thoikhoabieu");
    } else if (text === "Kết quả điểm danh") {
      console.log("Kết quả điểm danh clicked");
      this.props.navigate("/ketquadiemdanh");
    }else if (text === "Đăng xuất") {
      this.handleLogout();
    }
  };

  // Xử lý khi nhấn nút Sửa/Lưu
  handleEditToggle = async () => {
    if (this.state.isEditing) {
      // Đang ở chế độ chỉnh sửa -> Lưu thông tin
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          this.setState({ error: "Bạn cần đăng nhập lại để tiếp tục" });
          this.props.navigate("/");
          return;
        }

        // Gửi yêu cầu cập nhật thông tin lên API
        const response = await axios.post(
          "https://webdiemdanh-1.onrender.com/api/capnhatSV",
          {
            diachi_sinhvien: this.state.address,
            sdt_sinhvien: this.state.phone,
          },
          {
            headers: {
              "Accept": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === "success") {
          // Cập nhật lại localStorage với thông tin mới
          const updatedSinhVien = {
            ...JSON.parse(localStorage.getItem("sinhVien")),
            diachi_sinhvien: this.state.address,
            sdt_sinhvien: this.state.phone,
          };
          localStorage.setItem("sinhVien", JSON.stringify(updatedSinhVien));

          this.setState({
            isEditing: false,
            error: null,
          });
        } else {
          this.setState({ error: response.data.message || "Không thể cập nhật thông tin" });
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật thông tin:", error.response || error.message);
        this.setState({
          error: error.response?.data?.message || "Không thể cập nhật thông tin. Vui lòng thử lại.",
        });

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("sinhVien");
          this.props.navigate("/");
        }
      }
    } else {
      // Chuyển sang chế độ chỉnh sửa
      this.setState({ isEditing: true, error: null });
    }
  };

  handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.post(
          "", // Nếu có API đăng xuất, thêm URL vào đây
          {},
          {
            headers: {
              "Accept": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Lỗi khi đăng xuất:", error);
      }
    }

    localStorage.removeItem("sinhVien");
    localStorage.removeItem("token");
    this.props.navigate("/");
  };

  render() {
    const formFields = [
      { id: "studentId", label: "Mã Sinh Viên:" },
      { id: "fullName", label: "Họ và Tên:" },
      { id: "className", label: "Tên Lớp:" },
      { id: "birthDate", label: "Ngày Sinh:" },
      { id: "gender", label: "Giới Tính:" },
      { id: "address", label: "Địa Chỉ:", maxLength: 255 },
      { id: "email", label: "Email:" },
      { id: "phone", label: "Số điện thoại:", maxLength: 15 },
    ];

    const menuItems = [
      { text: "Thông tin cá nhân", icon: <PersonIcon fontSize="large" /> },
      { text: "Thời khóa biểu", icon: <CalendarMonthIcon fontSize="large" /> },
      { text: "Kết quả điểm danh", icon: <AssignmentIcon fontSize="large" /> },
      { text: "Quét Mã điểm danh", icon: <QrCodeIcon fontSize="large" /> },
    
       { text: "Đăng xuất", icon: <LogoutIcon fontSize="large" /> },
    ];

    return (
      <Box display="flex" height="115vh">
        {/* Sidebar */}
        <Box width={240} bgcolor="primary.main" p={2}>
          <Box component="img" src={logo} width="100%" mb={4} />
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} onClick={() => this.handleMenuClick(item.text)}>
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "white" }} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Content */}
        <Container sx={{ flex: 1, p: 4 }}>
          <Typography variant="h4" textAlign="center" mb={2}>
            Thông Tin Cá Nhân
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {/* Hiển thị thông báo lỗi nếu có */}
          {this.state.error && (
            <Typography color="error" mb={2} textAlign="center">
              {this.state.error}
            </Typography>
          )}

          <Stack spacing={3} maxWidth={600} mx="auto">
            {formFields.map((field) => (
              <TextField
                key={field.id}
                fullWidth
                id={field.id}
                label={field.label}
                value={this.state[field.id]}
                onChange={this.handleChange}
                variant="outlined"
                disabled={
                  !this.state.isEditing || // Nếu không ở chế độ chỉnh sửa, tất cả đều disabled
                  (field.id !== "address" && field.id !== "phone") // Chỉ cho phép chỉnh sửa address và phone
                }

              />
            ))}
          </Stack>

          <Box display="flex" justifyContent="center" mt={3} gap={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleEditToggle}
            >
              {this.state.isEditing ? "Lưu" : "Sửa"}
            </Button>
        
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(ThongTinCaNhan);