import React, { Component } from "react";
import { Box, Container, Divider, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QrCodeIcon from "@mui/icons-material/QrCode";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import logo from "../img/logo.jpg";

class ThoiKhoaBieu extends Component {
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

  handleSemesterChange = (event) => {
    this.setState({ selectedSemester: event.target.value });
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
              <ListItem button key={index}>
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "white" }} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Content */}
        <Container sx={{ flex: 1, p: 4 }}>
          <Typography variant="h4" textAlign="center" mb={2}>
            Thời Khóa Biểu Cá Nhân
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {/* Dropdown chọn học kỳ */}
          <Box mb={3}>
            <Select
              value={this.state.selectedSemester}
              onChange={this.handleSemesterChange}
              fullWidth
            >
              <MenuItem value="HK1">TKB học kỳ cá nhân</MenuItem>
              <MenuItem value="HK2">Học kỳ 2</MenuItem>
            </Select>
          </Box>

          {/* Bảng thời khóa biểu */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mã Môn Học</TableCell>
                  <TableCell>Tên Môn Học</TableCell>
                  <TableCell>NMH</TableCell>
                  <TableCell>Số Tiết</TableCell>
                  <TableCell>Tiết Bắt Đầu</TableCell>
                  <TableCell>Tiết Kết Thúc</TableCell>
                  <TableCell>Phòng</TableCell>
                  <TableCell>Giảng Viên</TableCell>
                  <TableCell>Thời Gian</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.schedule.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.subject}</TableCell>
                    <TableCell>{row.namhoc}</TableCell>
                    <TableCell>{row.sotiet}</TableCell>
                    <TableCell>{row.tietbatdau}</TableCell>
                    <TableCell>{row.tietketthuc}</TableCell>
                    <TableCell>{row.phong}</TableCell>
                    <TableCell>{row.giangvien}</TableCell>
                    <TableCell>{row.thoigian}</TableCell>
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

export default ThoiKhoaBieu;