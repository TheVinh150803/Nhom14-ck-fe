import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import các component cho Sinh Viên
import LoginSV from "./Login/LoginSV.jsx";
import ThongTinSV from "./SinhVien/thongtinSV.jsx";
import ThoiKhoaBieu from './SinhVien/thoikhoabieu.jsx';
import ScanQR from './SinhVien/QuetMaQR.jsx';
import KetQuaDiemDanhSV from './SinhVien/ketquadiemdanh.jsx';     
import MaQRDiemDanh from "./SinhVien/MaQR.jsx"; 

// Import các component cho Giảng Viên
import LoginGiangVien from "./Login/LoginGiangVien.jsx";
import ThongtinGV from './GiangVien/thongtinGV.jsx'; 
import DiemdanhGV from './GiangVien/diemdanh.jsx'; 

import HomePage from './GiangVien/homepage.jsx';
import LichGiangDayGV from './GiangVien/lichgiangday.jsx';



//Import các component cho Admin
import AdminLogin from "./Admin/AdminLogin.jsx"; // Thêm import cho AdminLogin
import QuanLyGiangVien from "./Admin/QuanLyGiangVien.jsx";
import ThemThongTinGiangVien from "./Admin/ThemThongTinGiangVien.jsx";
import ChinhSuaThongTinGiangVien from "./Admin/ChinhSuaThongTinGiangVien.jsx";
import QuanLySinhVien from "./Admin/QuanLySinhVien.jsx";
import ChinhSuaThongTinSinhVien from "./Admin/ChinhSuaThongTinSinhVien.jsx";
import ThemThongTinSinhVien from "./Admin/ThemThongTinSinhVien.jsx";
import QuanLyLopHoc from "./Admin/QuanLyLopHoc.jsx";
import ThemThongTinLopHoc from "./Admin/ThemThongTinLopHoc.jsx";
import ChinhSuaThongTinLopHoc from "./Admin/ChinhSuaThongTinLopHoc.jsx";
import ThemSinhVienVaoLopHoc from "./Admin/ThemSinhVienVaoLopHoc.jsx";
import ChinhSuaSinhVienVaoLopHoc from "./Admin/ChinhSuaSinhVienVaoLopHoc.jsx";
import QuanLyLichHoc from "./Admin/QuanLyLichHoc.jsx";
import LichHocCuaLopHoc from "./Admin/LichHocCuaLopHoc.jsx";
import ChinhSuaLichHocCuaLopHoc from "./Admin/ChinhSuaLichHocCuaLopHoc.jsx";
import ThemLichHocCuaLopHoc from "./Admin/ThemLichHocCuaLopHoc.jsx";
import QuanLyMonHoc from "./Admin/QuanLyMonHoc.jsx";
import ThemMonHoc from "./Admin/ThemMonHoc.jsx";
import ChinhSuaMonHoc from "./Admin/ChinhSuaMonHoc.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Sinh Viên */}
        <Route path="/" element={<LoginSV />} /> {/* Trang login sinh viên */}
       
        <Route path="/ThongTinSV" element={<ThongTinSV />} />
        <Route path="/ThoiKhoaBieu" element={<ThoiKhoaBieu />} />
        <Route path="/QuetMaQR" element={<ScanQR />} />
        <Route path="/ketquadiemdanh" element={<KetQuaDiemDanhSV />} />
        <Route path="/MaQRDiemDanh" element={<MaQRDiemDanh />} />

        {/* Giảng Viên */}
        <Route path="/homepage" element={<HomePage />} /> 
        <Route path="/LoginGiangVien" element={<LoginGiangVien />} /> 
        <Route path="/ThongTinGV" element={<ThongtinGV />} />
        <Route path="/diemdanh" element={<DiemdanhGV />} />
       
        <Route path="/lichgiangday" element={<LichGiangDayGV />} />

         {/* Admin */}
        <Route path="/AdminLogin" element={<AdminLogin />} /> {/* Thêm route cho đăng nhập admin */}
        <Route path="/QuanLyGiangVien" element={<QuanLyGiangVien />} />
        <Route
          path="/ThemThongTinGiangVien"
          element={<ThemThongTinGiangVien />}
        />
        <Route
          path="/ChinhSuaThongTinGiangVien"
          element={<ChinhSuaThongTinGiangVien />}
        />
        <Route path="/QuanLySinhVien" element={<QuanLySinhVien />} />
        <Route path="/ThemThongTinSinhVien" element={<ThemThongTinSinhVien />} />
        <Route
          path="/ChinhSuaThongTinSinhVien"
          element={<ChinhSuaThongTinSinhVien />}
        />
        <Route path="/ChinhSuaThongTinSinhVien/:id" element={<ChinhSuaThongTinSinhVien />} />

        <Route path="/QuanLyLopHoc" element={<QuanLyLopHoc />} />
        <Route path="/ThemThongTinLopHoc" element={<ThemThongTinLopHoc />} />
        <Route
          path="/ChinhSuaThongTinLopHoc"
          element={<ChinhSuaThongTinLopHoc />}
        />
        <Route
          path="/ThemSinhVienVaoLopHoc"
          element={<ThemSinhVienVaoLopHoc />}
        />
        <Route
          path="/ChinhSuaSinhVienVaoLopHoc"
          element={<ChinhSuaSinhVienVaoLopHoc />}
        />
        <Route path="/QuanLyLichHoc" element={<QuanLyLichHoc />} />
        <Route path="/LichHocCuaLopHoc" element={<LichHocCuaLopHoc />} />
        <Route
          path="/ChinhSuaLichHocCuaLopHoc"
          element={<ChinhSuaLichHocCuaLopHoc />}
        />
        <Route
          path="/ThemLichHocCuaLopHoc"
          element={<ThemLichHocCuaLopHoc />}
        />
        <Route path="/QuanLyMonHoc" element={<QuanLyMonHoc />} />
        <Route path="/ThemMonHoc" element={<ThemMonHoc />} />
        <Route path="/ChinhSuaMonHoc" element={<ChinhSuaMonHoc />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
