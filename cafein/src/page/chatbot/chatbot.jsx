// import React, { useState, useEffect } from 'react';
// import '../../style/chatbot/chatbot.scss';

// function Chatbot() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   useEffect(() => {
//     const chatMessages = document.querySelector('.chat-messages');
//     chatMessages.scrollTop = chatMessages.scrollHeight;
//   }, [messages]);

//   const handleSend = () => {
//     setMessages([...messages, { text: input, sender: 'user' }]);

//     setTimeout(() => {
//       let botMessage;

//       if (input.toLowerCase().includes('hello')) {
//         botMessage = '안녕';
//       } else if (input.toLowerCase().includes('name')) {
//         botMessage = '내이름은 카봇이야';
//       } else if (input.toLowerCase().includes('weather')) {
//         botMessage = "오늘 날씨 좋아";
//       } else {
//         botMessage = "I'm sorry, I didn't understand that.";
//       }

//       setMessages([...messages, { text: input, sender: 'user' }, { text: botMessage, sender: 'bot' }]);
//     }, 1000);

//     setInput('');
//   };

//   return (
//     <div className="chatbot">
//         <h2>Chatbot</h2>
//       <div className="chat-messages">
//         {messages.map((message,id) => (
//           <div key={id} className={`chat-message ${message.sender}`}>
//             <p>{message.text}</p>
//           </div>
//         ))}
//       </div>

//       <div className="chat-input">
//         <input
//         placeholder='글 작성'
//           value={input}
//           onChange={e => setInput(e.target.value)}
//           onKeyPress={e => e.key === 'Enter' && !e.shiftKey ? handleSend() : null}
//         />

//         <button onClick={handleSend}>전송</button>
//       </div>
//     </div>
//   );
// }

// export default Chatbot;

import React, { useState, useEffect } from "react"
import axios from "axios"
import "../../style/chatbot/chatbot.scss"

function Chatbot() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  useEffect(() => {
    const chatMessages = document.querySelector(".chat-messages")
    chatMessages.scrollTop = chatMessages.scrollHeight
  }, [messages])

  const handleSend = () => {
    const userMessage = input
    setMessages([...messages, { text: userMessage, sender: "user" }])
    setInput("")

    // Send the user's message to the server using Axios
    axios
      .post("http://127.0.0.1:5000/chat", { message: userMessage }) // 서버 주소 및 라우트 수정
      .then((response) => {
        // Extract chat messages from the response and update the state
        const chatLog = response.data.chat
        setMessages((prevMessages) => [...prevMessages, ...chatLog])
      })
      .catch((error) => {
        console.error("Error sending message to the server:", error)
      })
  }

  return (
    <div className="chatbot">
      <h2>Chatbot</h2>
      <div className="chat-messages">
        {messages.map((message, id) => (
          <div key={id} className={`chat-message ${message.role}`}>
            <p>{message.message}</p>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          placeholder="글 작성"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) =>
            e.key === "Enter" && !e.shiftKey ? handleSend() : null
          }
        />

        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  )
}

export default Chatbot
