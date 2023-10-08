// // src/api/cafe/cafe.ctrl.js
// import fs from 'fs/promises';
// import path from 'path';
// import Cafe from '../../models/cafe';

// // 카테고리별로 id와 cafeid를 관리하는 객체
// const categories = {
//   ediya: {
//     idCounter: 0, // 이디야 카테고리용 id 카운터
//     cafeidCounter: 0, // 이디야 카테고리용 cafeid 카운터
//   },
//   hollys: {
//     idCounter: 0, // 할리스 카테고리용 id 카운터
//     cafeidCounter: 0, // 할리스 카테고리용 cafeid 카운터
//   },
// };

// // JSON 형식 파일을 읽어서 DB에 커피 데이터를 저장하는 함수
// const storeMenu = async (ctx, filePath, category) => {
//   try {
//     // MongoDB에서 저장된 데이터를 불러옵니다.
//     const existingCafes = await Cafe.find({}, 'name').lean();

//     // 절대 경로로 JSON 파일을 읽어옵니다.
//     const data = await fs.readFile(filePath, 'utf8');
//     const jsonData = JSON.parse(data);

//     // MongoDB에 저장할 데이터를 담을 배열
//     const newCafes = [];

//     // JSON 데이터에서 이미 MongoDB에 있는 name 필드의 값을 제외하고 새로운 데이터로 만듭니다.
//     jsonData.forEach((item, index) => {
//       const cafe = {
//         id: categories[category].idCounter + 1, // 일련번호를 1부터 부여
//         cafeid: categories[category].cafeidCounter + 1, // cafeid 카운터
//         name: item.prodName, // prodName을 name 필드에 저장
//         cafe: item.prodCafe,
//         content: item.prodContent || '',
//         image: item.prodImage, // prodImage를 image 필드에 저장
//         tag: item.prodTag || [], // tag 필드를 선택적으로 저장 (없을 경우 빈 배열)
//       };

//       // 기존 데이터와 중복된 경우, MongoDB에 추가하지 않고 무시합니다.
//       if (!existingCafes.some((existing) => existing.name === item.prodName)) {
//         newCafes.push(cafe);
//         // 카테고리별 카운터 증가
//         categories[category].idCounter++;
//         categories[category].cafeidCounter++;
//       }
//     });

//     // MongoDB에 새로운 데이터를 추가합니다.
//     if (newCafes.length > 0) {
//       await Cafe.insertMany(newCafes);
//     }

//     ctx.body = '데이터가 성공적으로 저장되었습니다.';
//   } catch (err) {
//     console.error(
//       '파일을 읽거나 데이터를 저장하는 중에 오류가 발생했습니다.',
//       err,
//     );
//     ctx.status = 500; // 내부 서버 오류 상태 코드
//     ctx.body = {
//       error: '파일을 읽거나 데이터를 저장하는 중에 오류가 발생했습니다.',
//     };
//   }
// };

// // DB에 저장된 커피 데이터를 조회하는 함수
// const getMenu = async (ctx, category) => {
//   try {
//     // DB에서 커피 데이터를 조회합니다.
//     const cafes = await Cafe.find(
//       { cafe: category }, // 카테고리에 따라 필터링
//       '-_id -__v',
//     ).lean();
//     ctx.body = cafes;
//   } catch (err) {
//     console.error('데이터를 조회하는 중에 오류가 발생했습니다.', err);
//     ctx.status = 500; // 내부 서버 오류 상태 코드
//     ctx.body = {
//       error: '데이터를 조회하는 중에 오류가 발생했습니다.',
//     };
//   }
// };

// // 이디야 커피 메뉴 데이터를 저장하는 API
// export const getStoredEdiyaMenu = async (ctx) => {
//   const filePath = path.join(__dirname, 'cafeinfo', 'ediya_menu.json');
//   await storeMenu(ctx, filePath, 'ediya');
// };

// // DB에 저장된 이디야 커피 데이터를 조회하는 API
// export const getEdiyaMenu = async (ctx) => {
//   await getMenu(ctx, 'ediya');
// };

// // 할리스 커피 메뉴 데이터를 저장하는 API
// export const getStoredHollysMenu = async (ctx) => {
//   const filePath = path.join(__dirname, 'cafeinfo', 'hollys_menu.json');
//   await storeMenu(ctx, filePath, 'hollys');
// };

// // DB에 저장된 할리스 커피 데이터를 조회하는 API
// export const getHollysaMenu = async (ctx) => {
//   await getMenu(ctx, 'hollys');
// };

import fs from 'fs/promises';
import path from 'path';
import Cafe from '../../models/cafe';

const categories = {
  idCounter: 0, // 전체 카테고리용 id 카운터
  ediya: {
    cafeidCounter: 0, // 이디야 카테고리용 cafeid 카운터
  },
  hollys: {
    cafeidCounter: 0, // 할리스 카테고리용 cafeid 카운터
  },
};

// 파일을 읽어서 JSON 데이터로 파싱하는 함수
const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('파일을 읽는 중에 오류가 발생했습니다.', err);
    throw err; // 에러를 호출자에게 전파
  }
};

// JSON 형식 파일을 읽어서 DB에 커피 데이터를 저장하는 함수
const storeMenu = async (ctx, filePath, category) => {
  try {
    // MongoDB에서 저장된 데이터를 불러옵니다.
    const existingCafes = await Cafe.find({}, 'name').lean();

    // JSON 파일을 읽어옵니다.
    const jsonData = await readJsonFile(filePath);

    // MongoDB에 저장할 데이터를 담을 배열
    const newCafes = [];

    // JSON 데이터 처리
    jsonData.forEach((item, index) => {
      const cafe = {
        id: categories.idCounter + 1, // 전체 카테고리용 id 카운터를 사용
        cafeid: categories[category].cafeidCounter + 1, // cafeid 카운터
        name: item.prodName, // prodName을 name 필드에 저장
        cafe: item.prodCafe,
        content: item.prodContent || '',
        image: item.prodImage, // prodImage를 image 필드에 저장
        tag: item.prodTag || [], // tag 필드를 선택적으로 저장 (없을 경우 빈 배열)
      };

      // 기존 데이터와 중복된 경우, MongoDB에 추가하지 않고 무시합니다.
      if (!existingCafes.some((existing) => existing.name === item.prodName)) {
        newCafes.push(cafe);
        // 전체 카테고리용 id 카운터 및 카페별 cafeid 카운터 증가
        categories.idCounter++;
        categories[category].cafeidCounter++;
      }
    });

    // 서브 컬렉션 이름을 생성
    const subCollectionName = `cafe/${category}`;

    // 서브 컬렉션에 새로운 데이터를 추가합니다.
    const subCollection = Cafe.db.collection(subCollectionName);
    await subCollection.insertMany(newCafes);

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

// DB에 저장된 커피 데이터를 조회하는 함수
const getMenu = async (ctx, category) => {
  try {
    // DB에서 커피 데이터를 조회합니다.
    const cafes = await Cafe.find(
      { cafe: category }, // 카테고리에 따라 필터링
      '-_id -__v',
    ).lean();
    ctx.body = cafes;
  } catch (err) {
    console.error('데이터를 조회하는 중에 오류가 발생했습니다.', err);
    ctx.status = 500; // 내부 서버 오류 상태 코드
    ctx.body = {
      error: '데이터를 조회하는 중에 오류가 발생했습니다.',
    };
  }
};

// 이디야 커피 메뉴 데이터를 저장하는 API
export const getStoredEdiyaMenu = async (ctx) => {
  const filePath = path.join(__dirname, 'cafeinfo', 'ediya_menu.json');
  await storeMenu(ctx, filePath, 'ediya');
};

// DB에 저장된 이디야 커피 데이터를 조회하는 API
export const getEdiyaMenu = async (ctx) => {
  await getMenu(ctx, 'ediya');
};

// 할리스 커피 메뉴 데이터를 저장하는 API
export const getStoredHollysMenu = async (ctx) => {
  const filePath = path.join(__dirname, 'cafeinfo', 'hollys_menu.json');
  await storeMenu(ctx, filePath, 'hollys');
};

// DB에 저장된 할리스 커피 데이터를 조회하는 API
export const getHollysaMenu = async (ctx) => {
  await getMenu(ctx, 'hollys');
};
