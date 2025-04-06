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
    // else if (text === "Lịch giảng dạy") {
    //   this.props.navigate("/lichgiangday");
    // }
     else if (text === "Điểm Danh") {
      this.props.navigate("/diemdanh");
    } else if (text === "Xem Kết Quả Điểm Danh") {
      this.props.navigate("/KQDiemDanh");
    } else if (text === "Tra cứu Sinh Viên") {
      this.props.navigate("/tracuu");
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
      { text: "Thông Tin Giảng Viên", icon: <PersonIcon fontSize="large" /> },
      { text: "Lịch giảng dạy", icon: <CalendarMonthIcon fontSize="large" /> },
      { text: "Điểm Danh", icon: <QrCodeIcon fontSize="large" /> },
      { text: "Xem Kết Quả Điểm Danh", icon: <AssignmentIcon fontSize="large" /> },
      { text: "Tra cứu Sinh Viên", icon: <QrCodeScannerIcon fontSize="large" /> },
    ];

    return (
      <Box display="flex" height="100vh" bgcolor="#f4f6f8">
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

            {/* Lớp học phần */}
            <FormControl fullWidth>
              <InputLabel>Chọn lớp học phần</InputLabel>
              <Select
                value={selectedClass}
                onChange={(e) => this.setState({ selectedClass: e.target.value })}
                label="Chọn lớp học phần"
              >
                <MenuItem value="DH21_TH12">DH21_TH12</MenuItem>
                <MenuItem value="DH21_TH13">DH21_TH13</MenuItem>
                <MenuItem value="DH21_TH14">DH21_TH14</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" sx={{ whiteSpace: "nowrap" }}>
              Tìm Kiếm
            </Button>
          </Stack>

          {/* Nhóm Tiết */}
          <Stack direction="row" spacing={1} mb={2}>
            {["Nhóm 5", "Nhóm 1", "Nhóm 2", "Nhóm 3", "Nhóm 4"].map((group, idx) => (
              <Button key={idx} variant="outlined">{`${group} - Tiết 1 ➝ 5`}</Button>
            ))}
          </Stack>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} mb={2}>
            <Button variant="contained" color="primary">
              Lưu Điểm Danh
            </Button>
            <Button variant="contained" color="error">
              QR Điểm Danh
            </Button>
            <Button variant="contained" color="success">
              Quét Mã
            </Button>
          </Stack>

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
                  <TableCell>Có Phép</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow key={student.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Select
                        size="small"
                        value={student.status || ""}
                        onChange={(e) => this.handleStatusChange(student.id, e.target.value)}
                      >
                        <MenuItem value="Có mặt">Có mặt</MenuItem>
                        <MenuItem value="Vắng">Vắng</MenuItem>
                        <MenuItem value="Trễ">Trễ</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>{student.mssv}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>
                      <Select
                        size="small"
                        value={student.coPhep || ""}
                        onChange={(e) => this.handleAttendanceChange(student.id, e.target.value)}
                      >
                        <MenuItem value="Có">Có</MenuItem>
                        <MenuItem value="Không">Không</MenuItem>
                      </Select>
                    </TableCell>
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
