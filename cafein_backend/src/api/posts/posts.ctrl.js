import Post from '../../models/post';

// 포스트 작성
// POST /api/posts
// {
//   title: '제목',
//   body: "내용",
//   tags: ['태그1','태그2']
// }

export const write = async (ctx) => {
  const { title, body, tags } = ctx.request.body; // post 매소드이므로 request.body에서 추출
  const post = new Post({
    // title, body, tags만 가지고 있는 새로운 객체 생성
    title,
    body,
    tags,
  });
  try {
    await post.save(); // 데이터를 다 받으면 post 인스턴스에 저장
    ctx.body = post; // body에 방금 post 내용을 저장
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 포스트 목록 조회
// GET /api/posts

export const list = (ctx) => {};

// 특정 포스트 조회
// GET /api/posts/:id

export const read = (ctx) => {};

// 특정 포스트 제거
// DELETE /api/posts/:id

export const remove = (ctx) => {};

// 포스트수정(특정 필드 변경)
// PATCH /api/posts/:id
// { title, body }

export const update = (ctx) => {};
