import React, { Component } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeIcon from "@mui/icons-material/QrCode";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import logo from "../img/logo.jpg";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
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
      className: "",
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

  render() {
    const formFields = [
      { id: "studentId", label: "Mã Sinh Viên:" },
      { id: "fullName", label: "Họ và Tên:" },
      { id: "className", label: "Tên Lớp:" },
      { id: "birthDate", label: "Ngày Sinh:" },
      { id: "gender", label: "Giới Tính:" },
      { id: "address", label: "Địa Chỉ:" },
      { id: "email", label: "Email:" },
      { id: "phone", label: "Số điện thoại:" },
    ];

    const menuItems = [
      { text: "Thông tin cá nhân", icon: <PersonIcon fontSize="large" /> },
      { text: "Thời khóa biểu", icon: <CalendarMonthIcon fontSize="large" /> },
      { text: "Kết quả điểm danh", icon: <AssignmentIcon fontSize="large" /> },
      { text: "Quét Mã điểm danh", icon: <QrCodeIcon fontSize="large" /> },
      { text: "QR điểm danh", icon: <QrCodeScannerIcon fontSize="large" /> },

    ];

    return (
      <Box display="flex" height="100vh">
        {/* Sidebar */}
        <Box width={240} bgcolor="primary.main" p={2}>
          <Box component="img" src={logo} width="100%" mb={4} />
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index}>
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "white" }} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Content */}
        <Container sx={{ flex: 1, p: 4 }}>
          <Typography variant="h4" textAlign="center" mb={2}>Thông Tin Cá Nhân</Typography>
          <Divider sx={{ mb: 3 }} />

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
              />
            ))}
          </Stack>

          <Box display="flex" justifyContent="center" mt={3}>
            <Button variant="contained" color="secondary">Sửa</Button>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default ThongTinCaNhan;
