import { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import mini from '@src/api/mini';
import NavBar from '@src/component/common/navbar/NavBar';

export default function AnswerComplete(): JSX.Element {
  const history = useHistory();

  useEffect(() => {
    const unblock = history.block((location, action) => {
      if (action === 'POP') {
        mini.close();
        return false;
      }
      return undefined;
    });

    return () => {
      unblock();
    };
  }, [history]);
  return (
    <>
      <NavBar type="CLOSE" />
    </>
  );
}
