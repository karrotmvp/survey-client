import { useCallback } from 'react';

import axios from 'axios';

type fetchType<T> = {
  data: T;
  status: string;
  message: string;
};
export default function useGet<T>(
  initialUrl: string,
  nonToken?: boolean,
): () => Promise<T | undefined> {
  const fetchData = useCallback(async () => {
    const token = sessionStorage.getItem('jwt');
    if (!token && !nonToken) return Promise.resolve(undefined);
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    const Authorization = 'X-AUTH-TOKEN';
    if (token) axios.defaults.headers.common[Authorization] = token;
    if (!initialUrl) throw new Error(`Error: URL IS NULL`);
    const res = await axios.get<fetchType<T>>(initialUrl);
    if (res.status !== 200) throw new Error(`Error`);
    // eslint-disable-next-line consistent-return
    return res.data.data;
  }, [initialUrl]);

  return fetchData;
}
