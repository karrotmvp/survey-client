import { atom, selector } from 'recoil';

type userAtomType = {
  nickName: string;
  storeName: string;
};

const userAtom = atom<userAtomType>({
  key: 'userAtom',
  default: {
    nickName: '',
    storeName: '',
  },
});

const userSelector = selector({
  key: 'userSelector',
  get: ({ get }) => {
    const { storeName } = get(userAtom);
    const data = `${storeName} 님의 설문조사`;
    return data;
  },
});

export { userSelector, userAtom };
