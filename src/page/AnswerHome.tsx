import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import {
  RecoilValueReadOnly,
  useRecoilState,
  useRecoilValueLoadable,
} from 'recoil';

import LoginButton from '@component/common/button/LogInButton';
import NavBar from '@component/common/navbar/NavBar';
import { useMiniAuth } from '@hook/useAuth';
import { authorizationSelector, codeAtom } from '@src/api/authorization';
import useGet from '@src/hook/useGet';
import worker from '@src/mocks/browser';

const useLogin = (
  code: RecoilValueReadOnly<{
    data: string;
  }>,
) => {
  const jwt = useRecoilValueLoadable(code);

  useEffect(() => {
    if (jwt.state === 'hasValue') {
      sessionStorage.setItem('jwt', jwt.contents.data);
    }
  }, [code, jwt]);
};

export default function AnswerHome(): JSX.Element {
  worker.start();
  const [code, setCode] = useRecoilState(codeAtom);
  const [close, setClose] = useState(false);

  const getSurveyData = useGet(`/surveys/41`);
  useLogin(authorizationSelector);

  const auth = useMiniAuth(process.env.REACT_APP_APP_ID || '', () => {
    setClose(true);
  });

  const click = async () => {
    const resCode = await auth();

    if (resCode) {
      setCode(resCode);
    }
  };

  useEffect(() => {
    console.log('useEffect', code, close);

    if (sessionStorage.getItem('jwt')) {
      console.log(sessionStorage.getItem('jwt'));
      getSurveyData().then(console.log);
    }
  }, [code, close, getSurveyData]);

  // const responsId = 41;

  const StyledHomePage = styled.section`
    background: #ffff;
    width: 100%;
    height: 100vh;
    padding-top: 3.8rem;
    padding-bottom: 50px;
  `;
  return (
    <>
      <NavBar type="CLOSE" />
      <StyledHomePage>
        <LoginButton onClick={click} text={'로그인'} />
      </StyledHomePage>
    </>
  );
}
