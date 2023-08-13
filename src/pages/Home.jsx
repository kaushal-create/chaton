import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import ChatBot from "../components/Chatbot";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
      <ChatBot />
    </div>
  );
};

export default Home;
