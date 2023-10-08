// import { useState, useEffect } from "react"
// import "../../style/mypage/question.scss"
// import { useNavigate } from "react-router-dom"

// const Question = () => {
//   const [questions, setQuestions] = useState([
//     "나는 오늘 어떤 커피를 먹을까?",
//     "칼로리 신경 쓰는 나는?",
//     "겨울에도 얼죽아? 감성진 뜨아?",
//     "내 지갑은 오늘?",
//     "",
//   ])

//   const [answerOptions, setAnswerOptions] = useState([
//     ["고소한 커피!", "산미가 있는 커피!"],
//     ["콜라도 제로로 먹는데?", "그래도 칼로리는 칼로리지", "맛있으면 0칼로리!"],
//     ["아이스", "핫"],
//     ["텅장이다 ㅠ", "soso", "사치 좀 부려봐?"],
//     [""],
//   ])

//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
//   const [answers, setAnswers] = useState(Array(questions.length).fill(""))
//   const navigate = useNavigate()

//   const handleAnswer = (answer) => {
//     // 이미 선택한 답변인지 확인
//     if (!answers[currentQuestionIndex]) {
//       // 중복된 답변이 없을 때만 저장
//       const newAnswers = [...answers]
//       newAnswers[currentQuestionIndex] = answer
//       setAnswers(newAnswers)
//     }

//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1)
//     }
//   }

//   // 질문을 뒤로 이동할 때 현재 질문의 답변을 초기화
//   const handlePreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1)
//       // 이전 질문으로 돌아갈 때 해당 질문의 답변 초기화 (새 배열로 업데이트)
//       const newAnswers = [...answers]
//       newAnswers[currentQuestionIndex - 1] = ""
//       setAnswers(newAnswers)
//     }
//   }

//   useEffect(() => {
//     console.log("전송된 답변:", answers)
//   }, [answers])

//   return (
//     <div className="question-container">
//       <h2 className="question-main-text">
//         CafeIn은 유저분들의 취향을 파악해서 AI 추천 음료를 보여드려요!
//       </h2>
//       {currentQuestionIndex < questions.length - 1 ? (
//         <div>
//           <h2>
//             {currentQuestionIndex + 1}/{questions.length - 1}
//           </h2>
//           <p>{questions[currentQuestionIndex]}</p>
//           <div>
//             {answerOptions[currentQuestionIndex].map((option) => (
//               <button key={option} onClick={() => handleAnswer(option)}>
//                 {option}
//               </button>
//             ))}
//           </div>
//           {/* 질문 수정 버튼 */}
//           {currentQuestionIndex > 0 && (
//             <button
//               onClick={() => {
//                 handlePreviousQuestion()
//               }}
//             >
//               이전 질문
//             </button>
//           )}
//         </div>
//       ) : (
//         <div>
//           <h2>결과</h2>
//           {/* 모든 질문에 대한 답변이 있을 때 결과 메시지 표시 */}
//           {currentQuestionIndex === questions.length - 1 ? (
//             <>
//               <p>CafeIn에 로그인하면 추천 음료를 알려드릴게요!</p>
//               <button onClick={() => navigate("/mypage")}>알겠습니다</button>
//             </>
//           ) : null}
//         </div>
//       )}
//     </div>
//   )
// }

// export default Question

import { useState, useEffect } from "react"
import "../../style/mypage/question.scss"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Question = (props) => {
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

  const handleFinalSubmit = () => {
    // 질문을 모두 선택했을 때 서버로 데이터를 보냄
    const data = {
      username: props.username,
      questions: questions.slice(0, questions.length - 1), // 마지막 빈 질문을 제외한 질문 배열
      answers: answers.slice(0, answers.length - 1), // 마지막 빈 답변을 제외한 답변 배열
    }

    // 서버로 데이터를 POST 요청
    axios
      .post("http://localhost:4000/api/auth/register/question", data)
      .then((response) => {
        console.log("서버 응답:", response.data)
        // 마이페이지로 이동
        navigate("/mypage")
      })
      .catch((error) => {
        console.error("데이터를 서버에 보내는 중 오류 발생:", error)
      })
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
              <button onClick={handleFinalSubmit}>알겠습니다</button>
            </>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default Question
