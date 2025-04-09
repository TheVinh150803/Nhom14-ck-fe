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

class ChinhSuaLichHocCuaMonHoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      session: "",
      lecturer: "",
      startDate: "",
      endDate: "",
    };
  }

  handleMenuClick = (text) => {
    if (text === "Quản lý User") {
      this.props.navigate("/quanlysinhvien");
    } else if (text === "Quản lý lớp học") {
      this.props.navigate("/quanlylophoc");
    } else if (text === "Danh sách môn học") {
      this.props.navigate("/danhsachmonhoc");
    }
  };

  handleBackToSchedule = () => {
    this.props.navigate("/LichHocCuaMonHoc");
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
            Chỉnh sửa lịch học của môn học
          </Typography>

          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={2}
            maxWidth={500}
          >
            <TextField
              label="Môn học"
              value={this.state.subject}
              onChange={(e) => this.setState({ subject: e.target.value })}
              fullWidth
              size="small"
            />

            <TextField
              label="Tiết học"
              value={this.state.session}
              onChange={(e) => this.setState({ session: e.target.value })}
              fullWidth
              size="small"
            />

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

            <Box display="flex" justifyContent="center" mt={2} gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleBackToSchedule}
              >
                Thay đổi
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={this.handleBackToSchedule}
              >
                Xoá lớp học
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(ChinhSuaLichHocCuaMonHoc);
