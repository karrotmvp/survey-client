/* eslint-disable no-console */
import { useCallback } from 'react';

import mini from '@api/mini';

const useMiniAuth = (
  appId: string,
  onClose?: () => void,
): (() => Promise<string | undefined>) => {
  const getCodeAsync = useCallback(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    // eslint-disable-next-line no-alert
    console.log(urlSearchParams.has('code'), window.location.search);
    if (urlSearchParams.has('code')) {
      if (onClose) {
        onClose();
      }
      return Promise.resolve<string>(urlSearchParams.get('code') || '');
    }

    return new Promise<string>((resolve, reject) => {
      resolve('general');
    });
  }, [appId, onClose]);
  return getCodeAsync;
};

const useMiniBizAuth = (
  appId: string,
  onClose?: () => void,
): (() => Promise<string>) => {
  const getCodeAsync = useCallback(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const isPreload = urlSearchParams.get('preload');

    if (isPreload) {
      console.log(isPreload, urlSearchParams.has('code'), 'in');
      return Promise.resolve<string>('');
    }

    return new Promise<string>((resolve, reject) => {
      mini.startPreset({
        preset: process.env.REACT_APP_PRESET_BIZ || '',
        params: {
          appId,
        },
        onSuccess(result: { bizProfileId: string }) {
          if (result && result.bizProfileId) {
            resolve(result.bizProfileId);
          }
        },
        onFailure() {
          reject(new Error('fail'));
        },
        onClose,
      });
    });
  }, [appId, onClose]);

  return getCodeAsync;
};

export { useMiniAuth, useMiniBizAuth };
