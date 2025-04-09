import React, { Component } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
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

class QuanLyGiangVien extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [
        {
          id: "GV01",
          name: "Hoàng Khuê",
          phone: "0933271900",
          email: "dragonnet@gmail.com",
        },
      ],
      selectedRows: [],
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
    this.setState((prevState) => {
      const isSelected = prevState.selectedRows.includes(id);
      const newSelectedRows = isSelected
        ? prevState.selectedRows.filter((item) => item !== id)
        : [...prevState.selectedRows, id];
      return { selectedRows: newSelectedRows };
    });
  };

  handleAddTeacher = () => {
    this.props.navigate("/ThemThongTinGiangVien");
  };

  handleEditTeacher = () => {
    if (this.state.selectedRows.length > 0) {
      this.props.navigate("/ChinhSuaThongTinGiangVien");
    }
  };

  handleQuanLySinhVien = () => {
    this.props.navigate("/QuanLySinhVien");
  };

  render() {
    const { teachers, selectedRows } = this.state;

    const menuItems = [
      { text: "Quản lý User", icon: <PersonIcon fontSize="large" /> },
      { text: "Quản lý lớp học", icon: <AssignmentIcon fontSize="large" /> },
      {
        text: "Danh sách môn học",
        icon: <QrCodeScannerIcon fontSize="large" />,
      },
    ];

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
            Quản lý giảng viên
          </Typography>

          {/* Tabs */}
          <Box display="flex" gap={2} mb={2}>
            <Button variant="contained">Quản lý giảng viên</Button>
            <Button variant="outlined" onClick={this.handleQuanLySinhVien}>
              Quản lý sinh viên
            </Button>
          </Box>

          {/* Table */}
          <TableContainer component={Paper} sx={{ maxWidth: 900 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#ccc" }}>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <b>Mã giảng viên</b>
                  </TableCell>
                  <TableCell>
                    <b>Tên giảng viên</b>
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
                {teachers.map((teacher, index) => (
                  <TableRow key={index}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRows.includes(teacher.id)}
                        onChange={() => this.handleCheckboxChange(teacher.id)}
                      />
                    </TableCell>
                    <TableCell>{teacher.id}</TableCell>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.phone}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
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
              onClick={this.handleAddTeacher}
              disabled={selectedRows.length > 0}
            >
              Thêm giảng viên
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={selectedRows.length === 0}
              onClick={this.handleEditTeacher}
            >
              Thay đổi
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(QuanLyGiangVien);
