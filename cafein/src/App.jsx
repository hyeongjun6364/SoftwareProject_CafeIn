import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    // 사용자 메시지를 채팅에 추가합니다.
    setChat([...chat, { text: message, user: true }]);
    setMessage('');

    // 서버로 사용자 메시지를 보냅니다.
    try {
      const response = await axios.post('http://localhost:3003', { message });
      const botReply = response.data.reply;

      // 챗봇 응답을 채팅에 추가합니다.
      setChat([...chat, { text: botReply, user: false }]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <div className="chat">
        <ul>
          {chat.map((message, index) => (
            <li key={index} className={message.user ? 'user' : 'bot'}>
              {message.text}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleMessageChange} placeholder="메시지를 입력하세요" />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}

export default App;
