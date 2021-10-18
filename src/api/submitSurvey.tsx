import axios, { AxiosResponse } from 'axios';
import { atom, selector } from 'recoil';

import { questionSelector } from '../atom/questionAtom';

const submitTrigger = atom({
  key: 'submitTrigger',
  default: false,
});

const submitSurveySelector = selector({
  key: 'submitSurveySelector',
  get: async ({ get }) => {
    const token = sessionStorage.getItem('jwt');
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;

    const Authorization = 'X-AUTH-TOKEN';
    if (token) axios.defaults.headers.common[Authorization] = token;
    const bodyData = get(questionSelector);
    const trigger = get(submitTrigger);
    console.log(bodyData);
    if (trigger) {
      try {
        const res: AxiosResponse = await axios.post(`/surveys`, bodyData);
        console.log(res);
        if (res.status !== 201) throw Error('설문이 작성되지 않았습니다.');
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    return false;
  },
});

export { submitSurveySelector, submitTrigger };
