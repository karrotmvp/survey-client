import { useLocation } from 'react-router-dom';

import mini from '@api/mini';

export default function useAuth(
  presetUrl: string,
  appId: string,
  setCode: (code: string) => void,
): () => void {
  const location = useLocation();

  const getCode = () => {
    const urlSearchParams = new URLSearchParams(location.search);

    if (urlSearchParams.has('code')) {
      setCode(urlSearchParams.get('code')!);
    } else {
      mini.startPreset({
        preset: presetUrl,
        params: {
          appId,
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

  return getCode;
}
