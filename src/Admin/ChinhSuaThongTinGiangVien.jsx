import React, { Component } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
import withNavigation from "./withNavigation";

class ChinhSuaThongTinGiangVien extends Component {
  constructor(props) {
    super(props);

    console.log("ChinhSuaThongTinGiangVien props:", props); // Debug props
    console.log("Location state:", props.location?.state); // Debug location.state

    const teacherData = props.location?.state?.teacher || {
      id_giangvien: "",
      Magiangvien: "",
      name: "",
      phone: "",
      email: "",
      address: "",
      gender: "",
    };

    console.log("Received teacher data:", teacherData);

    if (!props.location?.state?.teacher) {
      alert("Không có dữ liệu giảng viên để chỉnh sửa. Vui lòng chọn lại.");
      this.props.navigate("/QuanLyGiangVien");
    }

    this.state = {
      teacherInfo: teacherData,
    };
  }

  handleInputChange = (field) => (event) => {
    this.setState({
      teacherInfo: {
        ...this.state.teacherInfo,
        [field]: event.target.value,
      },
    });
  };

  handleUpdate = () => {
    const { teacherInfo } = this.state;
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found, please login first");
      this.props.navigate("/AdminLogin");
      return;
    }

    axios
      .put(
        `https://webdiemdanh-1.onrender.com/api/admin/capnhatgiangvien/${teacherInfo.id_giangvien}`,
        {
          Magiangvien: teacherInfo.Magiangvien,
          name_giangvien: teacherInfo.name,
          sdt_giangvien: teacherInfo.phone,
          email_giangvien: teacherInfo.email,
          diachi_giangvien: teacherInfo.address,
          gioitinh_giangvien: teacherInfo.gender,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert("Cập nhật thông tin giảng viên thành công!");
        this.props.navigate("/QuanLyGiangVien");
      })
      .catch((error) => {
        console.error("Error updating teacher:", error);
        alert("Cập nhật thông tin giảng viên thất bại. Vui lòng thử lại!");
      });
  };

  render() {
    const { teacherInfo } = this.state;

    return (
      <Box display="flex" height="100vh">
        <Container sx={{ flex: 1, p: 4 }}>
          <Typography variant="h6" mb={2}>
            Chỉnh sửa thông tin giảng viên
          </Typography>

          <Box display="flex" flexDirection="column" gap={2} maxWidth={500}>
            <TextField
              label="ID Giảng viên"
              value={teacherInfo.id_giangvien || ""}
              onChange={this.handleInputChange("id_giangvien")}
              fullWidth
              disabled
            />
            <TextField
              label="Mã giảng viên"
              value={teacherInfo.Magiangvien || ""}
              onChange={this.handleInputChange("Magiangvien")}
              fullWidth
              disabled
            />
            <TextField
              label="Tên giảng viên"
              value={teacherInfo.name || ""}
              onChange={this.handleInputChange("name")}
              fullWidth
            />
            <TextField
              label="Số điện thoại"
              value={teacherInfo.phone || ""}
              onChange={this.handleInputChange("phone")}
              fullWidth
            />
            <TextField
              label="E-mail"
              value={teacherInfo.email || ""}
              onChange={this.handleInputChange("email")}
              fullWidth
            />
            <TextField
              label="Địa chỉ"
              value={teacherInfo.address || ""}
              onChange={this.handleInputChange("address")}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Giới tính</InputLabel>
              <Select
                value={teacherInfo.gender || ""}
                onChange={this.handleInputChange("gender")}
              >
                <MenuItem value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box mt={3} display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleUpdate}
            >
              Lưu thông tin
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.props.navigate("/QuanLyGiangVien")}
            >
              Quay lại
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(ChinhSuaThongTinGiangVien);