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
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";

class ThemThongTinLopHoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classCode: "",
      subjectName: "",
      lecturer: "",
      studentCount: "",
      startDate: "",
      endDate: "",
      semester: "",
    };
  }

  handleMenuClick = (text) => {
    if (text === "Quản lý User") {
      this.props.navigate("/QuanLyGiangVien");
    } else if (text === "Quản lý lớp học") {
      this.props.navigate("/QuanLyLopHoc");
    } else if (text === "Danh sách môn học") {
      this.props.navigate("/DanhSachMonHoc");
    }
  };

  handleAddStudent = () => {
    this.props.navigate("/ThemSinhVienVaoLopHoc");
  };

  handleSave = () => {
    this.props.navigate("/QuanLyLopHoc");
  };

  handleDelete = () => {
    this.props.navigate("/QuanLyLopHoc");
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

    const lecturers = ["Giảng viên 1", "Giảng viên 2", "Giảng viên 3"];
    const subjects = ["Toán rời rạc", "Lập trình Java", "Cấu trúc dữ liệu"];

    return (
      <Box display="flex" height="100vh">
        {/* Sidebar */}
        <Box width={240} bgcolor="primary.main" p={2}>
          <Box component="img" src={logo} width="100%" mb={4} />
          {menuItems.map((item, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              color="white"
              mb={2}
              sx={{ cursor: "pointer" }}
              onClick={() => this.handleMenuClick(item.text)}
            >
              {item.icon}
              <Typography variant="subtitle1" ml={2}>
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Main Content */}
        <Container sx={{ flex: 1, p: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Thêm thông tin lớp học
          </Typography>

          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={2}
            maxWidth={500}
          >
            <TextField
              label="Tên lớp học"
              value={this.state.classCode}
              onChange={(e) => this.setState({ classCode: e.target.value })}
              fullWidth
              size="small"
            />

            <FormControl fullWidth size="small">
              <InputLabel>Tên môn học</InputLabel>
              <Select
                value={this.state.subjectName}
                label="Tên môn học"
                onChange={(e) => this.setState({ subjectName: e.target.value })}
              >
                {subjects.map((subject, index) => (
                  <MenuItem key={index} value={subject}>
                    {subject}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Giảng viên phụ trách</InputLabel>
              <Select
                value={this.state.lecturer}
                label="Giảng viên phụ trách"
                onChange={(e) => this.setState({ lecturer: e.target.value })}
              >
                {lecturers.map((gv, index) => (
                  <MenuItem key={index} value={gv}>
                    {gv}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box display="flex" gap={2}>
              <TextField
                label="Số lượng sinh viên"
                value={this.state.studentCount}
                onChange={(e) =>
                  this.setState({ studentCount: e.target.value })
                }
                fullWidth
                size="small"
              />
              <Button
                variant="contained"
                sx={{ whiteSpace: "nowrap" }}
                onClick={this.handleAddStudent}
              >
                Thêm sinh viên
              </Button>
            </Box>

            <FormControl fullWidth size="small">
              <InputLabel>Học kỳ</InputLabel>
              <Select
                value={this.state.semester}
                label="Học kỳ"
                onChange={(e) => this.setState({ semester: e.target.value })}
              >
                <MenuItem value="Học kỳ 1 2024-2025">
                  Học kỳ 1 2024-2025
                </MenuItem>
                <MenuItem value="Học kỳ 2 2024-2025">
                  Học kỳ 2 2024-2025
                </MenuItem>
                <MenuItem value="Học kỳ 1 2025-2026">
                  Học kỳ 1 2025-2026
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Ngày bắt đầu"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={this.state.startDate}
              onChange={(e) => this.setState({ startDate: e.target.value })}
              fullWidth
              size="small"
            />

            <TextField
              label="Ngày kết thúc"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={this.state.endDate}
              onChange={(e) => this.setState({ endDate: e.target.value })}
              fullWidth
              size="small"
            />

            <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
              <Button
                variant="contained"
                color="error"
                onClick={this.handleDelete}
              >
                Xoá lớp học
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={this.handleSave}
              >
                Lưu thông tin
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(ThemThongTinLopHoc);
