import { useState, useEffect } from "react"
import "../../style/mypage/question.scss"
import { useNavigate } from "react-router-dom"

const Question = () => {
  const [questions, setQuestions] = useState([
    "나는 오늘 어떤 커피를 먹을까?",
    "칼로리 신경 쓰는 나는?",
    "겨울에도 얼죽아? 감성진 뜨아?",
    "내 지갑은 오늘?",
    "",
  ])

  const [answerOptions, setAnswerOptions] = useState([
    ["고소한 커피!", "산미가 있는 커피!"],
    ["콜라도 제로로 먹는데?", "그래도 칼로리는 칼로리지", "맛있으면 0칼로리!"],
    ["아이스", "핫"],
    ["텅장이다 ㅠ", "soso", "사치 좀 부려봐?"],
    [""],
  ])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState(Array(questions.length).fill(""))
  const navigate = useNavigate()

  const handleAnswer = (answer) => {
    // 이미 선택한 답변인지 확인
    if (!answers[currentQuestionIndex]) {
      // 중복된 답변이 없을 때만 저장
      const newAnswers = [...answers]
      newAnswers[currentQuestionIndex] = answer
      setAnswers(newAnswers)
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  // 질문을 뒤로 이동할 때 현재 질문의 답변을 초기화
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      // 이전 질문으로 돌아갈 때 해당 질문의 답변 초기화 (새 배열로 업데이트)
      const newAnswers = [...answers]
      newAnswers[currentQuestionIndex - 1] = ""
      setAnswers(newAnswers)
    }
  }

  useEffect(() => {
    console.log("전송된 답변:", answers)
  }, [answers])

  return (
    <div className="question-container">
      <h2 className="question-main-text">
        CafeIn은 유저분들의 취향을 파악해서 AI 추천 음료를 보여드려요!
      </h2>
      {currentQuestionIndex < questions.length - 1 ? (
        <div>
          <h2>
            {currentQuestionIndex + 1}/{questions.length - 1}
          </h2>
          <p>{questions[currentQuestionIndex]}</p>
          <div>
            {answerOptions[currentQuestionIndex].map((option) => (
              <button key={option} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
          {/* 질문 수정 버튼 */}
          {currentQuestionIndex > 0 && (
            <button
              onClick={() => {
                handlePreviousQuestion()
              }}
            >
              이전 질문
            </button>
          )}
        </div>
      ) : (
        <div>
          <h2>결과</h2>
          {/* 모든 질문에 대한 답변이 있을 때 결과 메시지 표시 */}
          {currentQuestionIndex === questions.length - 1 ? (
            <>
              <p>CafeIn에 로그인하면 추천 음료를 알려드릴게요!</p>
              {/* 알겠습니다 버튼 추가 */}
              <button onClick={() => navigate("/mypage")}>알겠습니다</button>
            </>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default Question
