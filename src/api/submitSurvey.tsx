import axios, { AxiosResponse } from 'axios';
import { atom, selector } from 'recoil';

import { questionSelector } from '../atom/questionAtom';

const submitTrigger = atom({
  key: 'submitTrigger',
  default: false,
});

type profileType = {
  daangnId: string;
  imageUrl: string;
  name: string;
  role: string;
};

const submitSurveySelector = selector({
  key: 'submitSurveySelector',
  get: async ({ get }) => {
    const token = sessionStorage.getItem('jwt');
    axios.defaults.baseURL = 'https://server.daangn-survey.com';

    const Authorization = 'X-AUTH-TOKEN';
    if (token) axios.defaults.headers.common[Authorization] = token;
    const bodyData = get(questionSelector);
    try {
      const data: AxiosResponse<profileType> = await axios.get<profileType>(
        `/members/me`,
      );

      return {
        ...bodyData,
        title: `${data.data.name} 님의 설문조사`,
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return '';
    }
  },
});

export { submitSurveySelector, submitTrigger };
