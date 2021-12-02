import axios, { AxiosResponse } from 'axios';
import { atom, selector } from 'recoil';

import { aggregationBriefType } from '@src/component/aggregation/AggregationBrief';
import { questionDataType } from '@src/page/AnswerHome';

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

type userType = {
  data: {
    daangnId: string;
    name: string;
    imageUrl: string;
    role: string;
    region: string;
    profileUrl: string;
    followersCount: number;
  };
};
const getBizprofile = selector({
  key: 'getBizprofile',
  get: async ({ get }) => {
    const jwt = await get(authorizationBizSelector);
    const token = jwt.data;
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;

    const Authorization = 'X-AUTH-TOKEN';
    if (!token) return '';
    axios.defaults.headers.common[Authorization] = token;
    try {
      const data: AxiosResponse<userType> = await axios.get<userType>(
        `/members/me`,
      );

      return data.data.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return '';
    }
  },
});

const surveyIdAtom = atom({
  key: 'surveyIdAtom',
  default: '',
});

const getBizSurveyList = selector({
  key: 'getBizSurveyList',
  get: async ({ get }) => {
    const jwt = await get(authorizationBizSelector);
    const surveyId = get(surveyIdAtom);
    const token = jwt.data;
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;

    const Authorization = 'X-AUTH-TOKEN';
    if (!token) return '';
    axios.defaults.headers.common[Authorization] = token;
    try {
      const data: AxiosResponse<{ data: questionDataType }> = await axios.get<{
        data: questionDataType;
      }>(`/surveys/${surveyId}`);

      return data.data.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return '';
    }
  },
});

const getSurveyListAtom = selector({
  key: 'getSurveyListAtom',
  get: async ({ get }) => {
    const jwt = await get(authorizationSelector);
    const surveyId = get(surveyIdAtom);
    const token = jwt.data;
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;

    const Authorization = 'X-AUTH-TOKEN';
    if (!token) return '';
    axios.defaults.headers.common[Authorization] = token;
    try {
      const data: AxiosResponse<{ data: questionDataType }> = await axios.get<{
        data: questionDataType;
      }>(`/surveys/${surveyId}`);

      return data.data.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return '';
    }
  },
});

const getAggregationBrief = selector({
  key: 'getAggregationBrief',
  get: async ({ get }) => {
    const jwt = await get(authorizationBizSelector);
    const surveyId = get(surveyIdAtom);
    const token = jwt.data;
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;

    const Authorization = 'X-AUTH-TOKEN';
    if (!token) return '';
    axios.defaults.headers.common[Authorization] = token;
    try {
      const data: AxiosResponse<{ data: aggregationBriefType }> =
        await axios.get<{
          data: aggregationBriefType;
        }>(`/aggregation/${surveyId}`);

      return data.data.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return '';
    }
  },
});

const authorizationSelector = selector({
  key: 'authorizationSelector',
  get: async ({ get }) => {
    const code = get(codeAtom);
    if (code) {
      try {
        if (code === 'general') {
          const generalRes: AxiosResponse<{ data: string }> = await axios.get<{
            data: string;
          }>(`${process.env.REACT_APP_API_URL}/auth/general`);

          return generalRes.data;
        }
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
  getSurveyListAtom,
  surveyIdAtom,
  getBizSurveyList,
  authorizationBizSelector,
  bizCodeAtom,
  codeAtom,
  authorizationSelector,
  getBizprofile,
  getAggregationBrief,
};
