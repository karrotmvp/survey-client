import { useState } from 'react';

import axios from 'axios';

export default function useSubmit<T>(
  initialUrl: string,
): (bodyData: T) => Promise<void> {
  const [url] = useState(initialUrl);

  const token = sessionStorage.getItem('jwt');
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  const Authorization = 'X-AUTH-TOKEN';
  if (token) axios.defaults.headers.common[Authorization] = token;

  const fetchData = async (bodyData: unknown) => {
    try {
      if (!url) throw new Error(`Error: URL IS NULL`);
      const res = await axios.post(url, bodyData);
      if (res.status !== 201) throw new Error(`Error`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
  return fetchData;
}
