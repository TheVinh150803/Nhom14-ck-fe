import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import các component cho Sinh Viên
import LoginSV from "./Login/LoginSV.jsx";
import ThongTinSV from "./SinhVien/thongtinSV.jsx";
import ThoiKhoaBieu from './SinhVien/thoikhoabieu.jsx';
import ScanQR from './SinhVien/QuetMaQR.jsx';
import KetQuaDiemDanhSV from './SinhVien/ketquadiemdanh.jsx';     
import QuetMaQR from "./SinhVien/QuetMaQR";

// Import các component cho Giảng Viên
import LoginGiangVien from "./Login/LoginGiangVien.jsx";
import ThongtinGV from './GiangVien/thongtinGV.jsx'; 
import DiemdanhGV from './GiangVien/diemdanh.jsx'; 
import KQDiemDanhSV from './GiangVien/xemketquadiemdanh.jsx'; 

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
        <Route path="/quetmaqr" element={<QuetMaQR />} />

        {/* Giảng Viên */}
        <Route path="/LoginGiangVien" element={<LoginGiangVien />} /> {/* Trang login giảng viên */}
        <Route path="/ThongTinGV" element={<ThongtinGV />} />
        <Route path="/diemdanh" element={<DiemdanhGV />} />
        <Route path="/KQDiemDanh" element={<KQDiemDanhSV />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
