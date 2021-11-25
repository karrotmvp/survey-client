/* eslint-disable no-console */
import { useCallback } from 'react';

import { useLocation } from 'react-router-dom';

import mini from '@api/mini';

const useMiniAuth = (
  appId: string,
  onClose?: () => void,
): (() => Promise<string>) => {
  const location = useLocation();
  const getCodeAsync = useCallback(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const isPreload = urlSearchParams.get('preload');

    if (urlSearchParams.has('code') || isPreload === 'true') {
      if (onClose) {
        onClose();
      }
      return Promise.resolve<string>(urlSearchParams.get('code') || '');
    }

    return new Promise<string>((resolve, reject) => {
      mini.startPreset({
        preset: process.env.REACT_APP_PRESET || '',
        params: {
          appId,
        },
        onSuccess(result: { code: string }) {
          if (result && result.code) {
            resolve(result.code);
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

const useMiniBizAuth = (
  appId: string,
  onClose?: () => void,
): (() => Promise<string>) => {
  const location = useLocation();
  const getCodeAsync = useCallback(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const isPreload = urlSearchParams.get('preload');
    console.log(isPreload, urlSearchParams.has('code'), location);
    if (isPreload === 'true') {
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
