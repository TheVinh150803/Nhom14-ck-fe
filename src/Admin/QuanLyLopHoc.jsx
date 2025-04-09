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

class QuanLyLopHoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      semester: "Học kỳ 1 2024 - 2025",
      selectedClassId: null,
      classes: [
        {
          id: "L01",
          name: "Lập trình Web",
          teacher: "Nguyễn Văn A",
          studentCount: 35,
          startDate: "01/03/2024",
          endDate: "30/06/2024",
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
    this.props.navigate("/ChinhSuaThongTinLopHoc");
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
                    <b>Ngày bắt đầu</b>
                  </TableCell>
                  <TableCell>
                    <b>Ngày kết thúc</b>
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
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.teacher}</TableCell>
                    <TableCell>{item.studentCount}</TableCell>
                    <TableCell>{item.startDate}</TableCell>
                    <TableCell>{item.endDate}</TableCell>
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
              Thay đổi
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(QuanLyLopHoc);
