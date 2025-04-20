import React, { Component } from "react";
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QrCodeIcon from "@mui/icons-material/QrCode";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";
import { Html5QrcodeScanner } from "html5-qrcode";
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
    const sinhVien = JSON.parse(localStorage.getItem("sinhVien"));
    if (!sinhVien) {
      this.props.navigate("/");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isScanning && this.state.isScanning) {
      this.scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      this.scanner.render(
        (decodedText, decodedResult) => this.onScanSuccess(decodedText, decodedResult),
        (error) => this.onScanFailure(error)
      );
    }
  }

  componentWillUnmount() {
    if (this.scanner) {
      this.scanner.clear();
    }
  }

  handleStartScanning = () => {
    this.setState({ isScanning: true });
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
      this.props.navigate("/");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/attendance",
        {
          id_sinhvien: sinhVien.id_sinhvien,
          id_buoihoc: decodedText,
          time_diemdanh: new Date().toISOString(),
          trangthai_diemdanh: 1,
        },
        {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
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
        this.props.navigate("/");
      }
    }
  };

  onScanFailure = (error) => {
    console.warn("Lỗi quét mã QR:", error);
  };

  handleMenuClick = (text) => {
    if (text === "Quét Mã điểm danh") {
      console.log("Quét Mã điểm danh clicked");
      this.props.navigate("/quetmaqr");
    } else if (text === "Thông tin cá nhân") {
      console.log("Thông tin cá nhân clicked");
      this.props.navigate("/thongtinSV");
    } else if (text === "Thời khóa biểu") {
      console.log("Thời khóa biểu clicked");
      this.props.navigate("/thoikhoabieu");
    } else if (text === "Kết quả điểm danh") {
      console.log("Kết quả điểm danh clicked");
      this.props.navigate("/ketquadiemdanh");
    }
  };

  render() {
    const menuItems = [
      { text: "Thông tin cá nhân", icon: <PersonIcon fontSize="large" /> },
      { text: "Thời khóa biểu", icon: <CalendarMonthIcon fontSize="large" /> },
      { text: "Kết quả điểm danh", icon: <AssignmentIcon fontSize="large" /> },
      { text: "Quét Mã điểm danh", icon: <QrCodeIcon fontSize="large" /> },
      { text: "QR điểm danh", icon: <QrCodeScannerIcon fontSize="large" /> },
    ];

    const { scanResult, error, isScanning } = this.state;

    return (
      <Box display="flex" height="100vh">
        {/* Sidebar */}
        <Box width={240} bgcolor="primary.main" p={2} color="white" sx={{ minHeight: "100vh" }}>
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
            <Typography color="success.main" mb={2} textAlign="center">
              Mã QR: {scanResult}
            </Typography>
          )}

          {isScanning && (
            <Box id="qr-reader" sx={{ maxWidth: 500, mx: "auto", mb: 3 }} />
          )}

          <Box display="flex" justifyContent="center" mt={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleStartScanning}
              disabled={isScanning}
            >
              {isScanning ? "Đang quét..." : "Bật Camera"}
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(QuetMaQR);