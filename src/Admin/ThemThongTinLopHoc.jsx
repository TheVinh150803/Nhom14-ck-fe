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
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import logo from "../img/logo.jpg";
import withNavigation from "./withNavigation";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import axios from "axios";

class ThemThongTinLopHoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classCode: "",
      subjectName: "",
      lecturer: "",
      studentCount: 0,
      semester: "",
      monHocs: [],
      giangViens: [],
      error: "",
      selectedStudents: [],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.navigate("/AdminLogin");
      return;
    }
    this.fetchMonHocs();
    this.fetchGiangViens();

    const { location } = this.props;
    if (location.state) {
      this.setState({
        studentCount: location.state.studentCount || 0,
        classCode: location.state.classInfo?.name_lophoc || "",
        subjectName: location.state.classInfo?.id_monhoc || "",
        lecturer: location.state.classInfo?.id_giangvien || "",
        semester: location.state.classInfo?.hocky || "",
        selectedStudents: location.state.selectedStudents || [],
      });
    }
  }

  fetchMonHocs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
      }
      const response = await axios.get("https://webdiemdanh-1.onrender.com/api/admin/monhoc", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.setState({ monHocs: response.data });
    } catch (error) {
      console.error("Error fetching subjects:", error);
      this.setState({ error: "Không thể tải danh sách môn học" });
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        this.props.navigate("/AdminLogin");
      }
    }
  };

  fetchGiangViens = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
      }
      const response = await axios.get("https://webdiemdanh-1.onrender.com/api/admin/giangvien", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.setState({ giangViens: response.data });
    } catch (error) {
      console.error("Error fetching lecturers:", error);
      this.setState({ error: "Không thể tải danh sách giảng viên" });
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        this.props.navigate("/AdminLogin");
      }
    }
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

  handleAddStudent = () => {
    const { classCode, subjectName, lecturer, studentCount, semester, selectedStudents } = this.state;
    this.props.navigate("/ThemSinhVienVaoLopHoc", {
      state: {
        classInfo: {
          name_lophoc: classCode,
          id_monhoc: subjectName,
          id_giangvien: lecturer,
          hocky: semester,
        },
        studentCount,
        selectedStudents,
      },
    });
  };

  handleSave = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại.");
        }
        const { classCode, subjectName, lecturer, semester, selectedStudents } = this.state;

        // Validate inputs
        if (!classCode || typeof classCode !== "string" || classCode.length > 50) {
            throw new Error("Tên lớp học không hợp lệ");
        }
        if (!subjectName || isNaN(subjectName)) {
            throw new Error("Môn học không hợp lệ");
        }
        if (!lecturer || isNaN(lecturer)) {
            throw new Error("Giảng viên không hợp lệ");
        }
        if (!semester || typeof semester !== "string" || semester.length > 20) {
            throw new Error("Học kỳ không hợp lệ");
        }

        console.log("Data sent to /admin/themlophoc:", {
            name_lophoc: classCode,
            id_monhoc: subjectName,
            id_giangvien: lecturer,
            hocky: semester,
        });

        const classResponse = await axios.post(
            "https://webdiemdanh-1.onrender.com/api/admin/themlophoc",
            {
                name_lophoc: classCode,
                id_monhoc: subjectName,
                id_giangvien: lecturer,
                hocky: semester,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const id_lophoc = classResponse.data.lophoc.id_lophoc;
        console.log("Created class with id_lophoc:", id_lophoc);

        if (selectedStudents.length > 0) {
            console.log("Selected students (sinhviens) before sending:", selectedStudents);
            console.log("Data sent to /admin/themsinhvienvaolophoc:", {
                id_lophoc,
                sinhviens: selectedStudents,
            });

            const studentResponse = await axios.post(
                "https://webdiemdanh-1.onrender.com/api/admin/themsinhvienvaolophoc",
                {
                    id_lophoc,
                    sinhviens: selectedStudents,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Response from /admin/themsinhvienvaolophoc:", studentResponse.data);
        }

        alert("Thêm lớp học và sinh viên thành công");
        this.props.navigate("/QuanLyLopHoc", { state: { refresh: true } });
    } catch (error) {
        console.error("Error adding class:", error);
        if (error.response) {
            console.log("Error response from server:", error.response.data);
        }
        this.setState({ error: error.message || "Không thể thêm lớp học" });
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            this.props.navigate("/AdminLogin");
        }
    }
};

  handleBack = () => {
    this.props.navigate("/QuanLyLopHoc");
  };

  render() {
    const { classCode, subjectName, lecturer, studentCount, semester, monHocs, giangViens, error } = this.state;

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

        <Container sx={{ flex: 1, p: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Thêm thông tin lớp học
          </Typography>

          {error && (
            <Typography color="error" mb={2}>
              {error}
            </Typography>
          )}

          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={2}
            maxWidth={500}
          >
            <TextField
              label="Tên lớp học"
              value={classCode}
              onChange={(e) => this.setState({ classCode: e.target.value })}
              fullWidth
              size="small"
            />

            <FormControl fullWidth size="small">
              <InputLabel>Tên môn học</InputLabel>
              <Select
                value={subjectName}
                label="Tên môn học"
                onChange={(e) => this.setState({ subjectName: e.target.value })}
              >
                {monHocs.map((monHoc) => (
                  <MenuItem key={monHoc.id_monhoc} value={monHoc.id_monhoc}>
                    {monHoc.name_monhoc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Giảng viên phụ trách</InputLabel>
              <Select
                value={lecturer}
                label="Giảng viên phụ trách"
                onChange={(e) => this.setState({ lecturer: e.target.value })}
              >
                {giangViens.map((gv) => (
                  <MenuItem key={gv.id_giangvien} value={gv.id_giangvien}>
                    {gv.name_giangvien}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box display="flex" gap={2}>
              <TextField
                label="Số lượng sinh viên"
                value={studentCount}
                onChange={(e) => this.setState({ studentCount: e.target.value })}
                fullWidth
                size="small"
                disabled
              />
              <Button
                variant="contained"
                sx={{ whiteSpace: "nowrap" }}
                onClick={this.handleAddStudent}
              >
                Thêm sinh viên
              </Button>
            </Box>

            <FormControl fullWidth size="small">
              <InputLabel>Học kỳ</InputLabel>
              <Select
                value={semester}
                label="Học kỳ"
                onChange={(e) => this.setState({ semester: e.target.value })}
              >
                <MenuItem value="Học kỳ 1 2024-2025">
                  Học kỳ 1 2024-2025
                </MenuItem>
                <MenuItem value="Học kỳ 2 2024-2025">
                  Học kỳ 2 2024-2025
                </MenuItem>
                <MenuItem value="Học kỳ 1 2025-2026">
                  Học kỳ 1 2025-2026
                </MenuItem>
              </Select>
            </FormControl>

            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSave}
              >
                Lưu thông tin
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={this.handleBack}
              >
                Quay lại
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(ThemThongTinLopHoc);