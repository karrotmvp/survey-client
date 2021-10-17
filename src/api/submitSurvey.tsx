import axios, { AxiosResponse } from 'axios';
import { selector } from 'recoil';

import { questionSelector } from '../atom/questionAtom';

const token = sessionStorage.getItem('jwt');
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const Authorization = 'Authorization';
if (token) axios.defaults.headers.common[Authorization] = `Bearer ${token}`;

const submitSurveySelector = selector({
  key: 'submitSurveySelector',
  get: async ({ get }) => {
    const bodyData = get(questionSelector);
    console.log(bodyData);
    try {
      const res: AxiosResponse = await axios.post(`/surveys`, bodyData);
      if (res.status !== 200) throw Error('로그인 확인 바랍니다');
      const { data } = res;
      console.log(data);
      return data;
    } catch (e) {
      console.error(e);
    }
    return { code: '' };
  },
});

export default submitSurveySelector;
