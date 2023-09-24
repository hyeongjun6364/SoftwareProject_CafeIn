import React, { useState } from "react"
import "../../style/mypage/question.scss"

const Question = () => {
  const [questions, setQuestions] = useState([
    "당신은 고소한 커피를 좋아하시나요?",
    // 추가 질문들을 여기에 추가할 수 있습니다.
  ])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])

  const handleAnswer = (answer) => {
    // 현재 질문에 대한 답변을 저장합니다.
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    // 다음 질문으로 이동하거나 결과를 표시합니다.
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // 모든 질문에 대한 답변을 서버로 전송하거나 결과를 처리합니다.
      // 예시: 서버로 데이터를 보내고 결과를 받는 로직을 구현합니다.
      console.log("전송된 답변:", newAnswers)
      // 결과를 처리하는 로직을 여기에 추가합니다.
    }
  }

  return (
    <div className="question-container">
      {currentQuestionIndex < questions.length ? (
        <div>
          <h2>질문</h2>
          <p>{questions[currentQuestionIndex]}</p>
          <div>
            <button onClick={() => handleAnswer("예")}>예</button>
            <button onClick={() => handleAnswer("아니요")}>아니요</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>결과</h2>
        </div>
      )}
    </div>
  )
}

export default Question
