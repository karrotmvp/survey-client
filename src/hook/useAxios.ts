import { useState, useEffect, useReducer } from 'react';

import axios from 'axios';

type Action =
  | { type: 'FETCH_INIT'; payload: null }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { type: 'FETCH_SUCCESS'; payload: any }
  | { type: 'FETCH_FAILURE'; payload: null };

type StateType = {
  isInit: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: any;
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

export default function useAxios(initialUrl: string): StateType {
  const [url] = useState(initialUrl);
  const [state, dispatch] = useReducer(requestReducer, {
    isInit: true,
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: '',
  });
  const token = sessionStorage.getItem('jwt');
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  const Authorization = 'X-AUTH-TOKEN';

  if (token) axios.defaults.headers.common[Authorization] = token;
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT', payload: null });
      try {
        if (!url) throw new Error(`Error: URL IS NULL`);
        await axios
          .get(url)
          .then(result =>
            dispatch({ type: 'FETCH_SUCCESS', payload: result.data }),
          );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        dispatch({ type: 'FETCH_FAILURE', payload: null });
      }
    };

    fetchData();
  }, [url]);

  return { ...state };
}
