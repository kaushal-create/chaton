import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { IoLogInOutline } from "react-icons/io5";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const { dark, setDark } = useContext(ChatContext);

  const toggleDark = () => {
    if (dark === "dark") {
      setDark("light");
    } else {
      setDark("dark");
    }
  };

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>
          <span
            style={{
              color: "rgb(101, 255, 101)",
              fontSize: "15px",
            }}
          >
            Chatting{" "}
            <span style={{ textTransform: "lowercase" }}>with . . . . </span>{" "}
          </span>
          {data.user?.displayName}
        </span>
        <div className="toggle-exit">
          <button className="toggle-btn" onClick={toggleDark}>
            {dark != "dark" ? <BsFillSunFill /> : <BsFillMoonFill />}
          </button>
          <div className="exit-icon">
            <IoLogInOutline onClick={() => signOut(auth)} />
          </div>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
