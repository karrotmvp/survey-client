import { ReactElement, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { useSetRecoilState } from 'recoil';

import { authorizationBizSelector, bizCodeAtom } from '@api/authorization';
import NavBar from '@component/common/navbar/NavBar';
import { ReactComponent as LogoIcon } from '@config/icon/mudda_orange.svg';
import { ReactComponent as MuddaIcon } from '@config/icon/mudda_textLogo.svg';
import UpDownModal from '@src/component/common/modal/UpDownModal';
import { useMiniBizAuth } from '@src/hook/useAuth';
import useLogin from '@src/hook/useLogin';

export default function SurveyHome(): ReactElement {
  const jwt = useLogin(authorizationBizSelector);
  const setCode = useSetRecoilState(bizCodeAtom);
  const getBizId = useMiniBizAuth(process.env.REACT_APP_APP_ID || '');
  const [isPopup, setPopup] = useState(false);
  const { push } = useNavigator();
  const handleClick = () => {
    setPopup(true);
  };

  const handleNextClick = () => {
    push('/survey/create/target');
  };
  useEffect(() => {
    (async function loadBizPrest() {
      const id = await getBizId();
      setCode(id);
    })();
  }, []);

  useEffect(() => {
    if (jwt.state === 'hasValue') {
      // eslint-disable-next-line no-console
      console.log(jwt.contents);
    }
  }, [jwt]);
  return (
    <StyledSurveyHomePage>
      <NavBar
        reverse={true}
        type="CLOSE"
        appendCenter={
          <LogoWrapper>
            <Logo />
            <TitleLogo />
          </LogoWrapper>
        }
      />

      {isPopup && (
        <UpDownModal setPopup={setPopup}>
          <GuideModal>
            <h1 className="guideModal_title">
              우리 동네 이웃에게
              <br /> 이렇게 보여요
            </h1>
            <h3 className="guideModal_subtitle">
              당근마켓 내 피드에서 사장님의 설문이 <br /> 우리 동네 이웃분에게
              보여져요
            </h3>
            <GuideModalImg />
          </GuideModal>
          <NextButton onClick={handleNextClick}>다음</NextButton>
        </UpDownModal>
      )}
      <button onClick={handleClick}>설문 만들기</button>
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

const GuideModal = styled.div`
  padding: 4rem 1.6rem 0 1.6rem;
  .guideModal_title {
    font-size: 2.2rem;
    line-height: 140%;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.color.neutralBlack.main};
    margin-bottom: 1.6rem;
  }

  .guideModal_subtitle {
    font-size: 1.6rem;
    line-height: 140%;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.color.neutralBlack.main};
  }
`;

const GuideModalImg = styled.div`
  width: 100%;
  height: 0;
  padding-top: calc(244 / 328 * 100%);
  background: url('../../img/guideModalImg.png') center center / cover no-repeat;
  position: relative;
  margin-bottom: 2.4rem;
  margin-top: 4.7rem;
  border-radius: 4px;
`;

const NextButton = styled.button`
  height: 5.6rem;
  width: 100%;
  font-size: 1.7rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.primaryOrange};
  color: #ffff;
`;
