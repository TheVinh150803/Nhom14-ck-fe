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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  Checkbox,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeIcon from "@mui/icons-material/QrCode";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";


class DiemDanhGV extends Component {
  constructor(props) {
    super(props);
    const today = new Date().toISOString().slice(0, 10);
    this.state = {
      semester: "Học kỳ 2 năm học 2025 - 2026",
      attendanceDate: today,
      selectedBuoiHoc: "",
      buoiHocList: [],
      students: [],
      qrCodeData: null,
      isLoadingQRCode: false,
      openQRCodeDialog: false,
      error: null,
    };
  }


  componentDidMount() {
    this.fetchBuoiHoc();
  }


  fetchBuoiHoc = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.setState({ error: "Bạn cần đăng nhập lại để tiếp tục" });
      this.props.navigate("/");
      return;
    }


    try {
      const response = await axios.get(
        "https://webdiemdanh-1.onrender.com/api/diemdanh/buoihoc",
        {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );


      if (response.data.status === "success") {
        this.setState({ buoiHocList: response.data.data, error: null });
      } else {
        this.setState({ error: response.data.message || "Không thể lấy danh sách buổi học" });
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách buổi học:", error.response || error.message);
      this.setState({
        error: error.response?.data?.message || "Không thể lấy danh sách buổi học. Vui lòng thử lại.",
      });


      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        this.props.navigate("/");
      }
    }
  };


  fetchSinhVien = async (id_lophoc) => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.setState({ error: "Bạn cần đăng nhập lại để tiếp tục" });
      this.props.navigate("/");
      return;
    }


    try {
      const response = await axios.get(
        `https://webdiemdanh-1.onrender.com/api/diemdanh/sinhvien/${id_lophoc}`,
        {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );


      if (response.data.status === "success") {
        this.setState({
          students: response.data.data.map((student) => ({
            ...student,
            status: "",
          })),
          error: null,
        });
      } else {
        this.setState({ error: response.data.message || "Không thể lấy danh sách sinh viên" });
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sinh viên:", error.response || error.message);
      this.setState({
        error: error.response?.data?.message || "Không thể lấy danh sách sinh viên. Vui lòng thử lại.",
      });


      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        this.props.navigate("/");
      }
    }
  };


  handleMenuClick = (text) => {
    const routes = {
      "Thông Tin Giảng Viên": "/thongtinGV",
      "Homepage": "/homepage",
      "Lịch giảng dạy": "/lichgiangday",
      "Điểm Danh": "/diemdanh",
      "Xem Kết Quả Điểm Danh": "/KQDiemDanh",
      "Tra cứu Sinh Viên": "/tracuu",
      "Đăng Xuất": "/",
    };
    if (routes[text]) this.props.navigate(routes[text]);
  };


  handleStatusChange = (id, value) => {
    this.setState((prevState) => ({
      students: prevState.students.map((student) =>
        student.id === id ? { ...student, status: value } : student
      ),
    }));
  };


  handleGenerateQRCode = async () => {
    const { selectedBuoiHoc } = this.state;
    console.log("selectedBuoiHoc:", selectedBuoiHoc);


    if (!selectedBuoiHoc || selectedBuoiHoc === "") {
      this.setState({ error: "Vui lòng chọn buổi học trước khi tạo mã QR." });
      return;
    }


    this.setState({ isLoadingQRCode: true, qrCodeData: null, error: null });


    const token = localStorage.getItem("token");
    if (!token) {
      this.setState({ error: "Bạn cần đăng nhập lại để tiếp tục" });
      this.props.navigate("/");
      return;
    }


    try {
      const response = await axios.post(
        "https://webdiemdanh-1.onrender.com/api/diemdanh/taomaqr",
        {
          id_buoihoc: Number(selectedBuoiHoc),
        },
        {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );


      console.log("API Response:", response.data);


      if (response.data.status === "success" && response.data.qr_url) {
        console.log("qrCodeData set to:", response.data.qr_url);
        this.setState({
          qrCodeData: response.data.qr_url,
          openQRCodeDialog: true,
          error: null,
        });
      } else {
        this.setState({
          error: response.data.message || "Không thể tạo mã QR",
          openQRCodeDialog: true,
        });
      }
    } catch (error) {
      console.error("Lỗi tạo mã QR:", error.response || error.message);
      this.setState({
        error: error.response?.data?.message || "Không thể tạo mã QR. Vui lòng thử lại.",
        openQRCodeDialog: true,
      });


      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        this.props.navigate("/");
      }
    } finally {
      this.setState({ isLoadingQRCode: false });
    }
  };


  handleOpenQRCodeDialog = () => {
    this.setState({ openQRCodeDialog: true });
  };


  handleCloseQRCodeDialog = () => {
    this.setState({ openQRCodeDialog: false, qrCodeData: null, error: null });
  };


  handleBuoiHocChange = (e) => {
    const selectedBuoiHoc = e.target.value;
    const buoiHoc = this.state.buoiHocList.find((bh) => bh.id_buoihoc === selectedBuoiHoc);
    this.setState(
      {
        selectedBuoiHoc,
        attendanceDate: buoiHoc ? buoiHoc.ngayhoc : this.state.attendanceDate,
      },
      () => {
        if (buoiHoc) {
          this.fetchSinhVien(buoiHoc.id_lophoc);
        } else {
          this.setState({ students: [] });
        }
      }
    );
  };


  render() {
    const {
      semester,
      attendanceDate,
      selectedBuoiHoc,
      buoiHocList,
      students,
      qrCodeData,
      isLoadingQRCode,
      openQRCodeDialog,
      error,
    } = this.state;


    const menuItems = [
      { text: "Homepage", icon: <HomeIcon fontSize="large" /> },
      { text: "Thông Tin Giảng Viên", icon: <PersonIcon fontSize="large" /> },
      { text: "Lịch giảng dạy", icon: <CalendarMonthIcon fontSize="large" /> },
      { text: "Điểm Danh", icon: <QrCodeIcon fontSize="large" /> },

      { text: "Đăng Xuất", icon: <LogoutIcon fontSize="large" /> },
    ];


    return (
      <Box display="flex" height="110vh" bgcolor="#f4f6f8">
        {/* Sidebar */}
        <Box width={240} bgcolor="#2c3e50" p={2}>
          <Box component="img" src={logo} width="100%" mb={4} borderRadius={2} />
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => this.handleMenuClick(item.text)}
                sx={{
                  mb: 1,
                  borderRadius: 1,
                  "&:hover": { backgroundColor: "#34495e" },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "white" }} />
              </ListItem>
            ))}
          </List>
        </Box>


        {/* Main Content */}
        <Container sx={{ flex: 1, py: 4 }}>
          <Typography variant="h5" fontWeight={600} mb={2}>
            Điểm Danh
          </Typography>


          {error && !openQRCodeDialog && (
            <Typography color="error" mb={2}>
              {error}
            </Typography>
          )}


          {/* Filters */}
          <Stack direction="row" spacing={2} mb={2}>
            <FormControl fullWidth>
              <InputLabel>Chọn đợt</InputLabel>
              <Select value={semester} label="Chọn đợt">
                <MenuItem value={semester}>{semester}</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Ngày Điểm Danh"
              type="date"
              value={attendanceDate}
              onChange={(e) => this.setState({ attendanceDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth>
              <InputLabel>Chọn lớp học phần</InputLabel>
              <Select
                value={selectedBuoiHoc}
                onChange={this.handleBuoiHocChange}
                label="Chọn lớp học phần"
              >
                <MenuItem value="">
                  <em>Chọn buổi học</em>
                </MenuItem>
                {buoiHocList.map((buoiHoc) => (
                  <MenuItem key={buoiHoc.id_buoihoc} value={buoiHoc.id_buoihoc}>
                    {buoiHoc.display_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>


          {/* Action Buttons */}
          <Stack direction="row" spacing={2} mb={2}>
            <Button variant="contained" color="primary">
              Lưu Điểm Danh
            </Button>
            <Button variant="contained" color="error" onClick={this.handleGenerateQRCode}>
              QR Điểm Danh
            </Button>
            <Button variant="contained" color="success">
              Quét Mã
            </Button>
          </Stack>




          <Dialog
            open={openQRCodeDialog}
            onClose={this.handleCloseQRCodeDialog}
            maxWidth="sm"
            fullWidth
          >
            <Box p={3} display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h6" mb={2}>
                Mã QR Điểm Danh
              </Typography>
              {isLoadingQRCode ? (
                <Typography>Đang tạo mã QR...</Typography>
              ) : qrCodeData ? (
                <img
                  src={qrCodeData}
                  alt="Mã QR Điểm Danh"
                  style={{ maxWidth: "100%", height: "auto" }}
                  onError={(e) => {
                    console.error("Failed to load QR image:", qrCodeData);
                    this.setState({ error: "Không thể tải hình ảnh mã QR. URL: " + qrCodeData, qrCodeData: null });
                  }}
                />
              ) : (
                <Typography color="error">{error || "Không thể tạo mã QR. Vui lòng thử lại."}</Typography>
              )}
              <Button onClick={this.handleCloseQRCodeDialog} sx={{ mt: 2 }} variant="contained">
                Đóng
              </Button>
            </Box>
          </Dialog>


          {/* Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Điểm Danh</TableCell>
                  <TableCell>MSSV</TableCell>
                  <TableCell>Họ Tên</TableCell>
                  <TableCell>Lớp Học</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={student.status === "Có mặt"}
                          onChange={(e) =>
                            this.handleStatusChange(student.id, e.target.checked ? "Có mặt" : "Vắng")
                          }
                          color="primary"
                        />
                      </TableCell>
                      <TableCell>{student.mssv}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.class}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Chưa có sinh viên nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    );
  }
}


export default withNavigation(DiemDanhGV);



