import React, { Component } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeIcon from "@mui/icons-material/QrCode";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";
import HomeIcon from "@mui/icons-material/Home";
import {
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

class KetQuaDiemDanh extends Component {
  handleMenuClick = (text) => {
    if (text === "Thông Tin Giảng Viên") {
      this.props.navigate("/ThongTinGV");
    } 
    else if (text === "Homepage") {
      this.props.navigate("/homepage");
    }
    else if (text === "Lịch giảng dạy") {
      this.props.navigate("/lichgiangday");
    }
     else if (text === "Điểm Danh") {
      this.props.navigate("/diemdanh");
    } 
    else if (text === "Xem Kết Quả Điểm Danh") {
      this.props.navigate("/KQdiemdanh");
    } 
    else if (text === "Tra cứu Sinh Viên") {
      this.props.navigate("/tracuu");
    }
  };

  render() {
    const menuItems = [
      { text: "Homepage", icon: <HomeIcon fontSize="large" /> },
      { text: "Thông Tin Giảng Viên", icon: <PersonIcon fontSize="large" /> },
      { text: "Lịch giảng dạy", icon: <CalendarMonthIcon fontSize="large" /> },
      { text: "Điểm Danh", icon: <QrCodeIcon fontSize="large" /> },
      { text: "Xem Kết Quả Điểm Danh", icon: <AssignmentIcon fontSize="large" /> },
      { text: "Tra cứu Sinh Viên", icon: <QrCodeScannerIcon fontSize="large" /> },
    ];

    const rows = [
      { id: 1, monHoc: "Xây dựng phần mềm Web", tietHoc: "Nhóm 1 Tiết 1 ➝ 5", ngay: "2025-03-17" },
      { id: 2, monHoc: "Xây dựng phần mềm Web", tietHoc: "Nhóm 2 Tiết 1 ➝ 5", ngay: "2025-03-18" },
      { id: 3, monHoc: "Xây dựng phần mềm Web", tietHoc: "Nhóm 3 Tiết 1 ➝ 5", ngay: "2025-03-19" },
      { id: 4, monHoc: "Xây dựng phần mềm Web", tietHoc: "Nhóm 4 Tiết 1 ➝ 5", ngay: "2025-03-19" },
      { id: 5, monHoc: "Xây dựng phần mềm Web", tietHoc: "Nhóm 5 Tiết 1 ➝ 5", ngay: "2025-03-16" },
      { id: 6, monHoc: "Xây dựng phần mềm Web", tietHoc: "Nhóm 6 Tiết 1 ➝ 5", ngay: "2025-03-17" },
    ];

    const columns = [
      { field: 'id', headerName: 'STT', width: 80 },
      { field: 'monHoc', headerName: 'Môn Học', width: 250 },
      { field: 'tietHoc', headerName: 'Tiết Học', width: 200 },
      { field: 'ngay', headerName: 'Ngày Điểm Danh', width: 180 },
      {
        field: 'action',
        headerName: 'Kết Quả',
        width: 150,
        renderCell: () => (
          <Button variant="contained" size="small" color="primary">
            Xem KQ
          </Button>
        ),
      },
    ];

    return (
      <Box display="flex" height="100vh" bgcolor="#f4f6f8">
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
          <Typography variant="h5" fontWeight={700} textAlign="center" mb={3}>
            KẾT QUẢ ĐIỂM DANH
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Box
            sx={{
              height: 450,
              width: "100%",
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 3,
              p: 2,
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={6}
              rowsPerPageOptions={[6]}
              disableSelectionOnClick
            />
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(KetQuaDiemDanh);
