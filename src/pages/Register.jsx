import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { RiAccountPinCircleFill } from "react-icons/ri";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmpassword = e.target[3].value;
    const file = e.target[4].files[0];

    try {
      // Create a user
      if (password != confirmpassword) {
        alert("Password and confirm password should match!");
        return;
      }
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            // Create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            // Create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (error) {
            console.log(error);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="registration-form">
      <h2>Chat On</h2>
      <form className="form-content" onSubmit={register}>
        <h1>REGISTER</h1>

        <div className="login-content">
          <label htmlFor="name">Name</label>
          <div className="input">
            <input type="text" id="name" required />
          </div>
        </div>

        <div className="login-content">
          <label htmlFor="email">Email</label>
          <div className="input">
            <input type="text" id="email" required />
          </div>
        </div>

        <div className="login-content">
          <label htmlFor="password">Password</label>
          <div className={showPassword ? "input password-active" : "input"}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              <BsFillEyeFill className="eye-icon" />
            </span>
          </div>
        </div>

        <div className="login-content">
          <label htmlFor="confirm-password">Confirm Password</label>
          <div className="input">
            <input type="text" id="confirm-password" required />
          </div>
        </div>

        <div className="avatar">
          <RiAccountPinCircleFill className="avatar-icon" />
          <div>
            <span>Add Profile Picture</span>
            <input type="file" id="file" required />
          </div>
        </div>

        <button className="all-btn login-btn">CREATE ACCOUNT</button>

        <p className="register-account">
          Already have a account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
