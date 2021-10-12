import { atom } from 'recoil';

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

export default userAtom;
