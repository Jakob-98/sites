// ChatComponent.js
import React, { useState } from "react";
import axios from "axios";
import * as styles from './chat.module.css';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

    const handleSendMessage = async () => {
    const backendURL = process.env.GATSBY_FLASK_BACKEND_URL;
    try {
        const response = await axios.post(`${backendURL}/chat`, {
        message: userMessage,
        });
        // Extracting content from the nested structure
        const serverResponse = response.data.response.choices[0].message.content;
        setMessages([...messages, { sender: "user", text: userMessage }, { sender: "server", text: serverResponse }]);
        setUserMessage("");
    } catch (error) {
        console.error("Error sending message:", error);
    }
    };

  return (
    <div className={styles.container}>
      <div>
        {messages.map((message, index) => (
          <div key={index} className={styles.message + ' ' + styles[message.sender]}>
            {message.text}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={userMessage}
          placeholder="Hi! Tell me something about yourself."
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
