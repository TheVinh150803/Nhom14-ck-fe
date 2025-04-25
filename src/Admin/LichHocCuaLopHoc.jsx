import React, { Component } from "react";
import {
  Box,
  Button,
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
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import axios from "axios";

class LichHocCuaLopHoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: [],
      classId: "",
      classInfo: null,
      error: "",
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.navigate("/AdminLogin");
      return;
    }

    const { location } = this.props;
    if (location.state && location.state.classId) {
      this.setState(
        {
          classId: location.state.classId,
          classInfo: location.state.classInfo,
        },
        () => {
          this.fetchSchedules();
        }
      );
    }
  }

  fetchSchedules = async () => {
    try {
      const token = localStorage.getItem("token");
      const { classId } = this.state;
      const response = await axios.get(
        `https://webdiemdanh-1.onrender.com/api/admin/lophoc/${classId}/lichhoc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      this.setState({ schedules: response.data });
    } catch (error) {
      console.error("Error fetching schedules:", error);
      this.setState({ error: "Không thể tải danh sách lịch học" });
    }
  };

  handleEdit = (scheduleId) => {
    const schedule = this.state.schedules.find((sch) => sch.id_buoihoc === scheduleId);
    this.props.navigate(`/ChinhSuaLichHocCuaLopHoc`, {
      state: {
        classId: this.state.classId,
        classInfo: this.state.classInfo,
        schedule,
      },
    });
  };

  handleDelete = async (scheduleId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://webdiemdanh-1.onrender.com/api/admin/xoalichhoc/${scheduleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Xóa lịch học thành công");
      this.fetchSchedules(); // Làm mới danh sách sau khi xóa
    } catch (error) {
      console.error("Error deleting schedule:", error);
      this.setState({ error: "Không thể xóa lịch học" });
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

        {/* Main content */}
        <Container sx={{ flex: 1, py: 4 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h5" fontWeight="bold">
              Lịch học của lớp học
            </Typography>
            <Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
                onClick={() =>
                  this.props.navigate("/ThemLichHocCuaLopHoc", {
                    state: {
                      classId: this.state.classId,
                      classInfo: this.state.classInfo,
                    },
                  })
                }
              >
                Thêm lịch học
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => this.props.navigate("/QuanLyLichHoc")}
              >
                Quay lại
              </Button>
            </Box>
          </Box>

          {this.state.error && (
            <Typography color="error" mb={2}>
              {this.state.error}
            </Typography>
          )}

          <TableContainer
            component={Paper}
            sx={{ border: "1px solid #2196f3" }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: "#ccc" }}>
                <TableRow>
                  <TableCell>
                    <b>STT</b>
                  </TableCell>
                  <TableCell>
                    <b>Môn học</b>
                  </TableCell>
                  <TableCell>
                    <b>Giảng viên</b>
                  </TableCell>
                  <TableCell>
                    <b>Tiết học</b>
                  </TableCell>
                  <TableCell>
                    <b>Phòng học</b>
                  </TableCell>
                  <TableCell>
                    <b>Ngày học</b>
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.schedules.map((row, index) => (
                  <TableRow key={row.id_buoihoc}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.subject}</TableCell>
                    <TableCell>{row.teacher}</TableCell>
                    <TableCell>{row.group}</TableCell>
                    <TableCell>{row.room}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Button
                          variant="contained"
                          color="info"
                          size="small"
                          onClick={() => this.handleEdit(row.id_buoihoc)}
                        >
                          Chỉnh sửa
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => this.handleDelete(row.id_buoihoc)}
                        >
                          Xoá
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(LichHocCuaLopHoc);