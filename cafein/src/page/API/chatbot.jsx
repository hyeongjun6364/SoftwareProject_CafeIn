//import dotenv from 'dotenv'
import React from "react"
//429error가 뜸,,
const Chatbot = async () => {
  //dotenv.config()
  const apiKey = process.env.REACT_APP_GPT_API_KEY
  console.log(apiKey)

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say this is a test!" }],
      temperature: 0.7,
      max_tokens: 1_000,
    }),
  })
  const responseData = await response.json()
  console.log("gpt data:", responseData)
  return responseData
}

export default Chatbot
