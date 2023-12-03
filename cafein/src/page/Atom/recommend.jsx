import { atom } from 'recoil';

export const recommendState = atom({
  key: 'recommendState', 
  default:[],
});
export const currentRecommendState = atom({
    key: 'currentRecommendState', 
    default:[],
  });