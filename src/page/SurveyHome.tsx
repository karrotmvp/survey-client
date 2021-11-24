import { ReactElement, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import Skeleton from 'react-loading-skeleton';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';

import {
  authorizationBizSelector,
  bizCodeAtom,
  getBizprofile,
} from '@api/authorization';
import NavBar from '@component/common/navbar/NavBar';
import { ReactComponent as LogoIcon } from '@config/icon/mudda_orange.svg';
import { ReactComponent as MuddaIcon } from '@config/icon/mudda_textLogo.svg';
import mini from '@src/api/mini';
import LoadingCard from '@src/component/common/card/LoadingCard';
import SurveyCard from '@src/component/common/card/SurveyCard';
import UpDownModal from '@src/component/common/modal/UpDownModal';
import { useMiniBizAuth } from '@src/hook/useAuth';
import useGet from '@src/hook/useGet';
import useLogin from '@src/hook/useLogin';

export type surveyItemType = {
  createdAt: string;
  responseCount: number;
  surveyId: number;
  target: string;
  title: string;
};

export default function SurveyHome(): ReactElement {
  const jwt = useLogin(authorizationBizSelector);
  const [code, setCode] = useRecoilState(bizCodeAtom);
  const [close, setClose] = useState(false);

  const onClose = () => {
    setClose(true);
  };

  const getBizId = useMiniBizAuth(process.env.REACT_APP_APP_ID || '', onClose);
  const getList = useGet<surveyItemType[]>('/surveys');
  const [surveyLists, setSurveyLists] = useState<surveyItemType[] | undefined>(
    undefined,
  );
  const userData = useRecoilValueLoadable(getBizprofile);
  const [isPopup, setPopup] = useState(false);
  const { push } = useNavigator();
  // const handleClick = () => {
  //   setPopup(true);
  // };

  const handleNextClick = () => {
    push('/survey/create/target');
  };

  useEffect(() => {
    if (close && code === '') {
      mini.close();
    }
  }, [close, code]);

  useEffect(() => {
    const time = setTimeout(async () => {
      const id = await getBizId();
      setCode(id);
    }, 100);
    return () => clearTimeout(time);
  }, []);

  useEffect(() => {
    if (jwt.state === 'hasValue') {
      (async function getSurveysListsData() {
        const res = await getList();
        setSurveyLists(res);
      })();
    }
  }, [jwt]);

  const SurveyCardLists = styled.ul`
    border-top: 0.8rem solid #f4f4f4;
    margin: 0;
    padding: 0;
    overflow-y: scroll;
    height: 70vh;
  `;

  const BizAvaterImg = styled.img`
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 50%;
  `;
  return (
    <div style={{ height: '100vh' }}>
      <StyledSurveyHomePage>
        <NavBar
          transparent
          type="CLOSE"
          appendCenter={
            <LogoWrapper>
              <Logo />
              <TitleLogo />
            </LogoWrapper>
          }
          appendRight={
            userData.state === 'hasValue' && userData.contents !== '' ? (
              <BizAvaterImg src={userData.contents.imageUrl} />
            ) : (
              <Skeleton height="28px" width="28px" borderRadius="50%" />
            )
          }
        />
        <h1 className="survey_home_title">
          사장님, 만드신 <b>설문</b>과<br />
          <b>동네 이웃의 답변</b>을 확인해보세요 🙌
        </h1>
      </StyledSurveyHomePage>
      {surveyLists ? (
        <SurveyCardLists>
          {surveyLists.map(data => (
            <SurveyCard key={data.surveyId} {...data} />
          ))}
        </SurveyCardLists>
      ) : (
        <LoadingCard count={3} />
      )}
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
    </div>
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
  background: linear-gradient(0deg, rgba(254, 222, 204, 0) 0%, #fedecc 100%);
  width: 100%;
  padding: 8rem 1.6rem 4rem 1.6rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-bottom: 1px #c9c9c9 solid;

  .survey_home_title {
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    line-height: 150%;
  }
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
