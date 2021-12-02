import { atom } from 'recoil';

import { bizProfileType } from '@src/component/common/button/BizProfile';

export type responseType = {
  choiceId?: number;
  answer?: string;
};

const responseListAtom = atom<responseType[]>({
  key: 'responseListAtom',
  default: [],
});

const responseUserAtom = atom<bizProfileType | null>({
  key: 'responseUserAtom',
  default: null,
});

const responseIndividualAtom = atom({
  key: 'responseIndividualAtom',
  default: 0,
});

const TitleViewAtom = atom({
  key: 'TitleViewAtom',
  default: false,
});

export {
  TitleViewAtom,
  responseUserAtom,
  responseListAtom,
  responseIndividualAtom,
};
