

// import { useState } from 'react';

// export default function Chatbot() {
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('./api/generate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ question: question }),
//       });
        
//       const data = await response.json();
//       if (response.status !== 200) {
//         throw (
//           data.error ||
//           new Error(`request failed with status ${response.status}`)
//         );
//       }

//       setAnswer(data.result);
//       setQuestion('');
//     } catch (error) {
//       console.error(error);
//       alert(error.message);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input
//           type='text'
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />
//         <button type='submit'>질문하기</button>
//       </form>
//       <div>{answer}</div>
//     </>
//   );
// }
import React, { useState } from 'react';
//import './App.css'

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message})
    })
    .then((res) => res.json())
    .then((data) => setResponse(data.message))
  }

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type='submit'>Submit</button>
      </form>
      <div>{response}</div>
    </div>
  )
}

export default App