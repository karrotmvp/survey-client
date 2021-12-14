import { useCallback } from 'react';

import { useNavigator } from '@karrotframe/navigator';
import axios from 'axios';

type fetchType<T> = {
  data: T;
  status: number;
  message: string;
};
export default function useGet<T>(
  initialUrl: string,
  nonToken?: boolean,
): () => Promise<T | undefined> {
  const { replace } = useNavigator();
  const fetchData = useCallback(async () => {
    const token = sessionStorage.getItem('jwt');
    if (!token && !nonToken) return Promise.resolve(undefined);
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    if (!nonToken) {
      const Authorization = 'X-AUTH-TOKEN';
      if (token) axios.defaults.headers.common[Authorization] = token;
    }
    if (!initialUrl) throw new Error(`Error: URL IS NULL`);
    try {
      const res = await axios.get<fetchType<T>>(initialUrl);

      return res.data.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.request.status === 404) {
          replace('/404');
        }
      }
      return Promise.resolve(undefined);
    }
  }, [initialUrl]);

  return fetchData;
}
