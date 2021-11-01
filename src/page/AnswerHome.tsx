import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import {
  RecoilValueReadOnly,
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';

import LoginButton from '@component/common/button/LogInButton';
import NavBar from '@component/common/navbar/NavBar';
import { useMiniAuth } from '@hook/useAuth';
import { authorizationSelector, codeAtom } from '@src/api/authorization';
import { questionAtomType, questionListAtom } from '@src/atom/questionAtom';
import useGet from '@src/hook/useGet';

const useLogin = (
  code: RecoilValueReadOnly<{
    data: string;
  }>,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isSuccess, setSuccess] = useState(false);
  const jwt = useRecoilValueLoadable(code);

  useEffect(() => {
    if (jwt.state === 'hasValue' && jwt.contents.data !== '') {
      sessionStorage.setItem('jwt', jwt.contents.data);
      setSuccess(true);
    }
  }, [code, jwt]);
  return [isSuccess, setSuccess];
};

export default function AnswerHome(): JSX.Element {
  const [code, setCode] = useRecoilState(codeAtom);
  const setQuestion = useSetRecoilState(questionListAtom);
  const { push } = useNavigator();
  const responseId = 162;
  type questionDataType = {
    surveyId: number;
    title: string;
    description: string;
    target: number;
    questions: questionAtomType[];
  };

  const getSurveyData = useGet<questionDataType>(`/surveys/${responseId}`);
  const [isSuccess, setSuccess] = useLogin(authorizationSelector);

  const auth = useMiniAuth(process.env.REACT_APP_APP_ID || '');

  const click = async () => {
    const resCode = await auth();
    console.log(resCode);
    if (resCode) {
      setCode(resCode);
    }
  };

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess) {
      getSurveyData().then(data => {
        if (!data) return;
        const { questions } = data;
        setQuestion(questions);
        setSuccess(false);
        push(`/responses/${responseId}/1`);
      });
    }
  }, [isSuccess, code]);

  // const responsId = 162;

  const StyledHomePage = styled.section`
    background: #ffff;
    width: 100%;
    height: calc(100vh - 3.5rem);
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
