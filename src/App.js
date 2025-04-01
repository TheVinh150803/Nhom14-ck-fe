import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from "./Login/LoginSV.jsx";
import ThongTinSV from "./SinhVien/thongtinSV.jsx";
import ThoiKhoaBieu from './SinhVien/thoikhoabieu.jsx';
import ScanQR from './SinhVien/QuetMaQR.jsx';
import KetQuaDiemDanh from './SinhVien/ketquadiemdanh.jsx';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/Login" element={<Login />}>
        </Route>
        <Route path="/ThongTinSV" element={<ThongTinSV />}>
      </Route>
      <Route path="/ThoiKhoaBieu" element={<ThoiKhoaBieu />}> 
      </Route>
      <Route path="/QuetMaQR" element={<ScanQR />}> 
      </Route>
      <Route path="/ketquadiemdanh" element={<KetQuaDiemDanh />}> 
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
