/*
import React from 'react'

const Chatbot = async () => {
  const apiKey = process.env.REACT_APP_GPT_API_KEY;
  console.log(apiKey)
  
  //await new Promise((resolve) => setTimeout(resolve, 3000));
  
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say this is a test!" }],
      temperature: 0.7,
      max_tokens: 1_000,

    })
  });
  const responseData = await response.json();
  console.log("gpt data:", responseData);
  return responseData;
};

export default Chatbot

*/
import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    // GPT-3 API 호출
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
        prompt: input,
        max_tokens: 50,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`, // 여기에 GPT-3 API 키를 추가하세요.
        },
      });

      const reply = response.data.choices[0].text;
      setMessages([...messages, { text: input, type: 'user' }, { text: reply, type: 'bot' }]);
      setInput('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={handleInputChange}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
