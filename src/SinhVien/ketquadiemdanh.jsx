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
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout"; 

class KetQuaDiemDanh extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubject: null,
      attendanceRecords: [],
      error: null,
    };
  }

  componentDidMount() {
    const sinhVien = JSON.parse(localStorage.getItem("sinhVien"));
    const token = localStorage.getItem("token");

    if (!sinhVien || !token) {
      this.props.navigate("/");
      return;
    }

    this.fetchAttendanceRecords(token);
  }

  fetchAttendanceRecords = async (token) => {
    try {
      const response = await axios.get(
        "https://webdiemdanh-1.onrender.com/api/ketquadiemdanh",
        {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        // Chuyển đổi dữ liệu từ API thành định dạng phù hợp
        const records = response.data.data.reduce((acc, record) => {
          // Sử dụng name_monhoc từ mon_hoc
          const subject = record.mon_hoc?.name_monhoc || `Môn học ${record.id_monhoc}`;
          const date = record.buoi_hoc.ngayhoc;
          const student = {
            id: record.sinh_vien.mssv,
            name: record.sinh_vien.name_sinhvien,
            status: record.trangthai_diemdanh ? "Có mặt" : "Vắng mặt",
          };

          // Tìm xem đã có bản ghi cho môn học và ngày này chưa
          const existingRecord = acc.find(
            (r) => r.subject === subject && r.date === date
          );

          if (existingRecord) {
            existingRecord.students.push(student);
          } else {
            acc.push({
              subject,
              date,
              students: [student],
            });
          }

          return acc;
        }, []);

        this.setState({ attendanceRecords: records, error: null });
      } else {
        this.setState({ error: response.data.message || "Không thể lấy kết quả điểm danh" });
      }
    } catch (error) {
      console.error("Lỗi khi lấy kết quả điểm danh:", error.response || error.message);
      this.setState({
        error: error.response?.data?.message || "Không thể lấy kết quả điểm danh. Vui lòng thử lại.",
      });

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("sinhVien");
        this.props.navigate("/");
      }
    }
  };

  handleViewDetails = (subject) => {
    this.setState({ selectedSubject: subject });
  };
  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("sinhVien");
    this.props.navigate("/");
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

  render() {
    const { selectedSubject, attendanceRecords, error } = this.state;

    const menuItems = [
      { text: "Thông tin cá nhân", icon: <PersonIcon fontSize="large" /> },
      { text: "Thời khóa biểu", icon: <CalendarMonthIcon fontSize="large" /> },
      { text: "Kết quả điểm danh", icon: <AssignmentIcon fontSize="large" /> },
      { text: "Quét Mã điểm danh", icon: <QrCodeIcon fontSize="large" /> },
      { text: "Đăng xuất", icon: <LogoutIcon fontSize="large" /> },
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

          {error && (
            <Typography color="error" mb={2} textAlign="center">
              {error}
            </Typography>
          )}

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
                  {attendanceRecords.length > 0 ? (
                    attendanceRecords.map((record, index) => (
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
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        Chưa có dữ liệu điểm danh
                      </TableCell>
                    </TableRow>
                  )}
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