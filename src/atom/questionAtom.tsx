import { atom } from 'recoil';

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

const questionTitle = atom<string>({
  key: 'questionTitle',
  default: '설문',
});

const questionTarget = atom<number>({
  key: 'questionTarget',
  default: 1,
});

export { questionAtom, questionTitle, questionTarget, questionListAtom };
