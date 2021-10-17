import { useState, useEffect, useReducer } from 'react';

import axios, { Method, AxiosRequestConfig } from 'axios';

type Action =
  | { type: 'FETCH_INIT'; payload: null }
  | { type: 'FETCH_SUCCESS'; payload: any }
  | { type: 'FETCH_FAILURE'; payload: null };

interface OptionData {
  [key: string]: any;
}
const token = sessionStorage.getItem('jwt');
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const Authorization = 'Authorization';
if (token) axios.defaults.headers.common[Authorization] = `Bearer ${token}`;

const createFetchOptions = (method: Method, bodyData?: OptionData) => {
  const config: AxiosRequestConfig = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (bodyData) config.data = bodyData;
  return config;
};

type StateType = {
  isInit: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: null;
};

function requestReducer(state: StateType, action: Action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isInit: false,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isInit: false,
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isInit: false,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
}

export default function useAxios(
  Props: boolean,
  initialUrl: string,
  methods: Method,
  bodyData?: OptionData,
): StateType {
  const [url] = useState(initialUrl);
  const [state, dispatch] = useReducer(requestReducer, {
    isInit: true,
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT', payload: null });
      try {
        if (!Props) throw new Error(`Error: URL IS NULL`);
        if (!url) throw new Error(`Error: URL IS NULL`);
        console.log(url);
        await axios(url, createFetchOptions(methods, bodyData)).then(result =>
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data }),
        );
      } catch (error) {
        console.error(error);
        dispatch({ type: 'FETCH_FAILURE', payload: null });
      }
    };
    if (Props) {
      fetchData();
    }
  }, [url, methods, Props, bodyData]);

  return { ...state };
}
