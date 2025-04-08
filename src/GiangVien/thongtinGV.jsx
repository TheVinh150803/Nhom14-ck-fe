import React, { Component } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeIcon from "@mui/icons-material/QrCode";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";
import HomeIcon from "@mui/icons-material/Home";
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

class ThongTinCaNhan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: "",
      fullName: "",
      birthDate: "",
      gender: "",
      address: "",
      email: "",
      phone: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleMenuClick = (text) => {
    if (text === "Thông Tin Giảng Viên") {
      this.props.navigate("/thongtinGV");
    } 
    if (text === "Homepage") {
      this.props.navigate("/homepage");
    } 
    else if (text === "Lịch giảng dạy") {
      this.props.navigate("/lichgiangday");
    } 
    else if (text === "Điểm Danh") {
      this.props.navigate("/diemdanh");
    } 
    else if (text === "Xem Kết Quả Điểm Danh") {
      this.props.navigate("/KQdiemdanh");
    } 
    else if (text === "Tra cứu Sinh Viên") {
      this.props.navigate("/tracuu");
    }
    else if (text === "Đăng Xuất") {
      this.props.navigate("/");
    }
  };
  

  render() {
    const formFields = [
      { id: "studentId", label: "Mã Giảng Viên:" },
      { id: "fullName", label: "Họ và Tên:" },
      { id: "birthDate", label: "Ngày Sinh:" },
      { id: "gender", label: "Giới Tính:" },
      { id: "address", label: "Địa Chỉ:" },
      { id: "email", label: "Email:" },
      { id: "phone", label: "Số điện thoại:" },
    ];

    const menuItems = [
      { text: "Homepage", icon: <HomeIcon fontSize="large" /> },
      { text: "Thông Tin Giảng Viên", icon: <PersonIcon fontSize="large" /> },
      { text: "Lịch giảng dạy", icon: <CalendarMonthIcon fontSize="large" /> },
      { text: "Điểm Danh", icon: <QrCodeIcon fontSize="large" /> },
      { text: "Xem Kết Quả Điểm Danh", icon: <AssignmentIcon fontSize="large" /> },
      { text: "Tra cứu Sinh Viên", icon: <QrCodeScannerIcon fontSize="large" /> },
      { text: "Đăng Xuất", icon: <LogoutIcon fontSize="large" /> },
    ];

    return (
      <Box display="flex" height="150vh" bgcolor="#f4f6f8">
        {/* Sidebar */}
        <Box width={240} bgcolor="#2c3e50" p={2}>
          <Box component="img" src={logo} width="100%" mb={4} borderRadius={2} />
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => this.handleMenuClick(item.text)}
                sx={{
                  mb: 1,
                  borderRadius: 1,
                  "&:hover": { backgroundColor: "#34495e" },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "white" }} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Content */}
        <Container sx={{ flex: 1, py: 6 }}>
          <Typography variant="h4" textAlign="center" fontWeight={600} mb={3}>
            Thông Tin Giảng Viên
          </Typography>
          <Divider sx={{ mb: 4 }} />

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
                InputLabelProps={{ style: { color: "#333" } }}
                InputProps={{
                  style: {
                    backgroundColor: "#fff",
                  },
                }}
              />
            ))}
          </Stack>

          <Box display="flex" justifyContent="flex-end" mt={4} maxWidth={600} mx="auto">
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                borderRadius: 2,
                boxShadow: 2,
                textTransform: "none",
                px: 4,
              }}
            >
              Chỉnh sửa
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(ThongTinCaNhan);
