

import React, { Component } from "react";
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
import {
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";


class ThongTinCaNhanGiangvien extends Component {
  constructor(props) {
    super(props);
    this.state = {
      magv: "",
      fullName: "",
      gender: "",
      address: "",
      email: "",
      phone: "",
      isEditing: false,
    };
  }


  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/giangvien/ttgv", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = {
            magv: response.data.magv,
            fullName: response.data.name,
            gender: response.data.gioitinh,
            address: response.data.diachi,
            email: response.data.email,
            phone: response.data.sdt,
          };
          this.setState({
            ...data,
            originalData: data,
          });
        })
        .catch(() => {
          alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
          this.props.navigate("/");
        });
    } else {
      alert("Vui lòng đăng nhập trước.");
      this.props.navigate("/");
    }
  }


  handleChange = (event) => {
    this.setState({ [event.target.id || event.target.name]: event.target.value });
  };


  handleEditToggle = () => {
    const { isEditing } = this.state;


    if (isEditing) {
      const token = localStorage.getItem("token");
      axios
        .put(
          "http://127.0.0.1:8000/api/giangvien/capnhat",
          {
            magv: this.state.magv,
            name: this.state.fullName,
            gioitinh: this.state.gender,
            diachi: this.state.address,
            email: this.state.email,
            sdt: this.state.phone,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          alert("Cập nhật thông tin thành công!");
          this.setState((prevState) => ({
            isEditing: false,
            originalData: {
              magv: prevState.magv,
              fullName: prevState.fullName,
              gender: prevState.gender,
              address: prevState.address,
              email: prevState.email,
              phone: prevState.phone,
            },
          }));
        })
        .catch((error) => {
          alert(`Cập nhật thất bại: ${error.response?.data?.message || error.message}`);
        });
    } else {
      this.setState({ isEditing: true });
    }
  };


  handleCancelEdit = () => {
    this.setState((prevState) => ({
      ...prevState.originalData,
      isEditing: false,
    }));
  };


  handleMenuClick = (text) => {
    const routes = {
      "Thông Tin Giảng Viên": "/thongtinGV",
      Homepage: "/homepage",
      "Lịch giảng dạy": "/lichgiangday",
      "Điểm Danh": "/diemdanh",
      "Xem Kết Quả Điểm Danh": "/KQdiemdanh",
      "Tra cứu Sinh Viên": "/tracuu",
      "Đăng Xuất": "/",
    };
    if (routes[text]) {
      this.props.navigate(routes[text]);
    }
  };


  render() {
    const { isEditing } = this.state;


    const formFields = [
      { id: "magv", label: "Mã Giảng Viên:" },
      { id: "fullName", label: "Họ và Tên:" },
      { id: "gender", label: "Giới Tính:" },
      { id: "address", label: "Địa Chỉ:" },
      { id: "email", label: "Email:" },
      { id: "phone", label: "Số điện thoại:" },
    ];


    const menuItems = [
      { text: "Homepage", icon: <HomeIcon fontSize="large" /> },
      { text: "Thông Tin Giảng Viên", icon: <PersonIcon fontSize="large" /> },
      { text: "Lịch giảng dạy", icon: <CalendarMonthIcon fontSize="large" /> },
      { text: "Điểm Danh", icon: <QrCodeIcon fontSize="large" /> },
      { text: "Xem Kết Quả Điểm Danh", icon: <AssignmentIcon fontSize="large" /> },
      { text: "Tra cứu Sinh Viên", icon: <QrCodeScannerIcon fontSize="large" /> },
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
        <Container sx={{ flex: 1, py: 6 }}>
          <Typography variant="h4" textAlign="center" fontWeight={600} mb={3}>
            Thông Tin Giảng Viên
          </Typography>
          <Divider sx={{ mb: 4 }} />


          <Stack spacing={3} maxWidth={600} mx="auto">
            {formFields.map((field) => {
              if (field.id === "gender") {
                if (isEditing) {
                  return (
                    <FormControl fullWidth key={field.id}>
                      <InputLabel id="gender-label">Giới Tính</InputLabel>
                      <Select
                        labelId="gender-label"
                        id="gender"
                        name="gender"
                        value={this.state.gender}
                        onChange={this.handleChange}
                        label="Giới Tính"
                      >
                        <MenuItem value="Nam">Nam</MenuItem>
                        <MenuItem value="Nữ">Nữ</MenuItem>
                      </Select>
                    </FormControl>
                  );
                } else {
                  return (
                    <TextField
                      key={field.id}
                      fullWidth
                      id={field.id}
                      label={field.label}
                      value={this.state[field.id]}
                      variant="outlined"
                      disabled
                      InputLabelProps={{ style: { color: "#333" } }}
                      InputProps={{
                        style: {
                          backgroundColor: "#fff",
                          color: "#000",
                        },
                      }}
                    />
                  );
                }
              }




              return (
                <TextField
                  key={field.id}
                  fullWidth
                  id={field.id}
                  label={field.label}
                  value={this.state[field.id]}
                  onChange={this.handleChange}
                  variant="outlined"
                  disabled={!isEditing}
                  InputLabelProps={{ style: { color: "#333" } }}
                  InputProps={{
                    style: {
                      backgroundColor: "#fff",
                      color: "#000",
                    },
                    readOnly: !isEditing,
                  }}
                />
              );
            })}
          </Stack>


          <Box
            display="flex"
            justifyContent="flex-end"
            gap={2}
            mt={4}
            maxWidth={600}
            mx="auto"
          >
            {isEditing && (
              <Button
                variant="outlined"
                color="error"
                size="large"
                onClick={this.handleCancelEdit}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  px: 4,
                  width: 140,
                }}
              >
                Trở về
              </Button>
            )}
            <Button
              variant="contained"
              color={isEditing ? "success" : "primary"}
              size="large"
              onClick={this.handleEditToggle}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 4,
                width: 140,
              }}
            >
              {isEditing ? "Lưu" : "Chỉnh sửa"}
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }
}


export default withNavigation(ThongTinCaNhanGiangvien);



