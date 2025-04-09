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

class LichHocCuaMonHoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: [
        {
          id: 1,
          subject: "Lập trình Web",
          teacher: "Hoàng Khuê",
          group: "Nhóm 1 Tiết 1 → 5",
          dateRange: "17/3/2025 - 20/3/2025",
        },
        {
          id: 2,
          subject: "Lập trình Web",
          teacher: "Hoàng Khuê",
          group: "Nhóm 2 Tiết 1 → 5",
          dateRange: "17/3/2025 - 20/3/2025",
        },
        {
          id: 3,
          subject: "Lập trình Web",
          teacher: "Hoàng Khuê",
          group: "Nhóm 3 Tiết 1 → 5",
          dateRange: "17/3/2025 - 20/3/2025",
        },
        {
          id: 4,
          subject: "Lập trình Web",
          teacher: "Hoàng Khuê",
          group: "Nhóm 4 Tiết 1 → 5",
          dateRange: "17/3/2025 - 20/3/2025",
        },
        {
          id: 5,
          subject: "Lập trình Web",
          teacher: "Hoàng Khuê",
          group: "Nhóm 5 Tiết 1 → 5",
          dateRange: "17/3/2025 - 20/3/2025",
        },
        {
          id: 6,
          subject: "Lập trình Web",
          teacher: "Hoàng Khuê",
          group: "Nhóm 6 Tiết 1 → 5",
          dateRange: "17/3/2025 - 20/3/2025",
        },
      ],
    };
  }

  handleEdit = (scheduleId) => {
    this.props.navigate(`/ChinhSuaLichHocCuaMonHoc`);
  };

  handleMenuClick = (text) => {
    if (text === "Quản lý User") {
      this.props.navigate("/QuanLyGiangVien");
    } else if (text === "Quản lý lớp học") {
      this.props.navigate("/QuanLyLopHoc");
    } else if (text === "Danh sách môn học") {
      this.props.navigate("/DanhSachMonHoc");
    }
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
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Lịch học của môn học
          </Typography>

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
                    <b>Ngày Bắt đầu/Kết thúc</b>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.schedules.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.subject}</TableCell>
                    <TableCell>{row.teacher}</TableCell>
                    <TableCell>{row.group}</TableCell>
                    <TableCell>{row.dateRange}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="info"
                        size="small"
                        onClick={() => this.handleEdit(row.id)}
                      >
                        Chỉnh sửa
                      </Button>
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

export default withNavigation(LichHocCuaMonHoc);
