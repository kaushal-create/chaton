import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { BsFillEyeFill } from "react-icons/bs";

const Login = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className="login-form">
      <h2>Chat On</h2>
      <form className="form-content" onSubmit={login}>
        <h1>LOGIN</h1>
        <div className="login-content">
          <label htmlFor="email">Email</label>
          <div className="input">
            <input type="text" id="email" />
          </div>
        </div>

        <div className="login-content">
          <label htmlFor="password">Password</label>
          <div className={showPassword ? "input password-active" : "input"}>
            <input type={showPassword ? "text" : "password"} id="password" />
            <span onClick={() => setShowPassword(!showPassword)}>
              <BsFillEyeFill className="eye-icon" />
            </span>
          </div>
        </div>

        <button className="all-btn  login-btn">Log In</button>

        <p className="forgot-password">Forgot Password?</p>
        <p className="register-account">
          Don't have an account? <Link to="/register">Register Here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
