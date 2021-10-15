import { atom, selector } from 'recoil';

type userAtomType = {
  nickName: string;
  storeName: string;
};

const userAtom = atom<userAtomType>({
  key: 'userAtom',
  default: {
    nickName: 'CHARLee',
    storeName: '찰리 사진관 카페',
  },
});

const userSelector = selector({
  key: 'userSelector',
  get: ({ get }) => {
    const { nickName, storeName } = get(userAtom);
    return `${storeName}의 ${nickName} 사장님`;
  },
});

export { userSelector, userAtom };
