import { ReactElement, useEffect } from 'react';

import styled from '@emotion/styled';
import { useSetRecoilState } from 'recoil';

import { authorizationBizSelector, bizCodeAtom } from '@api/authorization';
import NavBar from '@component/common/navbar/NavBar';
import { ReactComponent as LogoIcon } from '@config/icon/mudda_orange.svg';
import { ReactComponent as MuddaIcon } from '@config/icon/mudda_textLogo.svg';
import { useMiniBizAuth } from '@src/hook/useAuth';
import useLogin from '@src/hook/useLogin';

export default function SurveyHome(): ReactElement {
  const jwt = useLogin(authorizationBizSelector);

  const setCode = useSetRecoilState(bizCodeAtom);
  const getBizId = useMiniBizAuth(process.env.REACT_APP_APP_ID || '');

  useEffect(() => {
    (async function () {
      const id = await getBizId();
      setCode(id);
    })();
  }, []);

  useEffect(() => {
    if (jwt.state === 'hasValue') {
      console.log(jwt.contents);
    }
  }, [jwt]);
  return (
    <StyledSurveyHomePage>
      <NavBar
        type="CLOSE"
        appendCenter={
          <LogoWrapper>
            <Logo />
            <TitleLogo />
          </LogoWrapper>
        }
      />
      <button>설문 만들기</button>
    </StyledSurveyHomePage>
  );
}

const Logo = styled(LogoIcon)`
  margin-right: 0.6rem;
`;

const TitleLogo = styled(MuddaIcon)``;

const LogoWrapper = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledSurveyHomePage = styled.section`
  background: linear-gradient(360deg, #fff2eb 0%, rgba(255, 242, 235, 0) 92.5%);
  width: 100%;
  height: 100vh;
  padding: 8rem 1.6rem 1.6rem 1.6rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
