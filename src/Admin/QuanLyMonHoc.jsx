import React, { Component } from "react";
import {
  Box,
  Button,
  Container,
  Checkbox,
  TextField,
  MenuItem,
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
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";
import axios from "axios";

class QuanLyMonHoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      semester: "Học kỳ 1 2024 - 2025",
      subjects: [],
      selectedSubjectId: null,
    };
  }

  componentDidMount() {
    this.fetchSubjects();
  }

  fetchSubjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://webdiemdanh-1.onrender.com/api/admin/monhoc", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.setState({ subjects: response.data });
    } catch (error) {
      console.error("Error fetching subjects:", error);
      alert("Không thể tải danh sách môn học");
    }
  };

  handleCheckboxChange = (id) => {
    this.setState({
      selectedSubjectId: this.state.selectedSubjectId === id ? null : id,
    });
  };

  handleEditSubject = () => {
    const { selectedSubjectId, subjects } = this.state;
    if (selectedSubjectId) {
      const selectedSubject = subjects.find(
        (subject) => subject.id_monhoc === selectedSubjectId
      );
      this.props.navigate(`/ChinhSuaMonHoc`, { state: { subject: selectedSubject } });
    }
  };

  handleAddSubject = () => {
    this.props.navigate("/ThemMonHoc");
  };

  handleSemesterChange = (event) => {
    this.setState({ semester: event.target.value });
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
            Quản lý môn học
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
                    <b>Mã môn học</b>
                  </TableCell>
                  <TableCell>
                    <b>Tên môn học</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.subjects.map((item) => (
                  <TableRow key={item.id_monhoc}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={this.state.selectedSubjectId === item.id_monhoc}
                        onChange={() => this.handleCheckboxChange(item.id_monhoc)}
                      />
                    </TableCell>
                    <TableCell>{item.mamon}</TableCell>
                    <TableCell>{item.name_monhoc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Action Buttons */}
          <Box mt={3} display="flex" gap={2}>
            <Button
              variant="contained"
              color="success"
              disabled={this.state.selectedSubjectId !== null}
              onClick={this.handleAddSubject}
            >
              Thêm môn học
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={this.state.selectedSubjectId === null}
              onClick={this.handleEditSubject}
            >
              Chỉnh sửa
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(QuanLyMonHoc);