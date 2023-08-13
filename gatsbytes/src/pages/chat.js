import * as React from "react"
import { Link } from "gatsby"
import MainLayout from '../layouts/MainLayout'
import ChatComponent from '../components/Chat'

const ChatPage = () => {
  return (
    <MainLayout>
      <h2>Chat with JAKOB-O-BOT-2000</h2>
      <p>Dear recruiter, thank you for your interest in me. <br/> As you have been automating the process of finding candidates, <br/> I have been automating the process of responding to your messages. <br/>Please use the chat below to ask your questions. Enjoy!</p>
      <div className="main-content" style={{width: "800px"}}>
        <div>
            <ChatComponent />
        </div>
      </div>
    </MainLayout>
  )
}

export default ChatPage;

