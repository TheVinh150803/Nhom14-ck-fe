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
import KQDiemDanhSV from './GiangVien/xemketquadiemdanh.jsx'; 
import TraCuuSV from './GiangVien/tracuuSV.jsx'; 
import HomePage from './GiangVien/homepage.jsx';
import LichGiangDayGV from './GiangVien/lichgiangday.jsx';



//Import các component cho Admin
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
import DanhSachMonHoc from "./Admin/DanhSachMonHoc.jsx";
import LichHocCuaMonHoc from "./Admin/LichHocCuaMonHoc.jsx";
import ChinhSuaLichHocCuaMonHoc from "./Admin/ChinhSuaLichHocCuaMonHoc.jsx";
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
        <Route path="/KQDiemDanh" element={<KQDiemDanhSV />} />
        <Route path="/tracuu" element={<TraCuuSV />} />
        <Route path="/lichgiangday" element={<LichGiangDayGV />} />

         {/* Admin */}
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
                <Route
                  path="/ChinhSuaThongTinSinhVien"
                  element={<ChinhSuaThongTinSinhVien />}
                />
                <Route
                  path="/ThemThongTinSinhVien"
                  element={<ThemThongTinSinhVien />}
                />
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
                <Route path="/DanhSachMonHoc" element={<DanhSachMonHoc />} />
                <Route path="/LichHocCuaMonHoc" element={<LichHocCuaMonHoc />} />
                <Route
                  path="/ChinhSuaLichHocCuaMonHoc"
                  element={<ChinhSuaLichHocCuaMonHoc />}
                />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
