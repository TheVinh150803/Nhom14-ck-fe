import React, { Component } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeIcon from "@mui/icons-material/QrCode";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import HomeIcon from "@mui/icons-material/Home";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";


class LichGiangDayGV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: [],
    };
  }


  componentDidMount() {
    this.fetchSchedule();
  }
  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.navigate("/");
  };
  fetchSchedule = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://webdiemdanh-1.onrender.com/api/giangvien/lichgiangday", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.setState({ schedule: response.data.data });
        })
        .catch((error) => {
          console.error("Error fetching schedule:", error);
        });
    }
  };


  handleMenuClick = async (text) => {
    if (text === "Thông Tin Giảng Viên") {
      this.props.navigate("/thongtinGV");
    } else if (text === "Homepage") {
      this.props.navigate("/homepage");
    } else if (text === "Lịch giảng dạy") {
      this.props.navigate("/lichgiangday");
    } else if (text === "Điểm Danh") {
      this.props.navigate("/diemdanh");
    } else if (text === "Đăng Xuất") {
      this.handleLogout();
    }
  };


  render() {
    const menuItems = [
      { text: "Homepage", icon: <HomeIcon fontSize="large" /> },
      { text: "Thông Tin Giảng Viên", icon: <PersonIcon fontSize="large" /> },
      { text: "Lịch giảng dạy", icon: <CalendarMonthIcon fontSize="large" /> },
      { text: "Điểm Danh", icon: <QrCodeIcon fontSize="large" /> },
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
        <Container sx={{ flex: 1, py: 6 }}>
          <Typography variant="h4" textAlign="center" fontWeight={600} mb={3}>
            Lịch Giảng Dạy
          </Typography>
          <Divider sx={{ mb: 4 }} />


          <Paper elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Mã Môn</strong></TableCell>
                  <TableCell><strong>Tên Môn</strong></TableCell>
                  <TableCell><strong>Tiết Bắt Đầu</strong></TableCell>
                  <TableCell><strong>Tiết Kết Thúc</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.schedule.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.maMon}</TableCell>
                    <TableCell>{row.tenMon}</TableCell>
                    <TableCell>{row.tietBD}</TableCell>
                    <TableCell>{row.tietKT}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Container>
      </Box>
    );
  }
}


export default withNavigation(LichGiangDayGV);





