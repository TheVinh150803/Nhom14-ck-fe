import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from "./Login/LoginSV.jsx";
import ThongTinSV from "./SinhVien/thongtinSV.jsx";
import ThoiKhoaBieu from './SinhVien/thoikhoabieu.jsx';
import ScanQR from './SinhVien/QuetMaQR.jsx';
import KetQuaDiemDanhSV from './SinhVien/ketquadiemdanh.jsx';     
import QuetMaQR from "./SinhVien/QuetMaQR";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* SinhVien */}
        <Route path="/" element={<Login />} />
        <Route path="/ThongTinSV" element={<ThongTinSV />} />
        <Route path="/ThoiKhoaBieu" element={<ThoiKhoaBieu />} />
        <Route path="/QuetMaQR" element={<ScanQR />} />
        <Route path="/ketquadiemdanh" element={<KetQuaDiemDanhSV />} /> {/* SV xem */}
        <Route path="/quetmaqr" element={<QuetMaQR />} />
         {/* SinhVien */}
         
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
