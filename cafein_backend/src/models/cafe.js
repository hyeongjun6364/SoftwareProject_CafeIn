// // src/models/cafe.js
// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const cafeSchema = new Schema(
//   {
//     id: Number, // 일반 넘버 형식의 id 필드
//     name: String,
//     image: String,
//     tag: [String], // tag 필드
//   },
//   {
//     collection: 'cafe', // 컬렉션 이름을 "cafe"로 명시적으로 설정
//   },
// );

// const Cafe = mongoose.model('Cafe', cafeSchema);

// export default Cafe;

// src/models/cafe.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const cafeSchema = new Schema(
  {
    id: Number, // 일반 넘버 형식의 id 필드
    cafeid: Number,
    name: String,
    cafe: String,
    content: String,
    image: String,
    tag: [String], // tag 필드
  },
  {
    collection: 'cafe', // 컬렉션 이름을 "cafe"로 명시적으로 설정
  },
);

const Cafe = mongoose.model('Cafe', cafeSchema);

export default Cafe;
