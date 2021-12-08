import axios, { AxiosResponse } from 'axios';
import { atom, selector } from 'recoil';

type profileType = {
  daangnId: string;
  imageUrl: string;
  name: string;
  role: string;
};

const surveyIdAtom = atom({
  key: 'surveyId',
  default: 0,
});
const surveyData = selector({
  key: 'submitSurveySelector',
  get: async ({ get }) => {
    const token = sessionStorage.getItem('jwt');
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;

    const Authorization = 'X-AUTH-TOKEN';
    if (token) axios.defaults.headers.common[Authorization] = token;
    const surveyId = get(surveyIdAtom);
    try {
      const data: AxiosResponse<unknown> = await axios.get<profileType>(
        `/surveys/${surveyId}`,
      );

      return data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return '';
    }
  },
});

export { surveyData, surveyIdAtom };
