import { useState } from "react";
import "./Login.css";
import logo from "../img/logo.jpg";
import anhtruong from "../img/anhtruong.jpg"; // <-- Import ảnh từ src/img
// export { logo, anhtruong };
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Username:", username, "Password:", password);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-form">
                    <img src={logo} alt="STU Logo" className="logo" />
                    <h2>LOGIN</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Username:
                            <input
                                type="text"
                                placeholder="Nhập username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            </label>
                        </div>
                        <div className="input-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-btn">LOGIN</button>
                    </form>
                    <div className="role-buttons">
                        <button className="role-btn">Sinh Viên</button>
                        <button className="role-btn">Giảng Viên</button>
                    </div>
                </div>

                <div className="login-image">
                    <img src={anhtruong} alt="School" />
                </div>
            </div>
        </div>
    );
};

export default Login;
