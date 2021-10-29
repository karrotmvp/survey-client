import { useLocation } from 'react-router-dom';

import mini from '@api/mini';

export default function useMiniAuth(
  isBiz: boolean,
  presetUrl: string,
  appId: string,
): () => Promise<string> {
  const location = useLocation();

  const getCodeAsync = () => {
    const urlSearchParams = new URLSearchParams(location.search);
    // const isPreload = urlSearchParams.get('preload');
    if (urlSearchParams.has('code') && !isBiz) {
      return Promise.resolve<string>(urlSearchParams.get('code') || '');
    }

    return new Promise<string>((resolve, reject) => {
      mini.startPreset({
        preset: presetUrl,
        params: {
          appId,
        },
        // eslint-disable-next-line object-shorthand
        onSuccess(result) {
          if (!result && result.bizProfileId) {
            resolve('');
          }

          resolve(result.bizProfileId);
        },
        onFailure() {
          reject(new Error('fail'));
        },
        onClose() {
          resolve('');
        },
      });
    });
  };

  return getCodeAsync;
}
