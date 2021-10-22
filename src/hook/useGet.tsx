import { useState } from 'react';

import axios from 'axios';

export default function useGet<T>(
  initialUrl: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): () => Promise<T> {
  const [url] = useState(initialUrl);

  const fetchData = async () => {
    const token = sessionStorage.getItem('jwt');
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    const Authorization = 'X-AUTH-TOKEN';
    if (token) axios.defaults.headers.common[Authorization] = token;

    if (!url) throw new Error(`Error: URL IS NULL`);
    const res = await axios.get<T>(url);
    if (res.status !== 200) throw new Error(`Error`);

    return res.data;

  };

  return fetchData;
}
