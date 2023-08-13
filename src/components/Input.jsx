import React, { useContext, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { RiAttachment2 } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [isDoc, setIsDoc] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      handleSend();
    }
  };

  const handleSend = async () => {
    if (img || isDoc) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img ? img : isDoc).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          if (img) {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: new Date().getHours() + ":" + new Date().getMinutes(),
                type: "img",
                url: downloadURL,
              }),
            });
          }

          if (isDoc) {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: new Date().getHours() + ":" + new Date().getMinutes(),
                type: "doc",
                url: downloadURL,
              }),
            });
          }
        });
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: new Date().getHours() + ":" + new Date().getMinutes(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
    setIsDoc(null);
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type a message"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKeypress}
      />
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => {
            if (
              e.target.files[0].type === "image/jpeg" ||
              e.target.files[0].type === "image/png" ||
              e.target.files[0].type === "image/jpg"
            ) {
              setImg(e.target.files[0]);
            } else {
              setIsDoc(e.target.files[0]);
            }
          }}
        />
        <label htmlFor="file">
          <BiImageAdd className="img_icon" />
        </label>
        <label htmlFor="file">
          <RiAttachment2 className="img_icon" />
        </label>

        <button onClick={handleSend}>
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default Input;
