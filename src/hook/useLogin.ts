import { useEffect, useState } from 'react';

import { RecoilValueReadOnly, useRecoilValueLoadable } from 'recoil';

export default function useLogin(
  code: RecoilValueReadOnly<{
    data: string;
  }>,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [isSuccess, setSuccess] = useState(false);
  const jwt = useRecoilValueLoadable(code);

  useEffect(() => {
    if (jwt.state === 'hasValue' && jwt.contents.data !== '') {
      sessionStorage.setItem('jwt', jwt.contents.data);
      setSuccess(true);
    }
  }, [code, jwt]);
  return [isSuccess, setSuccess];
}
