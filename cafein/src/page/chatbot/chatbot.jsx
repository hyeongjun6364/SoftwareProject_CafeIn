import React, { useState, useEffect } from "react"
import axios from "axios"
import "../../style/chatbot/chatbot.scss"

function Chatbot() {
  const [questions, setQuestions] = useState([])
  const [input, setInput] = useState("")

  useEffect(() => {
    const chatquestions = document.querySelector(".chat-questions")
    chatquestions.scrollTop = chatquestions.scrollHeight
  }, [questions])

  const handleSend = () => {
    const userQuestion = input
    setQuestions([...questions, { text: userQuestion, sender: "user" }])
    setInput("")

    // Send the user's question to the server using Axios
    axios
      .post("http://localhost:4000/api/gpt/ask", { question: userQuestion })
      .then((response) => {
        // Check if 'answer' property exists in the response.data
        if (response.data && response.data.answer) {
          // Extract URL from the answer
          const dynamicUrlRegex =
            /<a href="([^"]+)" target="_blank">([^<]+)<\/a>/
          const match = response.data.answer.match(dynamicUrlRegex)

          if (match) {
            // If URL exists, show both the answer and the URL
            setQuestions((prevquestions) => [
              ...prevquestions,
              { text: response.data.answer, sender: "bot" },
              {
                text: (
                  <p>
                    <a
                      href={match[1]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {match[2]}
                    </a>
                  </p>
                ),
                sender: "bot",
              },
            ])
          } else {
            // If no URL, show only the answer
            setQuestions((prevquestions) => [
              ...prevquestions,
              { text: response.data.answer, sender: "bot" },
            ])
          }
        } else {
          console.error("Invalid response format:", response.data)
        }
      })
      .catch((error) => {
        console.error("Error sending question to the server:", error)
      })
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
            <p>{question.text}</p>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          className="chat-input-field"
          placeholder="글 작성"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
