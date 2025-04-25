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
import MenuBookIcon from "@mui/icons-material/MenuBook";
import axios from "axios";

class ChinhSuaSinhVienVaoLopHoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      semester: "",
      studentCount: 0,
      className: "",
      searchQuery: "",
      studentList: [],
      selectedStudents: [],
      subjectName: "",
      lecturer: "",
      classId: "", // Thêm state để lưu classId
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.navigate("/AdminLogin");
      return;
    }

    const { location } = this.props;
    if (location.state && location.state.classInfo) {
      const { classInfo, selectedStudents } = location.state;
      this.setState({
        className: classInfo.name_lophoc,
        semester: classInfo.hocky,
        selectedStudents: selectedStudents || [],
        subjectName: classInfo.subjectName || "",
        lecturer: classInfo.lecturer || "",
        classId: classInfo.id_lophoc || "", // Lấy classId từ classInfo
      });
    }

    this.fetchStudents();
  }

  fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://webdiemdanh-1.onrender.com/api/admin/sinhvien", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const studentList = response.data.map((sv, index) => ({
        stt: index + 1,
        id_sinhvien: sv.id_sinhvien,
        mssv: sv.mssv,
        name: sv.name_sinhvien,
        lop: sv.lop_sinhvien,
        checked: this.state.selectedStudents.some(
          (selected) => selected.id_sinhvien === sv.id_sinhvien
        ),
      }));
      this.setState({ studentList });
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Không thể tải danh sách sinh viên");
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

  handleCheckboxChange = (index) => {
    const newList = [...this.state.studentList];
    newList[index].checked = !newList[index].checked;
    this.setState({ studentList: newList });
  };

  isSaveEnabled = () => {
    return this.state.studentList.some((sv) => sv.checked);
  };

  handleBack = () => {
    this.props.navigate("/ChinhSuaThongTinLopHoc");
  };

  handleSave = () => {
    const { classId, className, semester, subjectName, lecturer } = this.state;
    const selectedStudents = this.state.studentList
      .filter((sv) => sv.checked)
      .map((sv) => ({
        id_sinhvien: sv.id_sinhvien,
        mssv: sv.mssv,
        name_sinhvien: sv.name,
        lop_sinhvien: sv.lop,
      }));

    this.props.navigate("/ChinhSuaThongTinLopHoc", {
      state: {
        classInfo: {
          id_lophoc: classId, // Truyền id_lophoc
          name_lophoc: className,
          hocky: semester,
          subjectName,
          lecturer,
        },
        selectedStudents,
        studentCount: selectedStudents.length,
      },
    });
  };

  render() {
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
            Chỉnh sửa sinh viên vào lớp học
          </Typography>

          {/* Tìm kiếm và nút hành động */}
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

            <Box sx={{ marginLeft: "auto", display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleBack}
              >
                Quay lại
              </Button>
              <Button
                variant="contained"
                color="success"
                disabled={!this.isSaveEnabled()}
                onClick={this.handleSave}
              >
                Lưu sinh viên
              </Button>
            </Box>
          </Box>

          {/* Danh sách sinh viên */}
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

export default withNavigation(ChinhSuaSinhVienVaoLopHoc);