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

  // 디버깅 코드
  // const handleResponse = (data) => {
  //   if (data && data.answer) {
  //     const dynamicUrlRegex = /<a href="([^"]+)" target="_blank">([^<]+)<\/a>/
  //     const match = data.answer.match(dynamicUrlRegex)

  //     const botMessages = [
  //       { text: data.answer, sender: "bot" },
  //       match && {
  //         text: <p dangerouslySetInnerHTML={{ __html: data.answer }}></p>,
  //         sender: "bot",
  //       },
  //     ].filter(Boolean)

  //     setQuestions((prevQuestions) => [...prevQuestions, ...botMessages])
  //   } else {
  //     console.error("Invalid response format:", data)
  //   }
  // }

  const handleResponse = (data) => {
    if (data && data.answer) {
      const dynamicUrlRegex = /<a href="([^"]+)" target="_blank">([^<]+)<\/a>/g
      const matches = Array.from(data.answer.matchAll(dynamicUrlRegex))

      const elements = []
      let lastIndex = 0

      for (const match of matches) {
        const [fullMatch, href, linkText] = match
        const plainText = data.answer.substring(lastIndex, match.index)

        // Add plain text
        elements.push(<span key={`plain-${lastIndex}`}>{plainText}</span>)

        // Add clickable link
        elements.push(
          <a
            key={`link-${lastIndex}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
          </a>
        )

        lastIndex = match.index + fullMatch.length
      }

      // Add the remaining plain text
      const remainingText = data.answer.substring(lastIndex)
      elements.push(<span key={`plain-${lastIndex}`}>{remainingText}</span>)

      setQuestions((prevQuestions) => [
        ...prevQuestions,
        {
          text: <p>{elements}</p>,
          sender: "bot",
        },
      ])
    } else {
      // Render plain text if there is no link
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        { text: data.answer, sender: "bot" },
      ])
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
