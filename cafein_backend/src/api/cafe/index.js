// src/api/cafe/index.js
import Router from 'koa-router';
import * as cafeCtrl from './cafe.ctrl';

const cafe = new Router();

cafe.get('/db_store_ediya_menu', cafeCtrl.getEdiyaMenu); // DB에 이디아 커피 메뉴 데이터를 저장하는 엔드포인트 추가
cafe.get('/db_get_ediya_menu', cafeCtrl.getStoredEdiyaMenu); // DB에 저장된 이디야 커피 데이터를 조회하는 엔드포인트 추가

export default cafe;
