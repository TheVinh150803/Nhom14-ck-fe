import React, { Component } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";

import {
  Box,
  Button,
  Checkbox,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

class QuanLySinhVien extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [
        {
          id: "SV01",
          name: "Nguyễn Văn A",
          className: "CTK42A",
          gender: "Nam",
          birthday: "01/01/2000",
          address: "123 Lê Lợi, Đà Nẵng",
          phone: "0912345678",
          email: "vana@example.com",
        },
      ],
      selectedStudentId: null,
    };
  }

  handleMenuClick = (text) => {
    if (text === "Quản lý User") {
      this.props.navigate("/quanlysinhvien");
    } else if (text === "Quản lý lớp học") {
      this.props.navigate("/quanlylophoc");
    } else if (text === "Danh sách môn học") {
      this.props.navigate("/danhsachmonhoc");
    }
  };

  handleCheckboxChange = (id) => {
    this.setState({
      selectedStudentId: this.state.selectedStudentId === id ? null : id,
    });
  };

  render() {
    const menuItems = [
      { text: "Quản lý User", icon: <PersonIcon fontSize="large" /> },
      { text: "Quản lý lớp học", icon: <AssignmentIcon fontSize="large" /> },
      {
        text: "Danh sách môn học",
        icon: <QrCodeScannerIcon fontSize="large" />,
      },
    ];

    const { students, selectedStudentId } = this.state;

    return (
      <Box display="flex" height="100vh">
        {/* Sidebar */}
        <Box width={240} bgcolor="primary.main" p={2}>
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
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Quản lý sinh viên
          </Typography>

          {/* Tabs */}
          <Box display="flex" gap={2} mb={2}>
            <Button
              variant="outlined"
              onClick={() => this.props.navigate("/quanlygiangvien")}
            >
              Quản lý giảng viên
            </Button>
            <Button variant="contained">Quản lý sinh viên</Button>
          </Box>

          {/* Table */}
          <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#ccc" }}>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <b>Mã sinh viên</b>
                  </TableCell>
                  <TableCell>
                    <b>Tên sinh viên</b>
                  </TableCell>
                  <TableCell>
                    <b>Tên lớp</b>
                  </TableCell>
                  <TableCell>
                    <b>Giới tính</b>
                  </TableCell>
                  <TableCell>
                    <b>Ngày sinh</b>
                  </TableCell>
                  <TableCell>
                    <b>Địa chỉ</b>
                  </TableCell>
                  <TableCell>
                    <b>Số điện thoại</b>
                  </TableCell>
                  <TableCell>
                    <b>Email</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedStudentId === student.id}
                        onChange={() => this.handleCheckboxChange(student.id)}
                      />
                    </TableCell>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.className}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>{student.birthday}</TableCell>
                    <TableCell>{student.address}</TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>{student.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Action buttons */}
          <Box mt={3} display="flex" gap={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => this.props.navigate("/ThemThongTinSinhVien")}
              disabled={selectedStudentId !== null}
            >
              Thêm sinh viên
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!selectedStudentId}
              onClick={() => this.props.navigate("/ChinhSuaThongTinSinhVien")}
            >
              Thay đổi
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(QuanLySinhVien);
