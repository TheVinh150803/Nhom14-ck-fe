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

class ThemSinhVienVaoLopHoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      semester: "",
      studentCount: 0,
      classInfo: null,
      searchQuery: "",
      studentList: [],
      error: "",
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.navigate("/AdminLogin");
      return;
    }
    this.fetchStudents();

    const { location } = this.props;
    if (location.state) {
      this.setState({
        classInfo: location.state.classInfo,
        studentCount: location.state.studentCount || 0,
      });
    }
  }

  fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
      }
      const response = await axios.get("https://webdiemdanh-1.onrender.com/api/admin/sinhvien", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const students = response.data.map((sv, index) => ({
        stt: index + 1,
        id_sinhvien: sv.id_sinhvien,
        mssv: sv.mssv,
        name: sv.name_sinhvien,
        lop: sv.lop_sinhvien,
        checked: false,
      }));
      this.setState({ studentList: students });
    } catch (error) {
      console.error("Error fetching students:", error);
      this.setState({ error: "Không thể tải danh sách sinh viên" });
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        this.props.navigate("/AdminLogin");
      }
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

  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  isSaveEnabled = () => {
    return this.state.studentList.some((sv) => sv.checked);
  };

  handleSave = async () => {
    try {
      const { studentList, classInfo } = this.state;
      const selectedStudents = studentList
        .filter((sv) => sv.checked)
        .map((sv) => sv.id_sinhvien);

        console.log("Selected students:", selectedStudents); // Thêm log để kiểm tra
      const studentCount = selectedStudents.length;

      alert("Đã chọn sinh viên thành công");
      this.props.navigate("/ThemThongTinLopHoc", {
        state: {
          studentCount: studentCount,
          classInfo: classInfo,
          selectedStudents: selectedStudents, // Pass the selected student IDs
        },
      });
    } catch (error) {
      console.error("Error saving students:", error);
      this.setState({ error: "Không thể lưu danh sách sinh viên" });
    }
  };

  handleBack = () => {
    this.props.navigate("/ThemThongTinLopHoc", {
      state: {
        studentCount: this.state.studentCount,
        classInfo: this.state.classInfo,
      },
    });
  };

  render() {
    const { searchQuery, studentList, error } = this.state;

    const filteredStudents = studentList.filter(
      (sv) =>
        sv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sv.mssv.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

        <Container sx={{ flex: 1, p: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Thêm sinh viên vào lớp học
          </Typography>

          {error && (
            <Typography color="error" mb={2}>
              {error}
            </Typography>
          )}

          <Box display="flex" alignItems="center" mb={2}>
            <TextField
              label="Tìm kiếm sinh viên"
              size="small"
              sx={{ width: 300 }}
              value={searchQuery}
              onChange={this.handleSearch}
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
                {filteredStudents.map((sv, index) => (
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