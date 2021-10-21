import { useState } from 'react';

import axios, { AxiosResponse } from 'axios';

export default function useGet<T>(
  initialUrl: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): () => Promise<AxiosResponse<T, any> | ''> {
  const [url] = useState(initialUrl);

  const fetchData = async () => {
    const token = sessionStorage.getItem('jwt');
    axios.defaults.baseURL = 'https://server.daangn-survey.com';
    const Authorization = 'X-AUTH-TOKEN';
    if (token) axios.defaults.headers.common[Authorization] = token;

    if (!url) throw new Error(`Error: URL IS NULL`);
    const res = await axios.get<T>(url);
    if (res.status !== 200) throw new Error(`Error`);
    return res;
  };
  return fetchData;
}
