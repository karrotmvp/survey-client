import { useState } from 'react';

import axios from 'axios';

export default function useSubmit(
  initialUrl: string,
): (bodyData: unknown) => Promise<void> {
  const [url] = useState(initialUrl);

  const token = sessionStorage.getItem('jwt');
  axios.defaults.baseURL = 'https://server.daangn-survey.com/api/v1';
  const Authorization = 'X-AUTH-TOKEN';
  if (token) axios.defaults.headers.common[Authorization] = token;

  const fetchData = async (bodyData: unknown) => {
    if (!url) throw new Error(`Error: URL IS NULL`);
    const res = await axios.post(url, bodyData);
    if (res.status !== 201) throw new Error(`Error`);
  };

  return fetchData;
}
