import React, { Component } from "react";
import axios from "axios";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import MenuBookIcon from "@mui/icons-material/MenuBook";
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
    console.log("QuanLyGiangVien props:", props); // Debug props
    this.state = {
      teachers: [],
      selectedRows: [],
    };
  }

  componentDidMount() {
    this.fetchTeachers();
  }

  fetchTeachers = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, please login first");
      this.props.navigate("/AdminLogin");
      return;
    }

    axios
      .get("https://webdiemdanh-1.onrender.com/api/admin/giangvien", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const teachers = response.data.map((teacher) => ({
          id_giangvien: teacher.id_giangvien,
          Magiangvien: teacher.Magiangvien,
          name: teacher.name_giangvien,
          phone: teacher.sdt_giangvien,
          email: teacher.email_giangvien,
          address: teacher.diachi_giangvien,
          gender: teacher.gioitinh_giangvien,
        }));
        console.log("Teachers data:", teachers);
        this.setState({ teachers });
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
        if (error.response && error.response.status === 401) {
          this.props.navigate("/AdminLogin");
        }
      });
  };

  handleMenuClick = (text) => {
    if (text === "Quản lý User") {
      this.props.navigate("/QuanLySinhVien");
    } else if (text === "Quản lý lớp học") {
      this.props.navigate("/QuanLyLopHoc");
    } else if (text === "Quản lý lịch học") {
      this.props.navigate("/QuanLyLichHoc");
    } else if (text === "Quản lý Môn Học") {
      this.props.navigate("/QuanLyMonHoc");
    }
  };

  handleCheckboxChange = (id_giangvien) => {
    const id = Number(id_giangvien);
    this.setState((prevState) => {
      const isSelected = prevState.selectedRows.includes(id);
      const newSelectedRows = isSelected
        ? prevState.selectedRows.filter((item) => item !== id)
        : [id];
      console.log("Selected Rows:", newSelectedRows);
      return { selectedRows: newSelectedRows };
    });
  };

  handleAddTeacher = () => {
    this.props.navigate("/ThemThongTinGiangVien");
  };

  handleEditTeacher = () => {
    if (this.state.selectedRows.length > 0) {
      console.log("Selected Row ID:", this.state.selectedRows[0]);
      console.log("Teachers:", this.state.teachers);
      const selectedTeacher = this.state.teachers.find(
        (teacher) =>
          String(teacher.id_giangvien) === String(this.state.selectedRows[0])
      );
      if (!selectedTeacher) {
        alert("Không tìm thấy giảng viên được chọn.");
        return;
      }
      console.log("Selected Teacher to Edit:", selectedTeacher);
      this.props.navigate("/ChinhSuaThongTinGiangVien", {
        state: { teacher: selectedTeacher },
      });
    } else {
      alert("Vui lòng chọn một giảng viên để chỉnh sửa.");
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
        text: "Quản lý lịch học",
        icon: <QrCodeScannerIcon fontSize="large" />,
      },
      { text: "Quản lý Môn Học", icon: <MenuBookIcon fontSize="large" /> },
    ];

    return (
      <Box display="flex" height="100vh">
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

        <Container sx={{ flex: 1, p: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Quản lý giảng viên
          </Typography>

          <Box display="flex" gap={2} mb={2}>
            <Button variant="contained">Quản lý giảng viên</Button>
            <Button variant="outlined" onClick={this.handleQuanLySinhVien}>
              Quản lý sinh viên
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ maxWidth: 1200 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#ccc" }}>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <b>ID Giảng viên</b>
                  </TableCell>
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
                  <TableCell>
                    <b>Địa chỉ</b>
                  </TableCell>
                  <TableCell>
                    <b>Giới tính</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teachers.map((teacher, index) => (
                  <TableRow key={index}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRows.includes(teacher.id_giangvien)}
                        onChange={() => this.handleCheckboxChange(teacher.id_giangvien)}
                      />
                    </TableCell>
                    <TableCell>{teacher.id_giangvien}</TableCell>
                    <TableCell>{teacher.Magiangvien}</TableCell>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.phone}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.address}</TableCell>
                    <TableCell>{teacher.gender}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

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
              Chỉnh Sửa
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(QuanLyGiangVien);