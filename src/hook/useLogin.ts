import { useEffect } from 'react';

import { RecoilValueReadOnly, useRecoilValueLoadable } from 'recoil';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useLogin(
  code: RecoilValueReadOnly<{
    data: string;
  }>,
) {
  const jwt = useRecoilValueLoadable(code);

  useEffect(() => {
    if (jwt.state === 'hasValue' && jwt.contents.data !== '') {
      sessionStorage.setItem('jwt', jwt.contents.data);
    }
  }, [code, jwt]);
  return jwt;
}
