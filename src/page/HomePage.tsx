import { useEffect } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';

import { authorizationSelector, codeAtom } from '@api/authorization';
import NavBar from '@component/common/navbar/NavBar';
import HomeBanner from '@component/home/HomeBanner';

import useAuth from '../hook/useAuth';

const StyledHomePage = styled.section`
  background: #ffff;
  width: 100%;
  min-height: 100vh;
  padding-top: 3.5rem;
`;

const StyledSection = styled.section`
  padding: 0 18px;
`;

const CreateQuestionButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.color.primaryOrange};
  border-radius: 12px;
  padding: 20px 100px;
  font-size: 18px;
  color: #ffff;
  font-weight: 700;
`;

export default function HomePage(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { push } = useNavigator();

  const [code, setCode] = useRecoilState(codeAtom);
  const getCode = useAuth(
    process.env.REACT_APP_PRESET_BIZ!,
    process.env.REACT_APP_APP_ID!,
    res => {
      setCode(res);
    },
  );
  const jwt = useRecoilValueLoadable(authorizationSelector);

  const handleClick = () => {
    getCode();
  };

  useEffect(() => {
    if (jwt.state === 'hasValue') {
      sessionStorage.setItem('jwt', jwt.contents.data);
    }
    if (sessionStorage.getItem('jwt')) {
      push('/question');
    }
  }, [code, jwt.state]);
  return (
    <>
      <StyledHomePage>
        <NavBar type="CLOSE" />
        <StyledSection>
          <HomeBanner />
          <CreateQuestionButton onClick={handleClick}>
            설문 만들러가기
          </CreateQuestionButton>
        </StyledSection>
      </StyledHomePage>
    </>
  );
}
