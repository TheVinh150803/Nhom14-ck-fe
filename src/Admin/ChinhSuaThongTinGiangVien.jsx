import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";

class ChinhSuaThongTinGiangVien extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeacher: "",
      teacherInfo: {
        id: "",
        name: "",
        phone: "",
        email: "",
        username: "",
        password: "",
      },
      teachers: [
        {
          id: "GV01",
          name: "Giảng viên 1",
          phone: "0933271900",
          email: "gv1@gmail.com",
          username: "gv1",
          password: "123456",
        },
      ],
    };
  }

  handleSelectChange = (event) => {
    const selectedName = event.target.value;
    const teacher = this.state.teachers.find((t) => t.name === selectedName);
    this.setState({
      selectedTeacher: selectedName,
      teacherInfo: teacher || {},
    });
  };

  handleInputChange = (field) => (event) => {
    this.setState({
      teacherInfo: {
        ...this.state.teacherInfo,
        [field]: event.target.value,
      },
    });
  };

  handleMenuClick = (text) => {
    if (text === "Quản lý lớp học") {
      this.props.navigate("/QuanLyLopHoc");
    } else if (text === "Danh sách môn học") {
      this.props.navigate("/DanhSachMonHoc");
    } else if (text === "Quản lý User") {
      this.props.navigate("/QuanLyGiangVien");
    }
  };

  handleUpdate = () => {
    // TODO: Gửi thông tin lên backend nếu cần
    this.props.navigate("/QuanLyGiangVien");
  };

  render() {
    const { teacherInfo, selectedTeacher, teachers } = this.state;

    const menuItems = [
      { text: "Quản lý User", icon: <PersonIcon fontSize="large" /> },
      { text: "Quản lý lớp học", icon: <AssignmentIcon fontSize="large" /> },
      {
        text: "Danh sách môn học",
        icon: <QrCodeScannerIcon fontSize="large" />,
      },
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
            Chỉnh sửa thông tin giảng viên
          </Typography>

          <Box display="flex" flexDirection="column" gap={2} maxWidth={500}>
            <TextField
              label="Mã giảng viên"
              value={teacherInfo.id}
              onChange={this.handleInputChange("id")}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Tên giảng viên</InputLabel>
              <Select
                value={selectedTeacher}
                label="Tên giảng viên"
                onChange={this.handleSelectChange}
              >
                {teachers.map((teacher, index) => (
                  <MenuItem key={index} value={teacher.name}>
                    {teacher.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              label="Tài khoản"
              value={teacherInfo.username}
              onChange={this.handleInputChange("username")}
              fullWidth
            />
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
              onClick={this.handleUpdate}
            >
              Thay đổi
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(ChinhSuaThongTinGiangVien);
