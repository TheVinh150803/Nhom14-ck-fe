import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeIcon from "@mui/icons-material/QrCode";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
class DiemDanhGV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      semester: "Học kỳ 2 năm học 2025 - 2026",
      attendanceDate: "2025-03-19",
      selectedClass: "",
      students: [
        { id: 1, mssv: "DH52112086", name: "Nguyễn Trần Thế Vinh", class: "DH21_TH12", coPhep: "" },
        { id: 2, mssv: "DH52152145", name: "Huỳnh Đại Thắng", class: "DH21_TH12", coPhep: "" },
        { id: 3, mssv: "DH52112086", name: "Nguyễn Nhật Phi", class: "DH21_TH12", coPhep: "" },
        { id: 4, mssv: "DH52111467", name: "Huỳnh Tấn Phát", class: "DH21_TH12", coPhep: "" },
        { id: 5, mssv: "DH52111469", name: "Lê Thành Phát", class: "DH21_TH12", coPhep: "" },
        { id: 6, mssv: "DH52111506", name: "Nguyễn Anh Phú", class: "DH21_TH12", coPhep: "" },
      ],
    };
  }


  handleMenuClick = (text) => {
    if (text === "Thông Tin Giảng Viên") {
      this.props.navigate("/thongtinGV");
    }
    else if (text === "Homepage") {
        this.props.navigate("/homepage");
      }
    else if (text === "Lịch giảng dạy") {
      this.props.navigate("/lichgiangday");
    }
     else if (text === "Điểm Danh") {
      this.props.navigate("/diemdanh");
    } else if (text === "Xem Kết Quả Điểm Danh") {
      this.props.navigate("/KQDiemDanh");
    } else if (text === "Tra cứu Sinh Viên") {
      this.props.navigate("/tracuu");
    }
    else if (text === "Đăng Xuất") {
      this.props.navigate("/");
    }
  };


  handleAttendanceChange = (id, value) => {
    this.setState(prevState => ({
      students: prevState.students.map(student =>
        student.id === id ? { ...student, coPhep: value } : student
      ),
    }));
  };


  handleStatusChange = (id, value) => {
    this.setState(prevState => ({
      students: prevState.students.map(student =>
        student.id === id ? { ...student, status: value } : student
      ),
    }));
  };


  render() {
    const { semester, attendanceDate, selectedClass, students } = this.state;


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
        <Box display="flex" height="110vh" bgcolor="#f4f6f8">
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
        <Box
          flex={1}
          bgcolor="white"
          p={4}
          sx={{ borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
        >
          <Container maxWidth="md">
            {/* Greeting Text */}
            <Box textAlign="center" mb={5}>
              <Typography variant="h4" fontWeight={600} color="primary" gutterBottom>
                Chào mừng bạn đến với hệ thống quản lý giảng viên và sinh viên!
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, fontSize: "16px", color: "#555" }}>
                Đây là nơi bạn có thể quản lý thông tin giảng viên, tra cứu sinh viên, điểm danh và nhiều tính năng hữu ích khác.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    );
  }
}


export default withNavigation(DiemDanhGV);
