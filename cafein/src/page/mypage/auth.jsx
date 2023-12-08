// src/recoil/auth.js
import { atom } from "recoil"

export const loggedInState = atom({
  key: "loggedInState",
  default: false, // 초기 로그인 상태는 false
})
