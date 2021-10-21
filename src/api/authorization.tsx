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
      const res: AxiosResponse<{ data: string }> = await axios.get<{
        data: string;
      }>(
        `https://server.daangn-survey.com/api/v1/auth/business?bizProfileId=${code}`,
      );
      if (res.status !== 200) throw Error('로그인 확인 바랍니다');
      const { data } = res;
      return data;
    }
    throw Error('로그인 확인 바랍니다');
  },
});

export { codeAtom, authorizationSelector };
