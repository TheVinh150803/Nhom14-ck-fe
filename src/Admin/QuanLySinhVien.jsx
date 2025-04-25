import React, { Component } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";
import MenuBookIcon from "@mui/icons-material/MenuBook";
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
import axios from "axios";

class QuanLySinhVien extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      selectedStudentId: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token không tồn tại, chuyển hướng về đăng nhập");
        this.props.navigate("/AdminLogin");
        return;
      }
      const response = await axios.get("https://webdiemdanh-1.onrender.com/api/admin/sinhvien", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Dữ liệu sinh viên:", response.data);
      this.setState({
        students: response.data,
        loading: false,
      });
    } catch (error) {
      console.error("Lỗi khi gọi API:", error.response);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        this.props.navigate("/AdminLogin");
      }
      this.setState({
        error: error.response?.data?.message || "Không thể tải danh sách sinh viên",
        loading: false,
      });
    }
  };

  handleMenuClick = (text) => {
    if (text === "Quản lý User") {
      this.props.navigate("/quanlysinhvien");
    } else if (text === "Quản lý lớp học") {
      this.props.navigate("/quanlylophoc");
    } else if (text === "Quản lý lịch học") {
      this.props.navigate("/QuanLyLichHoc");
    } else if (text === "Quản lý Môn Học") {
      this.props.navigate("/quanlymonhoc");
    }
  };

  handleCheckboxChange = (id) => {
    this.setState({
      selectedStudentId: this.state.selectedStudentId === id ? null : id,
    });
  };

  handleEditStudent = () => {
    const { selectedStudentId, students } = this.state;
    if (selectedStudentId) {
      const selectedStudent = students.find(
        (student) => String(student.id_sinhvien) === String(selectedStudentId)
      );
      if (!selectedStudent) {
        alert("Không tìm thấy sinh viên được chọn.");
        return;
      }
      console.log("Selected Student to Edit:", selectedStudent);
      this.props.navigate(`/ChinhSuaThongTinSinhVien/${selectedStudentId}`, {
        state: { student: selectedStudent },
      });
    } else {
      alert("Vui lòng chọn một sinh viên để chỉnh sửa.");
    }
  };

  render() {
    const menuItems = [
      { text: "Quản lý User", icon: <PersonIcon fontSize="large" /> },
      { text: "Quản lý lớp học", icon: <AssignmentIcon fontSize="large" /> },
      { text: "Quản lý lịch học", icon: <QrCodeScannerIcon fontSize="large" /> },
      { text: "Quản lý Môn Học", icon: <MenuBookIcon fontSize="large" /> },
    ];

    const { students, selectedStudentId, loading, error } = this.state;

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

          {/* Error or Loading */}
          {error && <Typography color="error">{error}</Typography>}
          {loading && <Typography>Đang tải...</Typography>}

          {/* Table */}
          {!loading && !error && (
            students.length === 0 ? (
              <Typography>Không có sinh viên nào để hiển thị.</Typography>
            ) : (
              <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
                <Table>
                  <TableHead sx={{ backgroundColor: "#ccc" }}>
                    <TableRow>
                      <TableCell />
                      <TableCell><b>Mã sinh viên</b></TableCell>
                      <TableCell><b>Tên sinh viên</b></TableCell>
                      <TableCell><b>Tên lớp</b></TableCell>
                      <TableCell><b>Giới tính</b></TableCell>
                      <TableCell><b>Ngày sinh</b></TableCell>
                      <TableCell><b>Địa chỉ</b></TableCell>
                      <TableCell><b>Số điện thoại</b></TableCell>
                      <TableCell><b>Email</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id_sinhvien}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedStudentId === student.id_sinhvien}
                            onChange={() =>
                              this.handleCheckboxChange(student.id_sinhvien)
                            }
                          />
                        </TableCell>
                        <TableCell>{student.mssv}</TableCell>
                        <TableCell>{student.name_sinhvien}</TableCell>
                        <TableCell>{student.lop_sinhvien}</TableCell>
                        <TableCell>{student.gioitinh_sinhvien}</TableCell>
                        <TableCell>{student.ngaysinh_sinhvien}</TableCell>
                        <TableCell>{student.diachi_sinhvien}</TableCell>
                        <TableCell>{student.sdt_sinhvien}</TableCell>
                        <TableCell>{student.email_sinhvien}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )
          )}

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
              onClick={this.handleEditStudent}
            >
              Chỉnh Sửa
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(QuanLySinhVien);