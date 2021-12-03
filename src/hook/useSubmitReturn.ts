import { useState } from 'react';

import axios from 'axios';

type fetchType<T> = {
  data: T;
  status: string;
  message: string;
};

export default function useSubmitReturn<T>(
  initialUrl: string,
): (bodyData: unknown) => Promise<T | undefined> {
  const [url] = useState(initialUrl);

  const token = sessionStorage.getItem('jwt');
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  const Authorization = 'X-AUTH-TOKEN';
  if (token) axios.defaults.headers.common[Authorization] = token;

  // eslint-disable-next-line consistent-return
  const fetchData = async (bodyData: unknown) => {
    try {
      if (!url) throw new Error(`Error: URL IS NULL`);
      const res = await axios.post<fetchType<T>>(url, bodyData);
      if (res.status !== 201) throw new Error(`Error`);
      return res.data.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
  return fetchData;
}
