// src/api/questions/questions.ctrl.js

import Question from '../../models/questions';

// 질문 생성
export const createQuestion = async (ctx) => {
  const { question, answer } = ctx.request.body;

  // 데이터베이스에 질문과 답변 저장
  const newQuestion = new Question({
    question,
    answer,
  });

  try {
    await newQuestion.save();
    ctx.status = 201; // Created
    ctx.body = newQuestion;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 기타 질문과 관련된 API 컨트롤러 작성
// 필요한 API에 따라 함수를 추가할 수 있습니다.
