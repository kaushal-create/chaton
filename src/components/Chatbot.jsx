import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { HiOutlineChat } from "react-icons/hi";

const ChatBot = () => {
  let [toggle, setToggle] = useState(false);
  let [userText, setUserText] = useState("");

  let [botMsg, setBotMsg] = useState([]);

  async function fetchJoke() {
    const response = await fetch("https://icanhazdadjoke.com", {
      headers: {
        Accept: "application/json",
      },
    });
    return response.json();
  }

  async function getBotResponse() {
    if (userText === "") {
      setBotMsg([...botMsg, "kindly type something!"]);
    } else if (
      userText === "hi" ||
      userText === "hii" ||
      userText === "hello" ||
      userText === "hey"
    ) {
      setBotMsg([...botMsg, "Hello"]);
    } else if (userText === "how are you" || userText === "how are you?") {
      setBotMsg([...botMsg, "i am fine thank you for asking, what about you?"]);
    } else if (userText === "i am also fine") {
      setBotMsg([...botMsg, "it's great to hear that!"]);
    } else if (userText === "i have a question") {
      setBotMsg([...botMsg, "yes, ask the question"]);
    } else if (userText === "what is your name") {
      setBotMsg([...botMsg, "i have no name"]);
    } else if (userText === "how old are you") {
      setBotMsg([...botMsg, `i was made on 5 May,2023. so i am 4 days old`]);
    } else if (userText === "who made you") {
      setBotMsg([...botMsg, "i was made by Ashutosh and Kaushal"]);
    } else if (userText === "which languages can you speak") {
      setBotMsg([...botMsg, "i only speak english"]);
    } else if (userText === "where do you live") {
      setBotMsg([...botMsg, "i live in computers"]);
    } else if (userText === "who is your boss") {
      setBotMsg([...botMsg, "Ashutosh and Kaushal"]);
    } else if (userText === "bye") {
      setBotMsg([...botMsg, "bye, hope you like our conversation!"]);
    } else if (userText === "tell me a joke") {
      const { joke } = await fetchJoke();
      console.log(joke);
      setBotMsg([...botMsg, joke]);
    } else {
      setBotMsg([...botMsg, "Try asking something else"]);
    }
    let userHtml = '<p class="userText"><span>' + userText + "</span></p>";

    document
      .getElementById("chatbox")
      .insertAdjacentHTML("beforeend", userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setUserText("");
  }

  function sendButton(e) {
    if (e.keyCode === 13) {
      getBotResponse();
    }
  }

  return (
    <div className="chat-bot">
      <div className="chat-bar-collapsible">
        <button
          id="chat-button"
          type="button"
          className="collapsible"
          onClick={() => setToggle(!toggle)}
        >
          <HiOutlineChat/>
          {" ChatBot"}
        </button>

        <div className={`${toggle ? "active" : "-"} content`}>
          <div className="full-chat-block">
            <div className="outer-container">
              <div className="chat-container">
                {/* <!-- Messages --> */}
                <div id="chatbox">
                  {botMsg.map((msg) => (
                    <p className="botText">
                      <span>{msg}</span>
                    </p>
                  ))}
                </div>

                <div className="chat-bar-input-block">
                  <div id="userInput">
                    <input
                      id="textInput"
                      className="input-box"
                      placeholder="Type a message"
                      value={userText}
                      onChange={(e) => setUserText(e.target.value)}
                      onKeyDown={(e) => sendButton(e)}
                    />
                    <p></p>
                  </div>
                  <div className="chat-bar-icons">
                    <IoMdSend onClick={getBotResponse} />
                  </div>
                </div>
                <div id="chat-bar-bottom">
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
