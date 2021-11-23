import { useEffect, useReducer } from 'react';

import useGet from './useGet';

type Action<T> =
  | { type: 'FETCH_INIT'; payload: null }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { type: 'FETCH_SUCCESS'; payload: T }
  | { type: 'FETCH_FAILURE'; payload: null };

export type StateType<T> = {
  isInit: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: T | undefined;
};

const createRequestReduce =
  <T>() =>
  (state: StateType<T>, action: Action<T>): StateType<T> => {
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
  };

export default function useLoadableGet<T>(
  initialUrl: string,
  nonToken?: boolean,
): StateType<T> {
  const getData = useGet<T>(initialUrl, nonToken);
  const dataFetchReducer = createRequestReduce<T>();
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isInit: true,
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: undefined,
  });

  const fetchData = async () => {
    dispatch({ type: 'FETCH_INIT', payload: null });
    try {
      const res = await getData();
      if (res) {
        dispatch({ type: 'FETCH_SUCCESS', payload: res });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      dispatch({ type: 'FETCH_FAILURE', payload: null });
    }
  };
  useEffect(() => {
    fetchData();
  }, [initialUrl]);
  return state;
}
