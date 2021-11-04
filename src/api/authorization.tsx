import axios, { AxiosResponse } from 'axios';
import { atom, selector } from 'recoil';

const bizCodeAtom = atom({
  key: 'bizCodeAtom',
  default: '',
});

const codeAtom = atom({
  key: 'codeAtom',
  default: '',
});

const authorizationBizSelector = selector({
  key: 'authorizationBizSelector',
  get: async ({ get }) => {
    const code = get(bizCodeAtom);
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
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
    return { data: '' };
  },
});

const authorizationSelector = selector({
  key: 'authorizationSelector',
  get: async ({ get }) => {
    const code = get(codeAtom);
    if (code) {
      try {
        const res: AxiosResponse<{ data: string }> = await axios.get<{
          data: string;
        }>(`${process.env.REACT_APP_API_URL}/auth/customer?code=${code}`);
        if (res.status !== 200) throw Error('로그인 확인 바랍니다');
        const { data } = res;
        return data;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
    return { data: '' };
  },
});

export {
  authorizationBizSelector,
  bizCodeAtom,
  codeAtom,
  authorizationSelector,
};
