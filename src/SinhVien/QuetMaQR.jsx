import React, { Component } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Box, Container, Divider, Typography, Button, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QrCodeIcon from "@mui/icons-material/QrCode";
import LogoutIcon from "@mui/icons-material/Logout";  // Import LogoutIcon
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";
import axios from "axios";

class QuetMaQR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scanResult: null,
      error: null,
      isScanning: false,
    };
    this.scanner = null;
  }

  componentDidMount() {
    // Kiểm tra nếu không có token, điều hướng người dùng về trang đăng nhập
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.navigate("/"); // Điều hướng về trang đăng nhập
    } else {
      this.startScanner();
    }
  }

  componentWillUnmount() {
    if (this.scanner) {
      this.scanner.clear();
    }
  }

  startScanner = () => {
    if (this.scanner) {
      this.scanner.clear();
    }

    this.scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    this.scanner.render(this.onScanSuccess, this.onScanFailure);
    this.setState({ isScanning: true, error: null, scanResult: null });
  };

  onScanSuccess = async (decodedText, decodedResult) => {
    if (this.scanner) {
      this.scanner.clear();
    }
    this.setState({ scanResult: decodedText, error: null, isScanning: false });

    const sinhVien = JSON.parse(localStorage.getItem("sinhVien"));
    const token = localStorage.getItem("token");

    if (!token || !sinhVien) {
      this.setState({ error: "Bạn cần đăng nhập lại để tiếp tục" });
      this.props.navigate("/"); // Điều hướng về trang đăng nhập
      return;
    }

    let qrData;
    try {
      qrData = JSON.parse(decodedText);
      if (!qrData.id_buoihoc || !qrData.id_lophoc) {
        throw new Error("Thiếu thông tin id_buoihoc hoặc id_lophoc trong mã QR");
      }
    } catch (error) {
      this.setState({ error: "Mã QR không hợp lệ: " + error.message });
      return;
    }

    try {
      const response = await axios.post(
        "https://webdiemdanh-1.onrender.com/api/diemdanh",
        { qr_data: decodedText },
        {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        this.setState({ error: null });
        alert("Điểm danh thành công!");
        this.props.navigate("/ketquadiemdanh");
      } else {
        this.setState({ error: response.data.message || "Không thể ghi nhận điểm danh" });
      }
    } catch (error) {
      console.error("Lỗi khi ghi nhận điểm danh:", error.response || error.message);
      this.setState({
        error: error.response?.data?.message || "Không thể ghi nhận điểm danh. Vui lòng thử lại.",
        isScanning: false,
      });

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("sinhVien");
        this.props.navigate("/"); // Điều hướng về trang đăng nhập
      }
    }
  };

  onScanFailure = (error) => {
    console.warn(`Lỗi quét mã QR: ${error}`);
    this.setState({ error: "Không thể quét mã QR. Vui lòng thử lại." });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("sinhVien");
    this.props.navigate("/"); // Điều hướng về trang đăng nhập
  };

  handleMenuClick = (text) => {
    if (text === "Đăng xuất") {
      this.handleLogout();
    } else {
      if (text === "Thông tin cá nhân") {
        this.props.navigate("/thongtinSV");
      } else if (text === "Thời khóa biểu") {
        this.props.navigate("/thoikhoabieu");
      } else if (text === "Kết quả điểm danh") {
        this.props.navigate("/ketquadiemdanh");
      } else if (text === "Quét Mã điểm danh") {
        this.props.navigate("/quetmaqr");
      }
    }
  };
  

  render() {
    const { scanResult, error, isScanning } = this.state;

    const menuItems = [
      { text: "Thông tin cá nhân", icon: <PersonIcon fontSize="large" /> },
      { text: "Thời khóa biểu", icon: <CalendarMonthIcon fontSize="large" /> },
      { text: "Kết quả điểm danh", icon: <AssignmentIcon fontSize="large" /> },
      { text: "Quét Mã điểm danh", icon: <QrCodeIcon fontSize="large" /> },
      { text: "Đăng xuất", icon: <LogoutIcon fontSize="large" /> },
    ];

    return (
      <Box display="flex" height="100vh">
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

        <Container sx={{ flex: 1, p: 4 }}>
          <Typography variant="h4" textAlign="center" mb={2}>
            Quét Mã Điểm Danh
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {error && (
            <Typography color="error" mb={2} textAlign="center">
              {error}
            </Typography>
          )}

          {scanResult && (
            <Typography color="green" mb={2} textAlign="center">
              Mã QR: {scanResult}
            </Typography>
          )}

          <Box id="reader" width="100%" sx={{ maxWidth: "400px", mx: "auto" }} />

          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2, display: "block", mx: "auto" }}
            onClick={this.startScanner}
            disabled={isScanning}
          >
            {isScanning ? "Đang quét..." : "Bật Camera để Quét Lại"}
          </Button>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(QuetMaQR);
