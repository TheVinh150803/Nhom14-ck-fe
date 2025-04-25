import React, { Component } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";
import axios from "axios";

class ChinhSuaMonHoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectInfo: {
        id_monhoc: "",
        mamon: "",
        name_monhoc: "",
      },
      error: "",
    };
  }

  componentDidMount() {
    const { subject } = this.props.location.state || {};
    if (subject) {
      this.setState({
        subjectInfo: {
          id_monhoc: subject.id_monhoc,
          mamon: subject.mamon,
          name_monhoc: subject.name_monhoc,
        },
      });
    }
  }

  handleInputChange = (field) => (event) => {
    this.setState({
      subjectInfo: {
        ...this.state.subjectInfo,
        [field]: event.target.value,
      },
    });
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

  handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const { id_monhoc, mamon, name_monhoc } = this.state.subjectInfo;
      await axios.put(
        `https://webdiemdanh-1.onrender.com/api/admin/capnhatmonhoc/${id_monhoc}`,
        { mamon, name_monhoc },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Cập nhật môn học thành công");
      this.props.navigate("/quanlymonhoc");
    } catch (error) {
      console.error("Error updating subject:", error);
      this.setState({ error: "Không thể cập nhật môn học" });
    }
  };

  handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const { id_monhoc } = this.state.subjectInfo;
      await axios.delete(`http://127.0.0.1:8000/api/admin/xoamonhoc/${id_monhoc}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Xoá môn học thành công");
      this.props.navigate("/quanlymonhoc");
    } catch (error) {
      console.error("Error deleting subject:", error);
      this.setState({ error: "Không thể xoá môn học" });
    }
  };

  handleBack = () => {
    this.props.navigate("/quanlymonhoc");
  };

  render() {
    const { subjectInfo, error } = this.state;

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

        {/* Main content */}
        <Container sx={{ flex: 1, p: 4 }}>
          <Typography variant="h6" mb={2}>
            Chỉnh sửa môn học
          </Typography>

          {error && (
            <Typography color="error" mb={2}>
              {error}
            </Typography>
          )}

          <Box display="flex" flexDirection="column" gap={2} maxWidth={500}>
            <TextField
              label="Mã môn học"
              value={subjectInfo.mamon}
              onChange={this.handleInputChange("mamon")}
              fullWidth
            />
            <TextField
              label="Tên môn học"
              value={subjectInfo.name_monhoc}
              onChange={this.handleInputChange("name_monhoc")}
              fullWidth
            />
          </Box>

          <Box mt={3} display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Lưu thông tin
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={this.handleDelete}
            >
              Xoá môn học
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={this.handleBack}
            >
              Quay lại
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(ChinhSuaMonHoc);