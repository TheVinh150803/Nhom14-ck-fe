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
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";

class ThemSinhVienVaoLopHoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      semester: "",
      studentCount: "",
      className: "",
      searchQuery: "",
      studentList: [
        {
          stt: 1,
          mssv: "DH52112086",
          name: "Nguyễn Trần Thế Vinh",
          lop: "DH21_TH12",
          checked: false,
        },
        {
          stt: 2,
          mssv: "DH52152145",
          name: "Huỳnh Đại Thắng",
          lop: "DH21_TH12",
          checked: false,
        },
        {
          stt: 3,
          mssv: "DH52112086",
          name: "Nguyễn Nhật Phi",
          lop: "DH21_TH12",
          checked: false,
        },
        {
          stt: 4,
          mssv: "DH52111467",
          name: "Huỳnh Tấn Phát",
          lop: "DH21_TH12",
          checked: false,
        },
        {
          stt: 5,
          mssv: "DH52111469",
          name: "Lê Thành Phát",
          lop: "DH21_TH12",
          checked: false,
        },
        {
          stt: 6,
          mssv: "DH52111506",
          name: "Nguyễn Anh Phú",
          lop: "DH21_TH12",
          checked: false,
        },
      ],
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

  handleCheckboxChange = (index) => {
    const newList = [...this.state.studentList];
    newList[index].checked = !newList[index].checked;
    this.setState({ studentList: newList });
  };

  isSaveEnabled = () => {
    return this.state.studentList.some((sv) => sv.checked);
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

    const semesters = [
      "Học kỳ 1 2024-2025",
      "Học kỳ 2 2024-2025",
      "Học kỳ 1 2025-2026",
      "Học kỳ 2 năm học 2025-2026",
    ];

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

        {/* Main content */}
        <Container sx={{ flex: 1, p: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Thêm sinh viên vào lớp học
          </Typography>

          <Box display="flex" gap={2} mb={2}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Chọn học kỳ</InputLabel>
              <Select
                value={this.state.semester}
                label="Chọn học kỳ"
                onChange={(e) => this.setState({ semester: e.target.value })}
              >
                {semesters.map((hk, index) => (
                  <MenuItem key={index} value={hk}>
                    {hk}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Số lượng sinh viên"
              value={this.state.studentCount}
              onChange={(e) => this.setState({ studentCount: e.target.value })}
              size="small"
            />

            <TextField
              label="Lớp học"
              value={this.state.className}
              onChange={(e) => this.setState({ className: e.target.value })}
              size="small"
            />
          </Box>

          <Box display="flex" alignItems="center" mb={2}>
            <TextField
              label="Tìm kiếm sinh viên"
              size="small"
              sx={{ width: 300 }}
              value={this.state.searchQuery}
              onChange={(e) => this.setState({ searchQuery: e.target.value })}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
            <Button
              variant="contained"
              sx={{ marginLeft: "auto" }}
              disabled={!this.isSaveEnabled()}
            >
              Lưu sinh viên
            </Button>
          </Box>

          <Box sx={{ border: "1px solid #ccc", p: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Danh sách sinh viên
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Điểm Danh</TableCell>
                  <TableCell>MSSV</TableCell>
                  <TableCell>Họ Tên</TableCell>
                  <TableCell>Lớp Học</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.studentList.map((sv, index) => (
                  <TableRow key={sv.stt}>
                    <TableCell>{sv.stt}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={sv.checked}
                        onChange={() => this.handleCheckboxChange(index)}
                      />
                    </TableCell>
                    <TableCell>{sv.mssv}</TableCell>
                    <TableCell>{sv.name}</TableCell>
                    <TableCell>{sv.lop}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(ThemSinhVienVaoLopHoc);
