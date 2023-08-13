import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { HiArrowDownCircle } from "react-icons/hi2";
import { FaFileDownload } from "react-icons/fa";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // function deleteMessage(message) {
  //   const subscriber = db.collection("chats").doc(data.chatId).onSnapshot(message => {
  //     message.forEach(msg => {
  //       console.log("->" , msg);
  //     });
  //   })
  // }

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
      </div>
      <div className="messageContent">
        <div className="msg_date">
          {message.text != "" && <p>{message.text}</p>}

          <span className="date_time">{message.date}</span>
        </div>

        {message.type == "img" && (
          <img className="chat_img" src={message.url} alt="" />
        )}
        <div className="chat_doc_down">
          {message.type == "doc" && <embed src={message.url} />}
          {message.type == "doc" && (
            <a
              href={message.url}
              target="_blank"
              className="download-btn"
              download="../img/attach.png"
            >
              <HiArrowDownCircle className="download_icon" />
            </a>
          )}
        </div>
      </div>
      {/* <button onClick={(message) => deleteMessage(message)}>Delete</button> */}
    </div>
  );
};

export default Message;
