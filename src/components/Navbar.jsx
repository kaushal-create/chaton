import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FaEllipsisH } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const { isProfile, setIsProfile } = useContext(ChatContext);
  const [profileName, setProfileName] = useState(currentUser.displayName);
  const [newPic, setnewPic] = useState(currentUser.photoURL);

  const updatePic = async (e) => {
    const file = e.target.files[0];
    try {
      const date = new Date().getTime();
      const storageRef = ref(storage, `${profileName + date}`);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
          setnewPic(downloadURL);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser.uid) {
      const entry = doc(db, "users", currentUser.uid);
      updateDoc(entry, {
        displayName: profileName,
        photoURL: newPic,
      });
    }
  }, [profileName, newPic]);

  return (
    <div className="navbar">
      <div className="user" onClick={() => setIsProfile(true)}>
        <img className="profile_icon" src={currentUser.photoURL} alt="" />
        <span>{profileName}</span>
      </div>
      <div
        className={
          isProfile
            ? "profile-content profile-content-active"
            : "profile-content"
        }
      >
        <div className="profile-nav">
          <p>Profile</p>
          <div className="close-btn" onClick={() => setIsProfile(false)}>
            <FaTimes />
          </div>
        </div>

        <div className="profile-pic-name">
          <div className="profile-pic">
            <div>
              <img
                className="main_profile_icon"
                src={currentUser.photoURL}
                alt=""
              />
            </div>

            <div className="profile-avatar">
              <div>
                <span>Change Profile Picture</span>
              </div>
              <input
                type="file"
                id="profile-file"
                required
                onClick={updatePic}
              />
            </div>
          </div>

          <div className="login-content profile-name">
            <label htmlFor="name">Your name</label>
            <div className="input">
              <input
                type="text"
                id="name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
