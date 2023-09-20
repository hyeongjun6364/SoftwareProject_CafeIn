let postId = 1; // id의 초깃값입니다.

// posts 배열 초기 데이터
const posts = [
  {
    id: 1,
    title: '제목',
    body: '내용',
  },
];

// 포스트 작성
// POST /api/posts
// {title, body}

exports.write = (ctx) => {
  // REST API의 Request Body는 ctx.request.body에서 조회할 수 있습니다.
  const { title, body } = ctx.request.body; // request(POST 또는 PUT)보낸 ctx의 payload 의 개체에서 title, body를 추출
  postId += 1; // 기존 postId 값에 1을 더합니다.
  const post = { id: postId, title, body }; // 추출한 title, body을 더해서 post 객체 업데이트
  posts.push(post); // 객체 값을 원래 객체에 없데이트
  ctx.body = post; // post 객체(복사된 객체) 값을 ctx.body(다시 전송될 HTTP 응답의 내용을 정의)에 대입(백업)
  //post는 수정하기 편함 , ctx.body는 원 데이터값
};

// 포스트 목록 조회
// GET /api/posts

exports.list = (ctx) => {
  ctx.body = posts; // 원 객체를 가져옴
};

// 특정 포스트 조회
// GET /api/posts/:id

exports.read = (ctx) => {
  const { id } = ctx.params; // :이름 으로 받는 값들을 저장
  // 주어진 id 값으로 포스트를 찾습니다.
  // 파라미터로 받아 온 값은 문자열 형식이므로 파라미터를 숫자로 변환하거나
  // 비교할 p.id 값을 문자열로 변경해야 합니다.
  const post = posts.find((p) => p.id.toString() === id); // index를 찾으면 조건에 맞는 값 중에 첫번째 값을 반환
  // 포스트가 없으면 오류를 반환합니다.
  if (!post) {
    // 포스트가 없으면
    ctx.status = 404; // status을 404로
    ctx.body = {
      // body(payload) 설정
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  ctx.body = post; // ctx.body를 업데이트
};

// 특정 포스트 제거
// DELETE /api/posts/:id

exports.remove = (ctx) => {
  const { id } = ctx.params;
  // 해당 id를 가진 post가 몇 번째인지 확인합니다.
  const index = posts.findIndex((p) => p.id.toString() === id); // 좀 더 엄격한 비교를 보장하기 위해 id를 String 타입으로 변환
  // 객체 요소의 id 인덱스를 반환
  // 포스트가 없으면 오류를 반환합니다.
  if (index === -1) {
    // 요구한 인덱스가 없으면
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  // index번째 아이템을 제거합니다.
  posts.splice(index, 1); // index에서 시작하는 posts 배열에서 하나의 요소를 제거함
  ctx.status = 204; // No Content // ststus 204로 설정
};

// 포스트 수정(교체)
// PUT /api/posts/:id
// { title, body }

exports.replace = (ctx) => {
  // PUT 매서드는 전체 포스트 정보를 입력하여 데이터를 통째로 교체할 때 사용합니다.
  const { id } = ctx.params; // :이름 데이터를 받음
  // 해당 id를 가진 post가 몇 번째인지 확인합니다.
  const index = posts.findIndex((p) => p.id.toString() === id); // id 인덱스를 찾고
  // 포스트가 없으면 오류를 반환합니다.
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  // 전체 객체를 덮어 씌웁니다.
  // 따라서 id를 제외한 기존 정보를 날리고, 객체를 새로 만듭니다.
  posts[index] = {
    // 뽑아온 index의 posts 객체를
    id, // :이름 받아온 id 업데이트하고
    ...ctx.request.body, // POST 나 PUT한 ctx.body 값을 새로운 객체로 가져옴
  };
  ctx.body = posts[index]; // ctx.body(나중에 요청할 http의 body)에 선택한 posts 객체를 업데이트
};

// 포스트수정(특정 필드 변경)
// PATCH /api/posts/:id
// { title, body }

exports.update = (ctx) => {
  // PATCH 매서드는 주어진 필드만 교체합니다.
  const { id } = ctx.params;
  // 해당 id를 가진 post가 몇 번째인지 확인합니다.
  const index = posts.findIndex((p) => p.id.toString() === id);
  // 포스트가 없으면 오류를 반환
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  // 기존 값에 정보를 덮어 씌웁니다.
  posts[index] = {
    ...posts[index], // 선택한 posts 객체를 새로운 객체로 복사해서 가져옴
    ...ctx.request.body, // http body(POST or PUT)의 내용을 가져옴
  };
  ctx.body = posts[index]; // ctx.body에 연결
};
