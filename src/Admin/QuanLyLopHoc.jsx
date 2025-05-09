import React, { Component } from "react";
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
  TextField,
  MenuItem,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";
import axios from "axios";

class QuanLyLopHoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      semester: "Học kỳ 1 2024 - 2025",
      selectedClassId: null,
      classes: [],
    };
  }

  componentDidMount() {
    this.fetchClasses();

    const { location } = this.props;
    if (location.state && location.state.refresh) {
      this.fetchClasses();
    }
  }

  fetchClasses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://webdiemdanh-1.onrender.com/api/admin/lophoc", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.setState({ classes: response.data });
    } catch (error) {
      console.error("Error fetching classes:", error);
      alert("Không thể tải danh sách lớp học");
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

  handleSemesterChange = (event) => {
    this.setState({ semester: event.target.value });
  };

  handleCheckboxChange = (id) => {
    this.setState({
      selectedClassId: this.state.selectedClassId === id ? null : id,
    });
  };

  handleAddClass = () => {
    this.props.navigate("/ThemThongTinLopHoc");
  };

  handleEditClass = () => {
    const { selectedClassId, classes } = this.state;
    if (selectedClassId) {
      const selectedClass = classes.find(
        (lopHoc) => lopHoc.id_lophoc === selectedClassId
      );
      this.props.navigate("/ChinhSuaThongTinLopHoc", {
        state: { lopHoc: selectedClass },
      });
    }
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

    const semesters = [
      "Học kỳ 1 2024 - 2025",
      "Học kỳ 2 2024 - 2025",
      "Học kỳ hè 2024",
    ];

    return (
      <Box display="flex" height="100vh">
        {/* Sidebar */}
        <Box width={240} bgcolor="primary.main" p={2}>
          <Box component="img" src={logo} width="100%" mb={4} />
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                key={index}
                button // Chỉ để button, không cần button={true}
                onClick={() => this.handleMenuClick(item.text)}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "white" }} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Content */}
        <Container sx={{ flex: 1, py: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Quản lý lớp học
          </Typography>

          {/* Combobox chọn học kỳ */}
          <Box mb={3} maxWidth={300}>
            <TextField
              select
              label="Chọn học kỳ"
              fullWidth
              size="small"
              value={this.state.semester}
              onChange={this.handleSemesterChange}
            >
              {semesters.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Table */}
          <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#ccc" }}>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <b>Tên lớp học</b>
                  </TableCell>
                  <TableCell>
                    <b>Tên môn học</b>
                  </TableCell>
                  <TableCell>
                    <b>Giảng viên phụ trách</b>
                  </TableCell>
                  <TableCell>
                    <b>Số lượng sinh viên</b>
                  </TableCell>
                  <TableCell>
                    <b>Học kỳ</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.classes.map((item) => (
                  <TableRow key={item.id_lophoc}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={this.state.selectedClassId === item.id_lophoc}
                        onChange={() => this.handleCheckboxChange(item.id_lophoc)}
                      />
                    </TableCell>
                    <TableCell>{item.name_lophoc}</TableCell>
                    <TableCell>{item.monhoc}</TableCell>
                    <TableCell>{item.giangvien}</TableCell>
                    <TableCell>{item.student_count}</TableCell>
                    <TableCell>{item.hocky}</TableCell>
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
              onClick={this.handleAddClass}
              disabled={this.state.selectedClassId !== null}
            >
              Thêm lớp học
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!this.state.selectedClassId}
              onClick={this.handleEditClass}
            >
              Chỉnh sửa
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(QuanLyLopHoc);