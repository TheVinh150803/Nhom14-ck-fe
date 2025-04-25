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
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import axios from "axios";

class QuanLyLichHoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      semester: "Học kỳ 1 2024-2025",
      selectedClassId: null,
      classes: [],
      error: "",
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.navigate("/AdminLogin");
      return;
    }

    this.fetchClasses();
  }

  fetchClasses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://webdiemdanh-1.onrender.com/api/admin/lophoc", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const classes = response.data.map((lopHoc) => ({
        id: lopHoc.id_lophoc,
        name: lopHoc.name_lophoc,
        subject: lopHoc.monhoc, // Tên môn học
        teacher: lopHoc.giangvien,
        studentCount: lopHoc.student_count,
        hocky: lopHoc.hocky, // Học kỳ
      }));

      this.setState({ classes });
    } catch (error) {
      console.error("Error fetching classes:", error);
      this.setState({ error: "Không thể tải danh sách lớp học" });
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

  handleManageSchedule = () => {
    const { selectedClassId, classes } = this.state;
    if (selectedClassId) {
      const selectedClass = classes.find((cls) => cls.id === selectedClassId);
      this.props.navigate(`/LichHocCuaLopHoc`, {
        state: {
          classId: selectedClassId,
          classInfo: selectedClass,
        },
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
      "Học kỳ 1 2024-2025",
      "Học kỳ 2 2024-2025",
      "Học kỳ 1 2025-2026",
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
        <Container sx={{ flex: 1, py: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Quản lý lịch học
          </Typography>

          {this.state.error && (
            <Typography color="error" mb={2}>
              {this.state.error}
            </Typography>
          )}

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
                {this.state.classes.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={this.state.selectedClassId === item.id}
                        onChange={() => this.handleCheckboxChange(item.id)}
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell>{item.teacher}</TableCell>
                    <TableCell>{item.studentCount}</TableCell>
                    <TableCell>{item.hocky}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Action Button */}
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              disabled={!this.state.selectedClassId}
              onClick={this.handleManageSchedule}
            >
              Xem lịch học
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(QuanLyLichHoc);