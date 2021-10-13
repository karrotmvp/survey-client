import { atom } from 'recoil';

type questionAtomType = {
  questionType: 1 | 2 | 3;
  text: string;
  description?: string;
  choices?: { value: string }[];
};

const questionAtom = atom<questionAtomType[]>({
  key: 'questionAtom',
  default: [
    {
      questionType: 1,
      text: '안녕하세요. 카페나무입니다! 우리 가게 신메뉴에 대한 설문이에요!',
      description: '참여한 분들께는 매장 방문 시 쿠키를 드려요 ㅎㅎ',
    },
    {
      questionType: 2,
      text: '겨울에 어울리는 음료 메뉴를 추가하려고 해요. 메뉴를 추천해주세요!',
      description: 'ex) 얼그레이티, 따뜻한 코코아 ',
    },
  ],
});

const questionTitle = atom<string>({
  key: 'questionTitle',
  default: '설문',
});

const questionTarget = atom<number>({
  key: 'questionTitle',
  default: 1,
});

export { questionAtom, questionTitle, questionTarget };
