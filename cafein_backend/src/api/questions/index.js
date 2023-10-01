// src/api/questions/index.js

import Router from 'koa-router';
import * as questionsCtrl from './questions.ctrl';

const questions = new Router();

questions.post('/', questionsCtrl.createQuestion);
// 다른 question API 컨트롤러를 추가할 수 있습니다.

export default questions;
