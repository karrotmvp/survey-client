import axios, { AxiosResponse } from 'axios';
import { atom, selector } from 'recoil';

const codeAtom = atom({
  key: 'codeAtom',
  default: '',
});

const authorizationSelector = selector({
  key: 'authorizationSelector',
  get: async ({ get }) => {
    const code = get(codeAtom);
    if (code) {
      try {
        const res: AxiosResponse<{ data: string }> = await axios.get<{
          data: string;
        }>(
          `${process.env.REACT_APP_API_URL}/auth/business?bizProfileId=${code}`,
        );
        if (res.status !== 200) throw Error('로그인 확인 바랍니다');
        const { data } = res;
        return data;
      } catch (e) {
        console.error(e);
      }
    }
    return { data: '' };
  },
});

export { codeAtom, authorizationSelector };
