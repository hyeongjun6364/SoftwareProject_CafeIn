// src/api/cafe/cafe.ctrl.js
import fs from 'fs/promises';
import path from 'path';
import Cafe from '../../models/cafe';

export const getEdiyaMenu = async (ctx) => {
  try {
    // MongoDB에서 저장된 데이터를 불러옵니다.
    const existingCafes = await Cafe.find({}, 'name').lean();

    // 절대 경로로 JSON 파일을 읽어옵니다.
    const filePath = path.join(__dirname, 'cafeinfo', 'ediya_menu.json');
    const data = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);

    // JSON 데이터에서 이미 MongoDB에 있는 name 필드의 값을 제외하고 새로운 데이터로 만듭니다.
    const newCafes = jsonData
      .filter(
        (item) =>
          !existingCafes.some((existing) => existing.name === item.prodName),
      )
      .map((item, index) => ({
        id: index + 1, // 일련번호를 1부터 부여,
        cafeid: index + 1, // 일련번호를 1부터 부여,
        name: item.prodName, // prodName을 name 필드에 저장
        cafe: item.prodCafe,
        content: item.prodContent || '',
        image: item.prodImage, // prodImage를 image 필드에 저장
        tag: item.prodTag || [], // tag 필드를 선택적으로 저장 (없을 경우 빈 배열)
      }));

    // MongoDB에 새로운 데이터를 추가합니다.
    if (newCafes.length > 0) {
      await Cafe.insertMany(newCafes);
    }

    ctx.body = '데이터가 성공적으로 저장되었습니다.';
  } catch (err) {
    console.error(
      '파일을 읽거나 데이터를 저장하는 중에 오류가 발생했습니다.',
      err,
    );
    ctx.status = 500; // 내부 서버 오류 상태 코드
    ctx.body = {
      error: '파일을 읽거나 데이터를 저장하는 중에 오류가 발생했습니다.',
    };
  }
};

// DB에 저장된 이디야 커피 데이터를 가져와서 반환하는 API
export const getStoredEdiyaMenu = async (ctx) => {
  try {
    // DB에서 이디야 커피 데이터를 조회합니다.
    const cafes = await Cafe.find({}, '-_id -__v').lean();

    ctx.body = cafes;
  } catch (err) {
    console.error('데이터를 조회하는 중에 오류가 발생했습니다.', err);
    ctx.status = 500; // 내부 서버 오류 상태 코드
    ctx.body = {
      error: '데이터를 조회하는 중에 오류가 발생했습니다.',
    };
  }
};
