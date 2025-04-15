import React, { useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeIcon from "@mui/icons-material/QrCode";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  useMediaQuery,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function LichGiangDayGV(props) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const menuItems = [
    { text: "Homepage", icon: <HomeIcon fontSize="large" /> },
    { text: "Thông Tin Giảng Viên", icon: <PersonIcon fontSize="large" /> },
    { text: "Lịch giảng dạy", icon: <CalendarMonthIcon fontSize="large" /> },
    { text: "Điểm Danh", icon: <QrCodeIcon fontSize="large" /> },
    { text: "Xem Kết Quả Điểm Danh", icon: <AssignmentIcon fontSize="large" /> },
    { text: "Tra cứu Sinh Viên", icon: <QrCodeScannerIcon fontSize="large" /> },
    { text: "Đăng Xuất", icon: <LogoutIcon fontSize="large" /> },
  ];

  const handleMenuClick = (text) => {
    if (text === "Thông Tin Giảng Viên") {
      props.navigate("/thongtinGV");
    } else if (text === "Homepage") {
      props.navigate("/homepage");
    } else if (text === "Lịch giảng dạy") {
      props.navigate("/lichgiangday");
    } else if (text === "Điểm Danh") {
      props.navigate("/diemdanh");
    } else if (text === "Xem Kết Quả Điểm Danh") {
      props.navigate("/KQdiemdanh");
    } else if (text === "Tra cứu Sinh Viên") {
      props.navigate("/tracuu");
    } else if (text === "Đăng Xuất") {
      props.navigate("/");
    }
  };

  const schedule = [
    {
      id: "CS030319",
      subject: "Thực Hành Lập Trình Web",
      tiet: "10 - 12",
      phong: "PM05",
      ngay: "Thứ 2",
      thoigian: "07/10/2024 - 15/12/2024",
    },
    {
      id: "CS040420",
      subject: "Cơ sở dữ liệu",
      tiet: "7 - 9",
      phong: "PM03",
      ngay: "Thứ 4",
      thoigian: "09/10/2024 - 20/12/2024",
    },
  ];

  return (
    <>
      <CssBaseline />
      {/* AppBar for Mobile */}
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
             
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Box display="flex" flexDirection={isMobile ? "column" : "row"} height="auto" bgcolor="#f4f6f8">
        {/* Sidebar */}
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setDrawerOpen(false)}
          variant={isMobile ? "temporary" : "permanent"}
          sx={{
            "& .MuiDrawer-paper": {
              width: 240,
              bgcolor: "#2c3e50",
              color: "white",
              boxSizing: "border-box",
            },
          }}
        >
          <Box
            width={240}
            bgcolor="#2c3e50"
            p={2}
            height="100%"
            display="flex"
            flexDirection="column"
          >
            <Box component="img" src={logo} width="100%" mb={4} borderRadius={2} />
            <List>
              {menuItems.map((item, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => {
                    handleMenuClick(item.text);
                    setDrawerOpen(false);
                  }}
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
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            py: 4,
            px: isMobile ? 2 : 4,
            mt: isMobile ? 8 : 0, // Add margin-top to avoid overlap with AppBar
          }}
        >
          <Typography variant={isMobile ? "h5" : "h4"} textAlign="center" fontWeight={600} mb={3}>
            Lịch Giảng Dạy
          </Typography>
          <Divider sx={{ mb: 4 }} />

          {/* Table Container with Horizontal Scrolling */}
          <Paper elevation={3} sx={{ overflowX: "auto" }}>
            <Table size={isMobile ? "small" : "medium"}>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Mã Môn</strong></TableCell>
                  <TableCell><strong>Tên Môn</strong></TableCell>
                  <TableCell><strong>Tiết</strong></TableCell>
                  <TableCell><strong>Phòng</strong></TableCell>
                  <TableCell><strong>Ngày</strong></TableCell>
                  <TableCell><strong>Thời gian</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedule.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.subject}</TableCell>
                    <TableCell>{row.tiet}</TableCell>
                    <TableCell>{row.phong}</TableCell>
                    <TableCell>{row.ngay}</TableCell>
                    <TableCell>{row.thoigian}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default withNavigation(LichGiangDayGV);
