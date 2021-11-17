const contents = {
  placeholder: {
    TEXT: '우리 동네 이웃에게 묻고 싶은 것을 적어주세요',
    DESCRIPTION: '질문에 덧붙일 것이 있다면 적어주세요 (옵션)',
    CHOICE: '객관식 답변',
    FEEDBACK: '자유롭게 의견을 남겨주세요!',
  },
  text: {
    feedback: {
      TITLE: `무따는 더 좋은 설문 서비스가 되고 싶어요`,
      SUBTITLE:
        '서비스를 사용하면서 불편하신 점, 개선점, 아이디어 등 자유롭게 의견을 남겨주시면 큰 도움이 돼요!',
    },
  },
  button: {
    SEND: '보내기',
    SKIP: '건너뛰기',
  },
};

const targetList = [
  {
    title: '모든 이웃',
    subtitle: '매장 동네 근처 모든 이웃',
    imgUrl: './../../img/target_all_Img.png',
  },
  {
    title: '비즈프로필을 방문한 이웃',
    subtitle: `사장님의 비즈프로필을\n 방문한 이웃`,
    imgUrl: './../../img/target_visited_Img.png',
  },
  {
    title: '단골',
    subtitle: `사장님의 비즈프로필을\n 단골로 추가한 이웃`,
    imgUrl: './../../img/target_customer_Img.png',
  },
];

enum questionTypes {
  TITLETYPE = 1,
  TEXTTYPE,
  CHOICETYPE,
}

export { contents, targetList, questionTypes };
