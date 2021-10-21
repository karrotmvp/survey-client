import mini from '@api/mini';

export default function useMiniAuth(
  presetUrl: string,
  appId: string,
): () => Promise<string> {
  const getCodeAsync = () =>
    new Promise<string>((resolve, reject) => {
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

  return getCodeAsync;
}
