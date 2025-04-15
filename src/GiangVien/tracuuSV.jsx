import React, { Component } from "react";
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Assignment as AssignmentIcon,
  CalendarMonth as CalendarMonthIcon,
  Person as PersonIcon,
  QrCode as QrCodeIcon,
  Search as SearchIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  QrCodeScanner as QrCodeScannerIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";
import { useMediaQuery } from "@mui/material";

// HOC để inject isMobile
function withResponsive(Component) {
  return function ResponsiveComponent(props) {
    const isMobile = useMediaQuery("(max-width:600px)");
    return <Component {...props} isMobile={isMobile} />;
  };
}

class TracuuSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      semester: "Học kỳ 2 năm học 2025 - 2026",
      attendanceDate: "2025-03-19",
      selectedClass: "",
      isDrawerOpen: false,
      students: [
        {
          id: 1,
          mssv: "DH52112086",
          name: "Nguyễn Trần Thế Vinh",
          class: "DH21_TH12",
          present: false,
          coPhep: "",
        },
        {
          id: 2,
          mssv: "DH52152145",
          name: "Huỳnh Đại Thắng",
          class: "DH21_TH12",
          present: false,
          coPhep: "",
        },
        {
          id: 3,
          mssv: "DH52112086",
          name: "Nguyễn Nhật Phi",
          class: "DH21_TH12",
          present: false,
          coPhep: "",
        },
      ],
    };
  }

  handleMenuClick = (text) => {
    const { navigate } = this.props;
    const routes = {
      "Thông Tin Giảng Viên": "/thongtinGV",
      Homepage: "/homepage",
      "Lịch giảng dạy": "/lichgiangday",
      "Điểm Danh": "/diemdanh",
      "Xem Kết Quả Điểm Danh": "/KQDiemDanh",
      "Tra cứu Sinh Viên": "/tracuu",
      "Đăng Xuất": "/",
    };
    navigate(routes[text]);
    this.setState({ isDrawerOpen: false });
  };

  handleCheckboxChange = (id) => {
    this.setState((prev) => ({
      students: prev.students.map((s) =>
        s.id === id ? { ...s, present: !s.present } : s
      ),
    }));
  };

  handleAttendanceChange = (id, value) => {
    this.setState((prev) => ({
      students: prev.students.map((s) =>
        s.id === id ? { ...s, coPhep: value } : s
      ),
    }));
  };

  toggleDrawer = (open) => {
    this.setState({ isDrawerOpen: open });
  };

  render() {
    const { isMobile } = this.props;
    const { semester, attendanceDate, selectedClass, students, isDrawerOpen } = this.state;

    const menuItems = [
      { text: "Homepage", icon: <HomeIcon /> },
      { text: "Thông Tin Giảng Viên", icon: <PersonIcon /> },
      { text: "Lịch giảng dạy", icon: <CalendarMonthIcon /> },
      { text: "Điểm Danh", icon: <QrCodeIcon /> },
      { text: "Xem Kết Quả Điểm Danh", icon: <AssignmentIcon /> },
      { text: "Tra cứu Sinh Viên", icon: <QrCodeScannerIcon /> },
      { text: "Đăng Xuất", icon: <LogoutIcon /> },
    ];

    return (
      <>
        {/* AppBar cho mobile */}
        {isMobile && (
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => this.toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6"></Typography>
            </Toolbar>
          </AppBar>
        )}

        {/* Layout */}
        <Box display="flex" bgcolor="#f4f6f8" minHeight="100vh">
          {/* Sidebar / Drawer */}
          <Drawer
            anchor="left"
            open={isDrawerOpen || !isMobile}
            onClose={() => this.toggleDrawer(false)}
            variant={isMobile ? "temporary" : "permanent"}
            sx={{
              "& .MuiDrawer-paper": {
                width: 240,
                bgcolor: "#2c3e50",
                color: "white",
              },
            }}
          >
            <Box p={2}>
              <Box component="img" src={logo} width="100%" mb={3} borderRadius={2} />
              <List>
                {menuItems.map((item, i) => (
                  <ListItem
                    key={i}
                    button
                    onClick={() => this.handleMenuClick(item.text)}
                    sx={{
                      mb: 1,
                      borderRadius: 1,
                      "&:hover": { bgcolor: "#34495e" },
                    }}
                  >
                    <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>

          {/* Nội dung chính */}
          <Box
            flex={1}
            p={3}
            mt={isMobile ? 8 : 0}
            sx={{ width: "100%" }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              Điểm Danh Sinh Viên
            </Typography>

            {/* Bộ lọc */}
            <Stack direction={isMobile ? "column" : "row"} spacing={2} mb={2}>
              <FormControl fullWidth>
                <InputLabel>Chọn đợt</InputLabel>
                <Select value={semester}>
                  <MenuItem value={semester}>{semester}</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                type="date"
                label="Ngày điểm danh"
                value={attendanceDate}
                onChange={(e) => this.setState({ attendanceDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth>
                <InputLabel>Lớp học phần</InputLabel>
                <Select
                  value={selectedClass}
                  onChange={(e) => this.setState({ selectedClass: e.target.value })}
                >
                  <MenuItem value="DH21_TH12">DH21_TH12</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained">Tìm kiếm</Button>
            </Stack>

            {/* Tìm kiếm */}
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Tìm kiếm sinh viên..."
              sx={{ backgroundColor: "#e0e0e0", mb: 2 }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1 }} />,
              }}
            />

            {/* Bảng sinh viên */}
            <TableContainer component={Paper}>
              <Table size={isMobile ? "small" : "medium"}>
                <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Điểm Danh</TableCell>
                    <TableCell>MSSV</TableCell>
                    {!isMobile && <TableCell>Họ tên</TableCell>}
                    <TableCell>Lớp</TableCell>
                    <TableCell>Có phép</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((s, i) => (
                    <TableRow key={s.id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={s.present}
                          onChange={() => this.handleCheckboxChange(s.id)}
                        />
                      </TableCell>
                      <TableCell>{s.mssv}</TableCell>
                      {!isMobile && <TableCell>{s.name}</TableCell>}
                      <TableCell>{s.class}</TableCell>
                      <TableCell>
                        <Select
                          size="small"
                          value={s.coPhep}
                          onChange={(e) =>
                            this.handleAttendanceChange(s.id, e.target.value)
                          }
                        >
                          <MenuItem value="Có">Có</MenuItem>
                          <MenuItem value="Không">Không</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </>
    );
  }
}

export default withNavigation(withResponsive(TracuuSV));
