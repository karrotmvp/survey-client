import axios, { AxiosResponse } from 'axios';
import { atom, selector } from 'recoil';

import { questionSelector } from '../atom/questionAtom';

const submitTrigger = atom({
  key: 'submitTrigger',
  default: false,
});

type profileType = {
  data: {
    daangnId: string;
    imageUrl: string;
    name: string;
    role: string;
  };
};

const submitSurveySelector = selector({
  key: 'submitSurveySelector',
  get: async ({ get }) => {
    const token = sessionStorage.getItem('jwt');
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;

    const Authorization = 'X-AUTH-TOKEN';
    if (token) axios.defaults.headers.common[Authorization] = token;
    const bodyData = get(questionSelector);
    const trigger = get(submitTrigger);
    if (trigger) {
      try {
        const { data }: AxiosResponse<profileType> =
          await axios.get<profileType>(`/members/me`);
        console.log({ ...bodyData, title: `${data.data.name} 님의 설문조사` });

        const res: AxiosResponse = await axios.post(`/surveys`, {
          ...bodyData,
          title: `${data.data.name} 님의 설문조사`,
        });
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
