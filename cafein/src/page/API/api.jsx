const openai = require('openai');

// API 토큰을 설정합니다. 'YOUR_API_KEY'를 실제 API 키로 대체합니다.
const apiKey = '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';

const getChatGPTResponse = async (question) => {
  try {
    const response = await openai.completions.create({
      engine: 'text-davinci-002', // 엔진 선택 (다른 엔진을 선택할 수도 있습니다.)
      prompt: question,
      max_tokens: 1000, // 원하는 최대 답변 길이를 설정합니다.
    }, { headers: { 'Authorization': `Bearer ${apiKey}` } });

    return response.choices[0].text.trim();
  } catch (error) {
    console.error('Error fetching ChatGPT response:', error);
    return '죄송합니다. 답변을 가져오지 못했습니다.';
  }
};

export default getChatGPTResponse