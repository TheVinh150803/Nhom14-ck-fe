import React, { Component } from "react";
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QrCodeIcon from "@mui/icons-material/QrCode";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";

class QuetMaQR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSemester: "HK1",
      schedule: [
        {
          id: "CS030319",
          subject: "Thực Hành Lập Trình Web",
          namhoc: 19,
          sotiet: 30,
          tietbatdau: 10,
          tietketthuc: 12,
          phong: "PM05",
          giangvien: "Nguyễn Trọng Nghĩa",
          thoigian: "2024-10-07 - 2024-12-15",
        },
      ],
    };
  }

  handleMenuClick = (text) => {
    switch (text) {
      case "Quét Mã điểm danh":
        this.props.navigate("/quetmaqr");
        break;
      case "Thông tin cá nhân":
        this.props.navigate("/thongtinSV");
        break;
      case "Thời khóa biểu":
        this.props.navigate("/thoikhoabieu");
        break;
      case "Kết quả điểm danh":
        this.props.navigate("/ketquadiemdanh");
        break;
      default:
        console.log("Không tìm thấy trang!");
    }
  };

  render() {
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
        <Box width={240} bgcolor="primary.main" p={2} color="white">
          <Box component="img" src={logo} width="100%" mb={4} />
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => this.handleMenuClick(item.text)} // 🔥 Đã thêm sự kiện onClick
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "white" }} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Content */}
        <Container sx={{ flex: 1, p: 4 }}>
          <Typography variant="h4" textAlign="center" mb={2}>
            Quét Mã Điểm Danh
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box display="flex" justifyContent="center" mt={3}>
            <Button variant="contained" color="secondary">Bật Camera</Button>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(QuetMaQR);
