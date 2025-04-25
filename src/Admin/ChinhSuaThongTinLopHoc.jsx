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

class ChinhSuaThongTinLopHoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classId: "",
      classCode: "",
      subjectName: "",
      lecturer: "",
      studentCount: 0,
      semester: "",
      monHocs: [],
      giangViens: [],
      selectedStudents: [],
      error: "",
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.navigate("/AdminLogin");
      return;
    }

    this.initializeState();
    this.fetchMonHocs();
    this.fetchGiangViens();
  }

  componentDidUpdate(prevProps) {
    // Kiểm tra nếu location.state thay đổi (khi quay lại từ ChinhSuaSinhVienVaoLopHoc)
    if (this.props.location.state !== prevProps.location.state) {
      this.initializeState();
    }
  }

  initializeState = () => {
    const { location } = this.props;

    // Kiểm tra nếu quay lại từ ChinhSuaSinhVienVaoLopHoc
    if (location.state && location.state.classInfo && location.state.selectedStudents) {
      const { classInfo, selectedStudents, studentCount } = location.state;
      this.setState({
        classId: classInfo.id_lophoc || this.state.classId,
        classCode: classInfo.name_lophoc || this.state.classCode,
        semester: classInfo.hocky || this.state.semester,
        subjectName: classInfo.subjectName || this.state.subjectName,
        lecturer: classInfo.lecturer || this.state.lecturer,
        selectedStudents: selectedStudents || this.state.selectedStudents,
        studentCount: studentCount || this.state.studentCount,
      });
      return;
    }

    // Khởi tạo từ dữ liệu ban đầu (từ QuanLyLopHoc)
    if (location.state && location.state.lopHoc) {
      const { lopHoc } = location.state;
      this.setState(
        {
          classId: lopHoc.id_lophoc,
          classCode: lopHoc.name_lophoc,
          semester: lopHoc.hocky,
          studentCount: lopHoc.student_count,
        },
        () => {
          this.fetchStudentsByClass(); // Tải danh sách sinh viên sau khi có classId
        }
      );
    }
  };

  fetchStudentsByClass = async () => {
    try {
      const token = localStorage.getItem("token");
      const { classId } = this.state;
      const response = await axios.get(
        `https://webdiemdanh-1.onrender.com/api/admin/lophoc/${classId}/sinhvien`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.setState({
        selectedStudents: response.data,
        studentCount: response.data.length, // Cập nhật số lượng sinh viên
      });
    } catch (error) {
      console.error("Error fetching students:", error);
      if (error.response && error.response.status === 404) {
        this.setState({ selectedStudents: [], studentCount: 0 }); // Nếu không có sinh viên, để mảng rỗng
      } else {
        this.setState({ error: "Không thể tải danh sách sinh viên" });
      }
    }
  };

  fetchMonHocs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://webdiemdanh-1.onrender.com/api/admin/monhoc", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const monHocs = response.data;
      this.setState((prevState) => {
        const { location } = this.props;
        const subjectNameFromState = location.state?.lopHoc?.monhoc || "";
        const matchedMonHoc = monHocs.find(monHoc => monHoc.name_monhoc === subjectNameFromState);
        return {
          monHocs,
          subjectName: matchedMonHoc ? matchedMonHoc.id_monhoc : prevState.subjectName,
        };
      });
    } catch (error) {
      console.error("Error fetching subjects:", error);
      this.setState({ error: "Không thể tải danh sách môn học" });
    }
  };

  fetchGiangViens = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://webdiemdanh-1.onrender.com/api/admin/giangvien", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const giangViens = response.data;
      this.setState((prevState) => {
        const { location } = this.props;
        const lecturerNameFromState = location.state?.lopHoc?.giangvien || "";
        const matchedGiangVien = giangViens.find(gv => gv.name_giangvien === lecturerNameFromState);
        return {
          giangViens,
          lecturer: matchedGiangVien ? matchedGiangVien.id_giangvien : prevState.lecturer,
        };
      });
    } catch (error) {
      console.error("Error fetching lecturers:", error);
      this.setState({ error: "Không thể tải danh sách giảng viên" });
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

  handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const { classId, classCode, subjectName, lecturer, semester, selectedStudents } = this.state;

      // Kiểm tra classId
      if (!classId) {
        throw new Error("Không tìm thấy ID lớp học để cập nhật");
      }

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

      // Cập nhật thông tin lớp học
      await axios.put(
        `https://webdiemdanh-1.onrender.com/api/admin/capnhatlophoc/${classId}`,
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

      // Cập nhật danh sách sinh viên
      await axios.post(
        "https://webdiemdanh-1.onrender.com/api/admin/themsinhvienvaolophoc",
        {
          id_lophoc: classId,
          sinhviens: selectedStudents.map(student => student.id_sinhvien),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Cập nhật lớp học và sinh viên thành công");
      this.props.navigate("/QuanLyLopHoc", { state: { refresh: true } });
    } catch (error) {
      console.error("Error updating class:", error);
      this.setState({ error: error.message || "Không thể cập nhật lớp học" });
    }
  };

  handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const { classId } = this.state;
      await axios.delete(`https://webdiemdanh-1.onrender.com/api/admin/xoalophoc/${classId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Xóa lớp học thành công");
      this.props.navigate("/QuanLyLopHoc", { state: { refresh: true } });
    } catch (error) {
      console.error("Error deleting class:", error);
      this.setState({ error: "Không thể xóa lớp học" });
    }
  };

  handleAddStudent = () => {
    const { classId, classCode, semester, selectedStudents, subjectName, lecturer } = this.state;
    this.props.navigate("/ChinhSuaSinhVienVaoLopHoc", {
      state: {
        classInfo: {
          id_lophoc: classId,
          name_lophoc: classCode,
          hocky: semester,
          subjectName,
          lecturer,
        },
        selectedStudents,
      },
    });
  };

  handleBack = () => {
    this.props.navigate("/QuanLyLopHoc");
  };

  render() {
    const menuItems = [
      { text: "Quản lý User", icon: <PersonIcon fontSize="large" /> },
      { text: "Quản lý lớp học", icon: <AssignmentIcon fontSize="large" /> },
      {
        text: "Quản lý lịch học",
        icon: <QrCodeScannerIcon fontSize="large" />,
      },
      { text: "Quản lý Môn Học", icon: <MenuBookIcon fontSize="large" /> },
    ];

    const { monHocs, giangViens } = this.state;

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

        {/* Main Content */}
        <Container sx={{ flex: 1, p: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Chỉnh sửa thông tin lớp học
          </Typography>

          {this.state.error && (
            <Typography color="error" mb={2}>
              {this.state.error}
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
              value={this.state.classCode}
              onChange={(e) => this.setState({ classCode: e.target.value })}
              fullWidth
              size="small"
            />

            <FormControl fullWidth size="small">
              <InputLabel>Tên môn học</InputLabel>
              <Select
                value={this.state.subjectName}
                label="Tên môn học"
                onChange={(e) => this.setState({ subjectName: e.target.value })}
              >
                {monHocs.map((subject) => (
                  <MenuItem key={subject.id_monhoc} value={subject.id_monhoc}>
                    {subject.name_monhoc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Giảng viên phụ trách</InputLabel>
              <Select
                value={this.state.lecturer}
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
                value={this.state.studentCount}
                disabled
                fullWidth
                size="small"
              />
              <Button
                variant="contained"
                sx={{ whiteSpace: "nowrap" }}
                onClick={this.handleAddStudent}
              >
                Chỉnh sửa sinh viên
              </Button>
            </Box>

            <FormControl fullWidth size="small">
              <InputLabel>Học kỳ</InputLabel>
              <Select
                value={this.state.semester}
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

            <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
              <Button
                variant="contained"
                color="success"
                onClick={this.handleBack}
              >
                Quay lại
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={this.handleDelete}
              >
                Xoá lớp học
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={this.handleSave}
              >
                Lưu thông tin
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default withNavigation(ChinhSuaThongTinLopHoc);