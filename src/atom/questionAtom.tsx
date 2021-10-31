import { atom, selector } from 'recoil';

import { userSelector } from './userAtom';

export type questionAtomType = {
  questionType: 2 | 3;
  text: string;
  description?: string;
  choices?: { value: string }[];
};

const questionListAtom = atom<questionAtomType[]>({
  key: 'questionListAtom',
  default: [
    {
      questionType: 3,
      text: '',
      choices: [{ value: '' }],
    },
  ],
});

const questionAtom = atom<questionAtomType>({
  key: 'questionAtom',
  default: {
    questionType: 3,
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
    const choicesCheck = questionList.map(({ questionType, choices }) => {
      if (choices === undefined) {
        return true;
      }

      return choices.every(({ value }) => {
        if (questionType === 2) {
          return true;
        }
        return value;
      });
    });

    return {
      len,
      check: check && choicesCheck.every(value => value),
      choicesCheck,
    };
  },
});
type questionFeedBackType = {
  question: string;
  answer: string;
};

const questionFeedBack = atom<questionFeedBackType>({
  key: 'questionFeedBack',
  default: {
    question: '',
    answer: '',
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
    const title = get(userSelector);
    const target = get(questionTarget);

    const questionList = questions.map(({ questionType, text, choices }) => {
      if (questionType === 2) {
        return { questionType, text };
      }
      return { questionType, text, choices };
    });

    return { title, target, questions: [...questionList] };
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
