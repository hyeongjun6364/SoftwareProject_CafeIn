// import React, { useState } from 'react';
// import axios from 'axios';

// function Chatbot() {
//   const [inputText, setInputText] = useState('');
//   const [responseText, setResponseText] = useState('');

//   const handleInputChange = (event) => {
//     setInputText(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post('/', { input: inputText });
//       setResponseText(response.data.output);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={inputText} onChange={handleInputChange} />
//         <button type="submit">전송</button>
//       </form>
//       <p>{responseText}</p>
//     </div>
//   );
// }

// export default Chatbot;


import { useState } from 'react';

export default function Chatbot() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('./api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`request failed with status ${response.status}`)
        );
      }

      setAnswer(data.result);
      setQuestion('');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type='submit'>질문하기</button>
      </form>
      <div>{answer}</div>
    </>
  );
}