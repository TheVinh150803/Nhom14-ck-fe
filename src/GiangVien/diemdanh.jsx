import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
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
  Dialog,
  Checkbox,
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
import axios from "axios";

class DiemDanhGV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      semester: "Học kỳ 2 năm học 2025 - 2026",
      attendanceDate: "2025-03-19",
      selectedClass: "",
      students: [
        { id: 1, mssv: "DH52112086", name: "Nguyễn Trần Thế Vinh", class: "DH21_TH12", status: "" },
        { id: 2, mssv: "DH52152145", name: "Huỳnh Đại Thắng", class: "DH21_TH12", status: "" },
        { id: 3, mssv: "DH52112086", name: "Nguyễn Nhật Phi", class: "DH21_TH12", status: "" },
        { id: 4, mssv: "DH52111467", name: "Huỳnh Tấn Phát", class: "DH21_TH12", status: "" },
        { id: 5, mssv: "DH52111469", name: "Lê Thành Phát", class: "DH21_TH12", status: "" },
        { id: 6, mssv: "DH52111506", name: "Nguyễn Anh Phú", class: "DH21_TH12", status: "" },
      ],
      qrCodeData: null,
      isLoadingQRCode: false,
      openQRCodeDialog: false,
    };
  }

  handleMenuClick = (text) => {
    const routes = {
      "Thông Tin Giảng Viên": "/thongtinGV",
      "Homepage": "/homepage",
      "Lịch giảng dạy": "/lichgiangday",
      "Điểm Danh": "/diemdanh",
      "Xem Kết Quả Điểm Danh": "/KQDiemDanh",
      "Tra cứu Sinh Viên": "/tracuu",
      "Đăng Xuất": "/",
    };
    if (routes[text]) this.props.navigate(routes[text]);
  };

  handleStatusChange = (id, value) => {
    this.setState((prevState) => ({
      students: prevState.students.map((student) =>
        student.id === id ? { ...student, status: value } : student
      ),
    }));
  };

  handleGenerateQRCode = async () => {
    const { selectedClass } = this.state;
    if (!selectedClass) {
      alert("Vui lòng chọn lớp học phần trước khi tạo mã QR.");
      return;
    }

    this.setState({ isLoadingQRCode: true, qrCodeData: null });

    try {
      const response = await axios.get(
        `https://webdiemdanh-1.onrender.com/api/diemdanh/tao-qrcode/${selectedClass}`,
        { headers: { Accept: "image/svg+xml" } }
      );
      this.setState({ qrCodeData: response.data, openQRCodeDialog: true });
    } catch (error) {
      console.error("Lỗi tạo mã QR:", error);
      alert("Không thể tạo mã QR. Vui lòng thử lại.");
    } finally {
      this.setState({ isLoadingQRCode: false });
    }
  };

  handleOpenQRCodeDialog = () => {
    this.setState({ openQRCodeDialog: true });
  };

  handleCloseQRCodeDialog = () => {
    this.setState({ openQRCodeDialog: false });
  };

  render() {
    const {
      semester,
      attendanceDate,
      selectedClass,
      students,
      qrCodeData,
      isLoadingQRCode,
      openQRCodeDialog,
    } = this.state;

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
        <Container sx={{ flex: 1, py: 4 }}>
          <Typography variant="h5" fontWeight={600} mb={2}>
            Điểm Danh
          </Typography>

          {/* Filters */}
          <Stack direction="row" spacing={2} mb={2}>
            <FormControl fullWidth>
              <InputLabel>Chọn đợt</InputLabel>
              <Select value={semester} label="Chọn đợt">
                <MenuItem value={semester}>{semester}</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Ngày Điểm Danh"
              type="date"
              value={attendanceDate}
              onChange={(e) => this.setState({ attendanceDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth>
              <InputLabel>Chọn lớp học phần</InputLabel>
              <Select
                value={selectedClass}
                onChange={(e) => this.setState({ selectedClass: e.target.value })}
                label="Chọn lớp học phần"
              >
                <MenuItem value="1">XDPMW nhóm 1 tiết 1-5</MenuItem>
                <MenuItem value="2">XDPMW nhóm 2 tiết 1-5</MenuItem>
                <MenuItem value="3">XDPMW nhóm 4 tiết 1-5</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} mb={2}>
            <Button variant="contained" color="primary">
              Lưu Điểm Danh
            </Button>
            <Button variant="contained" color="error" onClick={this.handleGenerateQRCode}>
              QR Điểm Danh
            </Button>
            <Button variant="contained" color="success">
              Quét Mã
            </Button>
          </Stack>

          {/* QR Dialog */}
          <Dialog
            open={openQRCodeDialog}
            onClose={this.handleCloseQRCodeDialog}
            maxWidth="sm"
            fullWidth
          >
            <Box p={3} display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h6" mb={2}>
                Mã QR Điểm Danh
              </Typography>
              {isLoadingQRCode ? (
                <Typography>Đang tạo mã QR...</Typography>
              ) : qrCodeData ? (
                <div dangerouslySetInnerHTML={{ __html: qrCodeData }} />
              ) : (
                <Typography>Lỗi tạo mã QR.</Typography>
              )}
              <Button onClick={this.handleCloseQRCodeDialog} sx={{ mt: 2 }} variant="contained">
                Đóng
              </Button>
            </Box>
          </Dialog>

          {/* Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Điểm Danh</TableCell>
                  <TableCell>MSSV</TableCell>
                  <TableCell>Họ Tên</TableCell>
                  <TableCell>Lớp Học</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow key={student.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={student.status === "Có mặt"}
                        onChange={(e) =>
                          this.handleStatusChange(student.id, e.target.checked ? "Có mặt" : "Vắng")
                        }
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>{student.mssv}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.class}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(DiemDanhGV);
