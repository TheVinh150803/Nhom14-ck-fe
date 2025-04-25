import React, { Component } from "react";
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QrCodeIcon from "@mui/icons-material/QrCode";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";
import axios from "axios";

class ThoiKhoaBieu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSemester: "HK1",
      schedule: [],
      error: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchSchedule();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.fetchSchedule();
    }
  }

  fetchSchedule = async () => {
    this.setState({ loading: true, error: null });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        this.setState({
          error: "Bạn cần đăng nhập để xem thời khóa biểu",
          loading: false,
        });
        this.props.navigate("/");
        return;
      }

      const response = await axios.get("https://webdiemdanh-1.onrender.com/api/thoikhoabieu", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          hocky: this.state.selectedSemester,
        },
      });

      if (response.data.status === "success") {
        const scheduleData = response.data.data.map((item) => ({
          id: item.ma_mon_hoc,
          subject: item.ten_mon_hoc,
          namhoc: item.nhom_mon_hoc,
          sotiet: item.so_tiet,
          tietbatdau: item.tiet_bat_dau,
          tietketthuc: item.tiet_ket_thuc,
          phong: item.phong,
          giangvien: item.giang_vien,
          thoigian: item.thoi_gian,
        }));

        this.setState({ schedule: scheduleData, error: null, loading: false });
      } else {
        this.setState({
          error: response.data.message || "Không thể lấy thời khóa biểu",
          loading: false,
        });
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error.response || error.message);
      this.setState({
        error:
          error.response?.data?.message ||
          "Không thể lấy dữ liệu thời khóa biểu. Vui lòng thử lại.",
        loading: false,
      });

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("sinhVien");
        this.props.navigate("/");
      }
    }
  };

  handleSemesterChange = (event) => {
    const newSemester = event.target.value;
    this.setState({ selectedSemester: newSemester }, () => {
      this.fetchSchedule();
    });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("sinhVien");
    this.props.navigate("/");
  };

  handleMenuClick = (text) => {
    if (text === "Thông tin cá nhân") {
      this.props.navigate("/thongtinSV");
    } else if (text === "Thời khóa biểu") {
      this.props.navigate("/thoikhoabieu");
    } else if (text === "Kết quả điểm danh") {
      this.props.navigate("/ketquadiemdanh");
    } else if (text === "Quét Mã điểm danh") {
      this.props.navigate("/quetmaqr");
    } else if (text === "Đăng xuất") {
      this.handleLogout();
    }
  };
  

  render() {
    const menuItems = [
      { text: "Thông tin cá nhân", icon: <PersonIcon fontSize="large" /> },
      { text: "Thời khóa biểu", icon: <CalendarMonthIcon fontSize="large" /> },
      { text: "Kết quả điểm danh", icon: <AssignmentIcon fontSize="large" /> },
      { text: "Quét Mã điểm danh", icon: <QrCodeIcon fontSize="large" /> },
      { text: "Đăng xuất", icon: <LogoutIcon fontSize="large" /> },
    ];

    return (
      <Box display="flex" height="100vh">
        {/* Sidebar */}
        <Box width={240} bgcolor="primary.main" p={2} color="white">
          <Box component="img" src={logo} width="100%" mb={4} />
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} onClick={() => this.handleMenuClick(item.text)}>
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "white" }} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main content */}
        <Container sx={{ flex: 1, p: 4 }}>
          <Typography variant="h4" textAlign="center" mb={2}>
            Thời Khóa Biểu Cá Nhân
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {this.state.error && (
            <Typography color="error" mb={2}>
              {this.state.error}
            </Typography>
          )}

          {this.state.loading ? (
            <Typography textAlign="center">Đang tải thời khóa biểu...</Typography>
          ) : (
            <>
              <Box mb={3}>
                <Select
                  value={this.state.selectedSemester}
                  onChange={this.handleSemesterChange}
                  fullWidth
                >
                  <MenuItem value="HK1">Học kỳ 1</MenuItem>
                  <MenuItem value="HK2">Học kỳ 2</MenuItem>
                </Select>
              </Box>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Mã Môn Học</TableCell>
                      <TableCell>Tên Môn Học</TableCell>
                      <TableCell>NMH</TableCell>
                      <TableCell>Số Tiết</TableCell>
                      <TableCell>Tiết Bắt Đầu</TableCell>
                      <TableCell>Tiết Kết Thúc</TableCell>
                      <TableCell>Phòng</TableCell>
                      <TableCell>Giảng Viên</TableCell>
                      <TableCell>Thời Gian</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.schedule.length > 0 ? (
                      this.state.schedule.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.subject}</TableCell>
                          <TableCell>{row.namhoc}</TableCell>
                          <TableCell>{row.sotiet}</TableCell>
                          <TableCell>{row.tietbatdau}</TableCell>
                          <TableCell>{row.tietketthuc}</TableCell>
                          <TableCell>{row.phong}</TableCell>
                          <TableCell>{row.giangvien}</TableCell>
                          <TableCell>{row.thoigian}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} align="center">
                          Không có dữ liệu thời khóa biểu
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Container>
      </Box>
    );
  }
}

export default withNavigation(ThoiKhoaBieu);
