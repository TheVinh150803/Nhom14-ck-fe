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
import MenuBookIcon from "@mui/icons-material/MenuBook";
import axios from "axios";

class ThemLichHocCuaLopHoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      session: "",
      lecturer: "",
      room: "",
      date: "", // Chỉ sử dụng ngày học
      classId: "",
      classInfo: null,
      error: "",
      lecturers: [],
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
      this.setState({
        classId: location.state.classId,
        classInfo: location.state.classInfo,
        subject: location.state.classInfo.name,
        lecturer: location.state.classInfo.teacher,
      });
    }

    this.fetchLecturers();
  }

  fetchLecturers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://webdiemdanh-1.onrender.com/api/admin/giangvien", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.setState({ lecturers: response.data });
    } catch (error) {
      console.error("Error fetching lecturers:", error);
      this.setState({ error: "Không thể tải danh sách giảng viên" });
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

  handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const { classId, session, room, date } = this.state;

      // Kiểm tra các trường bắt buộc
      if (!classId) {
        throw new Error("ID lớp học không tồn tại");
      }
      if (!session) {
        throw new Error("Vui lòng nhập tiết học");
      }
      if (!room) {
        throw new Error("Vui lòng nhập phòng học");
      }
      if (!date) {
        throw new Error("Vui lòng chọn ngày học");
      }

      // Validate session format (e.g., "1-5")
      const sessionParts = session.split("-");
      if (sessionParts.length !== 2 || isNaN(sessionParts[0]) || isNaN(sessionParts[1])) {
        throw new Error("Tiết học không hợp lệ, phải có định dạng 'tietbd-tietkt' (VD: 1-5)");
      }

      const tietbd = parseInt(sessionParts[0]);
      const tietkt = parseInt(sessionParts[1]);
      if (tietbd >= tietkt || tietbd < 1 || tietkt > 12) {
        throw new Error("Tiết bắt đầu phải nhỏ hơn tiết kết thúc và trong khoảng 1-12");
      }

      // Đảm bảo định dạng ngày là YYYY-MM-DD
      const formattedDate = new Date(date).toISOString().split("T")[0];

      // Log dữ liệu trước khi gửi
      const requestData = {
        id_lophoc: classId,
        tietbd,
        tietkt,
        phonghoc: room,
        ngayhoc: formattedDate,
      };
      console.log("Sending data to API:", requestData);

      await axios.post(
        "https://webdiemdanh-1.onrender.com/api/admin/themlichhoc",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Thêm lịch học thành công");
      this.props.navigate("/LichHocCuaLopHoc", {
        state: {
          classId: this.state.classId,
          classInfo: this.state.classInfo,
        },
      });
    } catch (error) {
      console.error("Error adding schedule:", error);
      this.setState({ error: error.message || "Không thể thêm lịch học" });
    }
  };

  handleBackToSchedule = () => {
    this.props.navigate("/LichHocCuaLopHoc", {
      state: {
        classId: this.state.classId,
        classInfo: this.state.classInfo,
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

        {/* Main Content */}
        <Container sx={{ flex: 1, p: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Thêm lịch học của môn học
          </Typography>

          {this.state.error && (
            <Typography color="error" mb={2}>
              {this.state.error}
            </Typography>
          )}

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
              disabled
              fullWidth
              size="small"
            />

            <TextField
              label="Tiết học (VD: 1-5)"
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
                disabled
              >
                {this.state.lecturers.map((gv) => (
                  <MenuItem key={gv.id_giangvien} value={gv.name_giangvien}>
                    {gv.name_giangvien}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Phòng học"
              value={this.state.room}
              onChange={(e) => this.setState({ room: e.target.value })}
              fullWidth
              size="small"
            />

            <TextField
              label="Ngày học"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={this.state.date}
              onChange={(e) => this.setState({ date: e.target.value })}
              fullWidth
              size="small"
            />

            <Box display="flex" justifyContent="center" mt={2} gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSave}
              >
                Lưu
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={this.handleBackToSchedule}
              >
                Quay lại
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(ThemLichHocCuaLopHoc);