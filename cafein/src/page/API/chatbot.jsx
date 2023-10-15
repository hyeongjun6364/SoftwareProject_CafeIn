// import React, { useState } from "react"

// const Chatbot = () => {
//   const [responseData, setResponseData] = useState(null);
  
//   const apiKey = process.env.REACT_APP_GPT_API_KEY

//   const fetchData = async (retryAfterSecs = 0) => {
//     setTimeout(async () => {
//       try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${apiKey}`,
//           },
//           body: JSON.stringify({
//             model: "gpt-3.5-turbo",
//             messages: [{ role: "user", content: "Say this is a test!" }],
//             temperature: 0,
//             max_tokens: 7,
//           }),
//         })
  
//         if (!response.ok && response.status === 429) { // Too Many Requests
//           let retryAfterSecs = parseInt(response.headers.get('Retry-After'), 10);
//           console.log(`Rate limit exceeded. Retrying after ${retryAfterSecs} seconds.`);
//           fetchData(retryAfterSecs);
//         } else if (!response.ok) { 
//           throw new Error('API request failed');
//         } else {
//           const data = await response.json();
//           setResponseData(data);
//         }
  
//       } catch (error) {
//         console.error(error);
//       }
//     }, retryAfterSecs * 1000); // convert to milliseconds
//   };

//   return (
//     <div>
//       <button onClick={() => fetchData()}>Fetch Data</button>
//       {responseData && <p>{JSON.stringify(responseData)}</p>}
//     </div>
//   );
// }

// export default Chatbot;
import { useCallback, useEffect } from 'react';
const OpenAI = require('openai');

function Chatbot() {
  // OpenAI API 호출
  const fetchOpenApi = useCallback(async () => {
    const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true });

    try {
      const res = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: 'Say this is a test',
        temperature: 0,
        max_tokens: 7,
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
    
  }, []);

  useEffect(() => {
    fetchOpenApi(); // Mount 시 호출한다.
  }, []);

  return <div className="App">openai</div>;
}

export default Chatbot;
