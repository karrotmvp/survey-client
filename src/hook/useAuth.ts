import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { codeAtom } from '@api/authorization';
import mini from '@api/mini';

export default function useAuth(): [string, () => void] {
  const location = useLocation();
  const [code, setCode] = useRecoilState(codeAtom);

  const getCode = () => {
    const urlSearchParams = new URLSearchParams(location.search);

    if (urlSearchParams.has('code')) {
      setCode(urlSearchParams.get('code')!);
    } else {
      mini.startPreset({
        preset: process.env.REACT_APP_PRESET_BIZ!,
        params: {
          appId: process.env.REACT_APP_APP_ID!,
        },
        // eslint-disable-next-line object-shorthand
        async onSuccess(result) {
          if (result && result.bizProfileId) {
            setCode(result.bizProfileId);
          }
        },
      });
    }
  };

  return [code, getCode];
}
