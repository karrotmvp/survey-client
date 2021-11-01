import { atom } from 'recoil';

export type responseType = {
  choiceId?: number;
  answer?: string;
};

const responseListAtom = atom<responseType[]>({
  key: 'responseListAtom',
  default: [],
});

export default responseListAtom;
