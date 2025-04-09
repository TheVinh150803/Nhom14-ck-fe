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

class ThemThongTinSinhVien extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {
        id: "SV01",
        username: "sv01",
        name: "Nguyễn Văn A",
        password: "password123",
        className: "CTK42A",
        birthday: "2000-01-01",
        gender: "Nam",
        address: "123 Lê Lợi, Đà Nẵng",
        email: "vana@example.com",
        phone: "0912345678",
      },
    };
  }

  handleMenuClick = (text) => {
    if (text === "Quản lý User") {
      this.props.navigate("/QuanLyGiangVien");
    } else if (text === "Quản lý lớp học") {
      this.props.navigate("/QuanLyLopHoc");
    } else if (text === "Danh sách môn học") {
      this.props.navigate("/DanhSachMonHoc");
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

  handleSave = () => {
    // Lưu dữ liệu nếu cần xử lý thêm tại đây
    this.props.navigate("/QuanLySinhVien");
  };

  render() {
    const { student } = this.state;
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

          <Paper elevation={3} sx={{ p: 3 }}>
            <Grid container spacing={4}>
              {/* Left column */}
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Mã sinh viên"
                      value={student.id}
                      onChange={this.handleChange("id")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Họ và tên"
                      value={student.name}
                      onChange={this.handleChange("name")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Tên lớp"
                      value={student.className}
                      onChange={this.handleChange("className")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Giới tính</InputLabel>
                      <Select
                        value={student.gender}
                        label="Giới tính"
                        onChange={this.handleChange("gender")}
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
                      value={student.birthday}
                      onChange={this.handleChange("birthday")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Địa chỉ"
                      value={student.address}
                      onChange={this.handleChange("address")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={student.email}
                      onChange={this.handleChange("email")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      value={student.phone}
                      onChange={this.handleChange("phone")}
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
                      label="Tài khoản"
                      value={student.username}
                      onChange={this.handleChange("username")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Mật khẩu"
                      type="password"
                      value={student.password}
                      onChange={this.handleChange("password")}
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
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(ThemThongTinSinhVien);
