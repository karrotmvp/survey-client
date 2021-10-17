import { atom, selector } from 'recoil';

export type questionAtomType = {
  questionType: 2 | 3;
  text: string;
  description?: string;
  choices: { value: string }[];
};

const questionListAtom = atom<questionAtomType[]>({
  key: 'questionListAtom',
  default: [
    {
      questionType: 2,
      text: '',
      choices: [{ value: '' }],
    },
  ],
});

const questionAtom = atom<questionAtomType>({
  key: 'questionAtom',
  default: {
    questionType: 2,
    text: '',
    choices: [{ value: '' }],
  },
});

const questionListSelector = selector({
  key: 'questionListSelector',
  get: ({ get }) => {
    const questionList = get(questionListAtom);
    const len = questionList.length;
    const check = questionList.every(({ text }) => text);
    const choicesCheck = questionList.map(({ choices }) =>
      choices.every(({ value }) => value),
    );
    return { len, check, choicesCheck };
  },
});
type questionFeedBackType = {
  questionType: number;
  text: string;
};

const questionFeedBack = atom<questionFeedBackType>({
  key: 'questionFeedBack',
  default: {
    questionType: 4,
    text: '',
  },
});

const questionTarget = atom<number>({
  key: 'questionTarget',
  default: 1,
});

const questionSelector = selector({
  key: 'questionSeletor',
  get: ({ get }) => {
    const questions = get(questionListAtom);

    const title = '';
    const target = get(questionListAtom);
    const feedback = get(questionFeedBack);
    const questionList = questions.map(({ questionType, text, choices }) => {
      if (questionType === 2) {
        return { questionType, text };
      }
      return { questionType, text, choices };
    });
    return { title, target, questions: [...questionList, feedback] };
  },
});

export {
  questionSelector,
  questionAtom,
  questionFeedBack,
  questionTarget,
  questionListAtom,
  questionListSelector,
};
