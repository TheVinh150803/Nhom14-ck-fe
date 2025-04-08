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
import withNavigation from "./withNavigation"; // 👈 Thêm dòng này
import LogoutIcon from "@mui/icons-material/Logout";
class KetQuaDiemDanh extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubject: null,
      attendanceRecords: [
        {
          subject: "Thực Hành Lập Trình Web",
          date: "2024-03-28",
          students: [
            { id: "SV001", name: "Nguyễn Văn A", status: "Có mặt" },
            { id: "SV002", name: "Trần Thị B", status: "Vắng mặt" },
          ],
        },
        {
          subject: "Xây Dựng Phần Mềm Web",
          date: "2024-03-28",
          students: [
            { id: "SV003", name: "Lê Văn C", status: "Có mặt" },
            { id: "SV004", name: "Phạm Thị D", status: "Có mặt" },
          ],
        },
      ],
    };
  }

  handleViewDetails = (subject) => {
    this.setState({ selectedSubject: subject });
  };

  handleMenuClick = (text) => {
    if (text === "Quét Mã điểm danh") {
      console.log("Quét Mã điểm danh clicked");
      this.props.navigate("/quetmaqr");
    }else if (text === "QR điểm danh") {
      this.props.navigate("/maqrdiemdanh");
    } 
    else if (text === "Thông tin cá nhân") {
      console.log("Thông tin cá nhân clicked");
      this.props.navigate("/thongtinSV");
    } else if (text === "Thời khóa biểu") {
      console.log("Thời khóa biểu clicked");
      this.props.navigate("/thoikhoabieu");
    }
    else if (text === "Kết quả điểm danh") {
      console.log("Kết quả điểm danh clicked");
      this.props.navigate("/ketquadiemdanh");
    }
    else if (text === "Đăng Xuất") {
      this.props.navigate("/");
    }
  };
  

  render() {
    const { selectedSubject, attendanceRecords } = this.state;

    const menuItems = [
      { text: "Thông tin cá nhân", icon: <PersonIcon fontSize="large" /> },
      { text: "Thời khóa biểu", icon: <CalendarMonthIcon fontSize="large" /> },
      { text: "Kết quả điểm danh", icon: <AssignmentIcon fontSize="large" /> },
      { text: "Quét Mã điểm danh", icon: <QrCodeIcon fontSize="large" /> },
      { text: "QR điểm danh", icon: <QrCodeScannerIcon fontSize="large" /> },
      { text: "Đăng Xuất", icon: <LogoutIcon fontSize="large" /> },
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
          <Typography variant="h4" textAlign="center" mb={2}>
            Kết Quả Điểm Danh
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {selectedSubject ? (
            <>
              <Typography variant="h6">
                Chi Tiết Điểm Danh - {selectedSubject}
              </Typography>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Mã Sinh Viên</TableCell>
                      <TableCell>Họ Tên</TableCell>
                      <TableCell>Trạng Thái</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendanceRecords
                      .find((record) => record.subject === selectedSubject)
                      .students.map((student, index) => (
                        <TableRow key={index}>
                          <TableCell>{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.status}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => this.setState({ selectedSubject: null })}
              >
                Quay lại
              </Button>
            </>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Môn Học</TableCell>
                    <TableCell>Ngày</TableCell>
                    <TableCell>Chi Tiết</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceRecords.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.subject}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => this.handleViewDetails(record.subject)}
                        >
                          Xem kết quả
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </Box>
    );
  }
}

export default withNavigation(KetQuaDiemDanh);