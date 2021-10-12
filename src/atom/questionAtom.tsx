import { atom } from 'recoil';

type questionAtomType = {
  nickName: string;
  storeName: string;
};

const questionAtom = atom<questionAtomType>({
  key: 'questionAtom',
  default: {
    nickName: 'CHARLee',
    storeName: '찰리 사진관 카페',
  },
});

export default questionAtom;
