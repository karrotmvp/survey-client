/* eslint-disable consistent-return */
import axios, { AxiosResponse } from 'axios';
import { atom, selector } from 'recoil';

import { aggregationBriefType } from '@src/component/aggregation/AggregationBrief';
import { questionDataType } from '@src/page/AnswerHome';
import { surveyItemType } from '@src/page/SurveyHome';

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
// 선언적으로 할수있다.
// 명령형으로 짜는 것 은 유지보수에 안좋다
const getBizProfile = selector({
  key: 'getBizProfile',
  get: async ({ get }) => {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    const sessionJWT = sessionStorage.getItem('jwt');
    const Authorization = 'X-AUTH-TOKEN';

    const jwt = await get(authorizationBizSelector);
    const token = jwt.data;

    axios.defaults.baseURL = process.env.REACT_APP_API_URL;

    if (!token && !sessionJWT) throw new Error('JWT is none');
    if (sessionJWT) {
      axios.defaults.headers.common[Authorization] = sessionJWT;
    } else axios.defaults.headers.common[Authorization] = token;
    if (!token) throw new Error('토큰이 없습니다.');
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

const surveyListTrigger = atom({
  key: 'surveyListTrigger',
  default: 0,
});

const getSurveyList = selector({
  key: 'getSurveyList',
  get: async ({ get }) => {
    get(surveyListTrigger);
    const sessionJWT = sessionStorage.getItem('jwt');
    const Authorization = 'X-AUTH-TOKEN';

    const jwt = await get(authorizationBizSelector);
    const token = jwt.data;

    axios.defaults.baseURL = process.env.REACT_APP_API_URL;

    if (!token && !sessionJWT) throw new Error('JWT is none');
    if (sessionJWT) {
      axios.defaults.headers.common[Authorization] = sessionJWT;
    } else axios.defaults.headers.common[Authorization] = token;
    try {
      const data: AxiosResponse<{ data: surveyItemType[] }> = await axios.get<{
        data: surveyItemType[];
      }>(`mongo/surveys`);

      if (data.data.data === undefined) return [];
      return data.data.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
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
    const surveyId = get(surveyIdAtom);

    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    const sessionJWT = sessionStorage.getItem('jwt');
    const Authorization = 'X-AUTH-TOKEN';

    const jwt = await get(authorizationBizSelector);
    const token = jwt.data;

    axios.defaults.baseURL = process.env.REACT_APP_API_URL;

    if (!token && !sessionJWT) throw new Error('JWT is none');
    if (sessionJWT) {
      axios.defaults.headers.common[Authorization] = sessionJWT;
    } else axios.defaults.headers.common[Authorization] = token;

    try {
      const data: AxiosResponse<{ data: questionDataType }> = await axios.get<{
        data: questionDataType;
      }>(`/mongo/surveys/${surveyId}`);

      return data.data.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      throw new Error('에러');
      return '';
    }
  },
});

type getBriefUrlsType = {
  shortUrl: string;
  originUrl: string;
};

const getBriefUrls = selector({
  key: 'getBriefUrls',
  // eslint-disable-next-line consistent-return
  get: async ({ get }) => {
    const surveyId = get(surveyIdAtom);

    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    const sessionJWT = sessionStorage.getItem('jwt');
    const Authorization = 'X-AUTH-TOKEN';

    const jwt = await get(authorizationBizSelector);
    const token = jwt.data;

    axios.defaults.baseURL = process.env.REACT_APP_API_URL;

    if (!token && !sessionJWT) throw new Error('JWT is none');
    if (sessionJWT) {
      axios.defaults.headers.common[Authorization] = sessionJWT;
    } else axios.defaults.headers.common[Authorization] = token;
    if (!token) return;
    if (!surveyId) return;
    axios.defaults.headers.common[Authorization] = token;
    try {
      const data: AxiosResponse<{ data: getBriefUrlsType }> = await axios.get<{
        data: getBriefUrlsType;
      }>(`/url/surveys/${surveyId}`);

      // eslint-disable-next-line consistent-return
      return data.data.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  },
});

const getAggregationBrief = selector({
  key: 'getAggregationBrief',
  get: async ({ get }) => {
    const surveyId = get(surveyIdAtom);

    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    const sessionJWT = sessionStorage.getItem('jwt');
    const Authorization = 'X-AUTH-TOKEN';

    const jwt = await get(authorizationBizSelector);
    const token = jwt.data;

    axios.defaults.baseURL = process.env.REACT_APP_API_URL;

    if (!token && !sessionJWT) throw new Error('JWT is none');
    if (sessionJWT) {
      axios.defaults.headers.common[Authorization] = sessionJWT;
    } else axios.defaults.headers.common[Authorization] = token;

    try {
      const data: AxiosResponse<{ data: aggregationBriefType }> =
        await axios.get<{
          data: aggregationBriefType;
        }>(`mongo/aggregate/surveys/${surveyId}`);

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
  getSurveyList,
  surveyListTrigger,
  getBriefUrls,
  surveyIdAtom,
  getBizSurveyList,
  authorizationBizSelector,
  bizCodeAtom,
  codeAtom,
  authorizationSelector,
  getBizProfile,
  getAggregationBrief,
};
