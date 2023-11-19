// import React, { useState, useEffect } from "react"
// import axios from "axios"
// import "../../style/chatbot/chatbot.scss"

// function Chatbot() {
//   const [questions, setQuestions] = useState([])
//   const [input, setInput] = useState("")

//   useEffect(() => {
//     const chatquestions = document.querySelector(".chat-questions")
//     chatquestions.scrollTop = chatquestions.scrollHeight
//   }, [questions])

//   const handleSend = () => {
//     const userQuestion = input
//     setQuestions([...questions, { text: userQuestion, sender: "user" }])
//     setInput("")

//     // Add the loading class to show the loading animation
//     const inputElement = document.querySelector(".chat-input-field")
//     inputElement.classList.add("loading")

//     // Send the user's question to the server using Axios
//     axios
//       .post("http://localhost:4000/api/gpt/ask", { question: userQuestion })
//       .then((response) => {
//         // Check if 'answer' property exists in the response.data
//         if (response.data && response.data.answer) {
//           // Extract URL from the answer
//           const dynamicUrlRegex =
//             /<a href="([^"]+)" target="_blank">([^<]+)<\/a>/
//           const match = response.data.answer.match(dynamicUrlRegex)

//           if (match) {
//             // If URL exists, show both the answer and the URL
//             setQuestions((prevquestions) => [
//               ...prevquestions,
//               { text: response.data.answer, sender: "bot" },
//               {
//                 text: (
//                   <p>
//                     <a
//                       href={match[1]}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       {match[2]}
//                     </a>
//                   </p>
//                 ),
//                 sender: "bot",
//               },
//             ])
//           } else {
//             // If no URL, show only the answer
//             setQuestions((prevquestions) => [
//               ...prevquestions,
//               { text: response.data.answer, sender: "bot" },
//             ])
//           }
//         } else {
//           console.error("Invalid response format:", response.data)
//         }
//       })
//       .catch((error) => {
//         console.error("Error sending question to the server:", error)
//       })
//       .finally(() => {
//         // Remove the loading class to stop the loading animation
//         inputElement.classList.remove("loading")
//       })
//   }

//   return (
//     <div className="chatbot">
//       <h2>Chatbot</h2>
//       <div className="chat-questions chat-messages">
//         {questions.map((question, id) => (
//           <div
//             key={id}
//             className={`chat-message ${
//               question.sender === "user" ? "user" : "bot"
//             }`}
//           >
//             <p>{question.text}</p>
//           </div>
//         ))}
//       </div>

//       <div className="chat-input">
//         <input
//           className="chat-input-field"
//           placeholder="글 작성"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) =>
//             e.key === "Enter" && !e.shiftKey ? handleSend() : null
//           }
//         />

//         <button className="chat-input-button" onClick={handleSend}>
//           전송
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Chatbot

// import React, { useState, useEffect } from "react"
// import axios from "axios"
// import "../../style/chatbot/chatbot.scss"

// function Chatbot() {
//   const [questions, setQuestions] = useState([])
//   const [input, setInput] = useState("")
//   const [isLoading, setIsLoading] = useState(false)

//   useEffect(() => {
//     const chatquestions = document.querySelector(".chat-questions")
//     chatquestions.scrollTop = chatquestions.scrollHeight
//   }, [questions])

//   const handleInputChange = (e) => {
//     setInput(e.target.value)

//     // 텍스트가 변경될 때마다 클래스 토글
//     const inputField = e.target
//     inputField.classList.add("text-changed")

//     console.log("Text changed. Adding class...")

//     setTimeout(() => {
//       inputField.classList.remove("text-changed")
//       console.log("Class removed after 300ms.")
//     }, 300) // transition 지속 시간과 동일한 시간으로 설정
//   }

//   const handleSend = () => {
//     const userQuestion = input
//     setQuestions([...questions, { text: userQuestion, sender: "user" }])
//     setInput("")
//     setIsLoading(true)

//     // Send the user's question to the server using Axios
//     axios
//       .post("http://localhost:4000/api/gpt/ask", { question: userQuestion })
//       .then((response) => {
//         // Check if 'answer' property exists in the response.data
//         if (response.data && response.data.answer) {
//           // Extract URL from the answer
//           const dynamicUrlRegex =
//             /<a href="([^"]+)" target="_blank">([^<]+)<\/a>/
//           const match = response.data.answer.match(dynamicUrlRegex)

//           if (match) {
//             // If URL exists, show both the answer and the URL
//             setQuestions((prevquestions) => [
//               ...prevquestions,
//               { text: response.data.answer, sender: "bot" },
//               {
//                 text: (
//                   <p>
//                     <a
//                       href={match[1]}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       {match[2]}
//                     </a>
//                   </p>
//                 ),
//                 sender: "bot",
//               },
//             ])
//           } else {
//             // If no URL, show only the answer
//             setQuestions((prevquestions) => [
//               ...prevquestions,
//               { text: response.data.answer, sender: "bot" },
//             ])
//           }
//         } else {
//           console.error("Invalid response format:", response.data)
//         }
//       })
//       .catch((error) => {
//         console.error("Error sending question to the server:", error)
//       })
//       .finally(() => {
//         setIsLoading(false)
//       })
//   }

//   return (
//     <div className="chatbot">
//       <h2>Chatbot</h2>
//       <div className="chat-questions chat-messages">
//         {questions.map((question, id) => (
//           <div
//             key={id}
//             className={`chat-message ${
//               question.sender === "user" ? "user" : "bot"
//             }`}
//           >
//             <p>{question.text}</p>
//           </div>
//         ))}
//       </div>

//       <div id="wave" className="chat-input">
//         <input
//           className={`chat-input-field ${isLoading ? "loading" : ""}`}
//           placeholder="글 작성"
//           value={input}
//           onChange={handleInputChange}
//           onKeyPress={(e) =>
//             e.key === "Enter" && !e.shiftKey ? handleSend() : null
//           }
//         />

//         <button className="chat-input-button" onClick={handleSend}>
//           전송
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Chatbot

import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import "../../style/chatbot/chatbot.scss"

function Chatbot() {
  const [questions, setQuestions] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isUserTyping, setIsUserTyping] = useState(false)
  const lastMessageRef = useRef(null)

  useEffect(() => {
    const chatquestions = document.querySelector(".chat-questions")
    chatquestions.scrollTop = chatquestions.scrollHeight
  }, [questions])

  useEffect(() => {
    if (lastMessageRef.current) {
      const waveElement = document.getElementById("wave")
      waveElement.classList.add("typing")
      setIsUserTyping(true)

      const typingTimeout = setTimeout(() => {
        waveElement.classList.remove("typing")
        setIsUserTyping(false)
      }, 500)

      return () => clearTimeout(typingTimeout)
    }
  }, [input])

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSend = async () => {
    const userQuestion = input

    try {
      setQuestions([...questions, { text: userQuestion, sender: "user" }])
      setInput("")
      setIsLoading(true)

      // Send the user's question to the server using Axios
      const response = await axios.post("http://localhost:4000/api/gpt/ask", {
        question: userQuestion,
      })

      handleResponse(response.data)
    } catch (error) {
      console.error("Error sending question to the server:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResponse = (data) => {
    if (data && data.answer) {
      const dynamicUrlRegex = /<a href="([^"]+)" target="_blank">([^<]+)<\/a>/
      const match = data.answer.match(dynamicUrlRegex)

      const botMessages = [
        { text: data.answer, sender: "bot" },
        match && {
          text: (
            <p>
              <a href={match[1]} target="_blank" rel="noopener noreferrer">
                {match[2]}
              </a>
            </p>
          ),
          sender: "bot",
        },
      ].filter(Boolean)

      setQuestions((prevQuestions) => [...prevQuestions, ...botMessages])
    } else {
      console.error("Invalid response format:", data)
    }
  }

  return (
    <div className="chatbot">
      <h2>Chatbot</h2>
      <div className="chat-questions chat-messages">
        {questions.map((question, id) => (
          <div
            key={id}
            className={`chat-message ${
              question.sender === "user" ? "user" : "bot"
            }`}
          >
            <p ref={id === questions.length - 1 ? lastMessageRef : null}>
              {question.text}
            </p>
            {isUserTyping && id === questions.length - 1 && (
              <div className="typing-dots">
                <span className="dot one"></span>
                <span className="dot two"></span>
                <span className="dot three"></span>
              </div>
            )}
          </div>
        ))}

        {!input && isUserTyping && (
          <div className="chat-message user">
            <div className="typing-dots">
              <span className="dot one"></span>
              <span className="dot two"></span>
              <span className="dot three"></span>
            </div>
          </div>
        )}
      </div>

      <div id="wave" className={`chat-input ${isUserTyping ? "typing" : ""}`}>
        <span className="srtextarea"></span>
        <span className="srfriendzone"></span>
        <p className={`srtyping ${isLoading ? "typing" : ""}`}>
          <svg
            className="srsend"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            fill="#333333"
            width="20px"
            height="20px"
            viewBox="0 0 535.5 535.5"
            style={{ enableBackground: "new 0 0 535.5 535.5" }}
            xmlSpace="preserve"
          >
            <g>
              <g id="send">
                <polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75 " />
              </g>
            </g>
          </svg>
        </p>
        <input
          className={`chat-input-field ${isLoading ? "loading" : ""}`}
          placeholder="글 작성"
          value={input}
          onChange={handleInputChange}
          onKeyPress={(e) =>
            e.key === "Enter" && !e.shiftKey ? handleSend() : null
          }
        />

        <button className="chat-input-button" onClick={handleSend}>
          전송
        </button>
      </div>
    </div>
  )
}

export default Chatbot
