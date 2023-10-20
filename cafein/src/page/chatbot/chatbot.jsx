import React, { useState, useEffect } from 'react';
import '../../style/chatbot/chatbot.scss';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    setMessages([...messages, { text: input, sender: 'user' }]);
    
    setTimeout(() => {
      let botMessage;

      if (input.toLowerCase().includes('hello')) {
        botMessage = '안녕';
      } else if (input.toLowerCase().includes('name')) {
        botMessage = '내이름은 카봇이야';
      } else if (input.toLowerCase().includes('weather')) {
        botMessage = "오늘 날씨 좋아";
      } else {
        botMessage = "머라는 지 몰랑";
      }

      setMessages([...messages, { text: input, sender: 'user' }, { text: botMessage, sender: 'bot' }]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="chatbot">
        <h2>Chatbot</h2>
      <div className="chat-messages">
        {messages.map((message,id) => (
          <div key={id} className={`chat-message ${message.sender}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      
      <div className="chat-input">
        <input
        placeholder='글 작성'
          value={input} 
          onChange={e => setInput(e.target.value)} 
          onKeyPress={e => e.key === 'Enter' && !e.shiftKey ? handleSend() : null}
        />
        
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  );
}

export default Chatbot;
