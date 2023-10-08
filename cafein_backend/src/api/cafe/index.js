// // src/api/cafe/index.js
// import Router from 'koa-router';
// import * as cafeCtrl from './cafe.ctrl';

// const cafe = new Router();

// cafe.get('/db_store_ediya_menu', cafeCtrl.getStoredEdiyaMenu); // DB에 이디아 커피 메뉴 데이터를 저장하는 엔드포인트 추가
// cafe.get('/db_get_ediya_menu', cafeCtrl.getEdiyaMenu); // DB에 저장된 이디야 커피 데이터를 조회하는 엔드포인트 추가
// cafe.get('/db_store_hollys_menu', cafeCtrl.getStoredHollysMenu); // DB에 이디아 커피 메뉴 데이터를 저장하는 엔드포인트 추가
// cafe.get('/db_get_hollys_menu', cafeCtrl.getHollysaMenu); // DB에 저장된 이디야 커피 데이터를 조회하는 엔드포인트 추가

// export default cafe;

// src/api/cafe/index.js
import Router from 'koa-router';
import * as cafeCtrl from './cafe.ctrl';

const cafe = new Router();

// 엔드포인트와 컨트롤러를 딕셔너리로 관리
const endpoints = {
  '/db_store_ediya_menu': cafeCtrl.getStoredEdiyaMenu,
  '/db_get_ediya_menu': cafeCtrl.getEdiyaMenu,
  '/db_store_hollys_menu': cafeCtrl.getStoredHollysMenu,
  '/db_get_hollys_menu': cafeCtrl.getHollysaMenu,
};

// 딕셔너리를 사용하여 엔드포인트를 동적으로 설정
Object.entries(endpoints).forEach(([endpoint, controller]) => {
  cafe.get(endpoint, controller);
});

export default cafe;
