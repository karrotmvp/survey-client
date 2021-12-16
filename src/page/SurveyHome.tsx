import { ReactElement, useEffect, useState, FC } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import Skeleton from 'react-loading-skeleton';
import Slider, { Settings } from 'react-slick';
import { Loadable, useRecoilState, useRecoilValueLoadable } from 'recoil';

import {
  authorizationBizSelector,
  bizCodeAtom,
  getBizProfile,
  getSurveyList,
} from '@api/authorization';
import NavBar from '@component/common/navbar/NavBar';
import { ReactComponent as ArrowRight } from '@config/icon/arrow_right.svg';
import { ReactComponent as LogoIcon } from '@config/icon/mudda_orange.svg';
import { ReactComponent as MuddaIcon } from '@config/icon/mudda_textLogo.svg';
import { ReactComponent as PlusIcon } from '@config/icon/plus.svg';
import { useAnalytics } from '@src/analytics/faContext';
import mini from '@src/api/mini';
import LoadingCard from '@src/component/common/card/LoadingCard';
import SurveyCard from '@src/component/common/card/SurveyCard';
import UpDownModal from '@src/component/common/modal/UpDownModal';
import NoSurveyList from '@src/component/home/NoSurveyList';
import { useMiniBizAuth } from '@src/hook/useAuth';
import useLogin from '@src/hook/useLogin';
import { useShowEvent } from '@src/hook/useShowEvent';

export type surveyItemType = {
  createdAt: string;
  responseCount: number;
  surveyId: number;
  target: string;
  title: string;
  isLast: boolean;
};

export default function SurveyHome(): ReactElement {
  const { push } = useNavigator();
  const fa = useAnalytics();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const isCode = urlSearchParams.has('code');
  const isVisited = localStorage.getItem('visited');
  useShowEvent('surveyList_onbard_show');

  const onClose = () => {
    setClose(true);
  };
  const jwt = useLogin(authorizationBizSelector);

  const getBizId = useMiniBizAuth(process.env.REACT_APP_APP_ID || '', onClose);
  const getList = useRecoilValueLoadable(getSurveyList);
  const userData = useRecoilValueLoadable(getBizProfile);
  const [code, setCode] = useRecoilState(bizCodeAtom);

  const [close, setClose] = useState(false);
  const [isPopup, setPopup] = useState(false);
  const [isIntroPopup, setIntroPopup] = useState(false);
  const [isClosePopup, setClosePopup] = useState(false);

  const handleNextClick = () => {
    fa.logEvent('surveyList_next_button_click');
    setPopup(false);
    push('/survey/create/question');
  };

  const onBannerClick = () => {
    fa.logEvent('surveyList_banner_guide_button_click');
    push('/guide');
  };

  const handleCloseModalClick = () => {
    setClosePopup(true);
  };

  const handleCreateSurveyButtonClick = () => {
    fa.logEvent('surveyList_create_survey_button_click');
    if (isCode) {
      push('/survey/create/question');
    } else setPopup(true);
  };

  useEffect(() => {
    if (close && code === '') {
      mini.close();
    }
  }, [close, code]);

  useEffect(() => {
    (async () => {
      if (sessionStorage.getItem('jwt')) {
        return;
      }
      const id = await getBizId();
      setCode(id);
      fa.setUserId(id);
      fa.setUserProperties({ isCode });
      if (isCode && !isVisited) {
        setIntroPopup(true);
        localStorage.setItem('visited', 'true');
      }
    })();
  }, []);

  useEffect(() => {
    if (!isIntroPopup && isClosePopup) {
      setClosePopup(false);
    }
  }, [isClosePopup, isIntroPopup]);

  return (
    <div style={{ height: '100vh', paddingTop: '5.6rem' }}>
      <NavBar
        type="CLOSE"
        appendCenter={
          <LogoWrapper>
            <Logo />
            <TitleLogo />
          </LogoWrapper>
        }
        appendRight={
          userData.state === 'hasValue' && userData.contents !== '' ? (
            <BizAvatarImg src={userData.contents.imageUrl} />
          ) : (
            <Skeleton height="28px" width="28px" borderRadius="50%" />
          )
        }
      />
      <BannerSection>
        <CoverSlider {...settings}>
          <StyledSurveyHomePage onClick={onBannerClick}>
            <h1 className="survey_home_title">
              무따로 설문을 만들고
              <br />
              우리 동네 주민 의견을 들어봐요
            </h1>
            <span>
              무따 사용법 보기 <ArrowRight />
            </span>
          </StyledSurveyHomePage>
          <FeedbackBanner
            onClick={() => {
              fa.logEvent('surveyList_banner_feedback_click');
              push('/feedback');
            }}
          >
            <h1 className="survey_home_title">
              무따 서비스 피드백을
              <br />
              남겨주시면 큰 도움이 돼요 <Logo />
            </h1>
            <span>
              무따 피드백 보기 <ArrowRight />
            </span>
          </FeedbackBanner>
        </CoverSlider>
      </BannerSection>

      {jwt.state === 'hasValue' && (
        <WithSurveyListTab
          getList={getList}
          handleCreateClick={handleCreateSurveyButtonClick}
        />
      )}
      {isPopup && (
        <UpDownModal setPopup={setPopup}>
          <GuideModal>
            <h1 className="guideModal_title">설문을 만들고 공유해봐요</h1>
            <h3 className="guideModal_subtitle">
              사장님의 설문을 <b>비즈프로필 소식</b>에 공유해 <br /> 보세요!
              우리 동네 이웃분에게 보여져요.
            </h3>
            <GuideModalImg
              className="guideModal_img"
              imgUrl="./../../img/guideModalImg.png"
              imgWidth={152 / 328}
            />
            <h3 className="guideModal_subtitle ">
              또는 <b>SNS에 공유</b>해서 더 많은 분의 의견을 <br />
              들어볼 수 있어요.
            </h3>
            <GuideModalImg
              className="guideModal_img"
              imgUrl="./../../img/guideModalImg2.png"
              imgWidth={142 / 328}
            />
          </GuideModal>
          <NextButton onClick={handleNextClick}>다음</NextButton>
        </UpDownModal>
      )}

      {isIntroPopup && (
        <UpDownModal setPopup={setIntroPopup} isClose={isClosePopup}>
          <GuideModal>
            <h1 className="guideModal_title">
              아쉽지만 설문이 더 이상 동네 이웃 홈피드에 보이지 않아요 😢
            </h1>
            <h3 className="guideModal_subtitle">
              베타 서비스와는 달리 이웃 홈피드에 노출하지
              <br /> 않게 되었어요.
              <br />
              그러나, 사장님의 <b>비즈프로필 소식</b>이나 <b>SNS</b>에<br />
              <b>링크를 공유하</b>면 더 많은 답변을 받을 수 있어요!
            </h3>
            <GuideModalImg
              imgUrl="./../../img/guideModalImg.png"
              imgWidth={152 / 328}
            />
            <GuideModalImg
              imgUrl="./../../img/guideModalImg2.png"
              imgWidth={142 / 328}
            />
          </GuideModal>
          <NextButton onClick={handleCloseModalClick}>네! 알겠어요</NextButton>
        </UpDownModal>
      )}
    </div>
  );
}

// 타입 설게 state 가 value 가 있고  list === 0 일때
const WithSurveyListTab: FC<{
  getList: Loadable<surveyItemType[] | undefined>;
  handleCreateClick: () => void;
}> = ({ getList, handleCreateClick }) => {
  if (getList.state === 'hasValue' && getList.contents !== undefined) {
    if (getList.contents.length === 0)
      return <NoSurveyList handleCreateClick={handleCreateClick} />;

    return (
      <>
        <SurveyCardLists>
          {getList.contents.map((data, idx, arr) => (
            <SurveyCard
              key={data.surveyId}
              {...data}
              isLast={arr.length === idx + 1}
            />
          ))}
        </SurveyCardLists>
        <CreateSurveyButton onClick={handleCreateClick}>
          <PlusIcon />
          설문 만들기
        </CreateSurveyButton>
      </>
    );
  }
  return <LoadingCard count={3} />;
};

const SurveyCardLists = styled.ul`
  border-top: 0.8rem solid #f8f8f8;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
  height: calc(100% - 14.8rem);
  padding-bottom: 18rem;
`;

const BizAvatarImg = styled.img`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
`;

// const FeedbackBanner = styled.button`
//   background-color: #fff2eb;
//   display: flex;
//   padding: 1.6rem 0 1.6rem 1.6rem;
//   position: fixed;
//   -webkit-transform: translate3d(0, 0, 0);
//   bottom: 0;
//   width: 100%;
//   color: ${({ theme }) => theme.color.primaryOrange};
//   align-items: center;
//   span {
//     font-size: 1.3rem;
//     display: block;
//   }
// `;
const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  swipe: true,
  autoplay: true,
  autoplaySpeed: 4000,
};

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

const CreateSurveyButton = styled.button`
  position: fixed;
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  background-color: ${({ theme }) => theme.color.primaryOrange};
  color: #fff;
  bottom: 3.2rem;
  right: 1.6rem;
  padding: 1.2rem 1.8rem;
  border-radius: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  svg {
    margin-right: 0.4rem;
  }
`;

const StyledSurveyHomePage = styled.section`
  background: url('./../../img/bannerImg.png') center / cover no-repeat;
  width: 100%;
  padding: 2.4rem 1.6rem 2.4rem 1.6rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-bottom: 1px solid #f4f4f4;
  .survey_home_title {
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    line-height: 140%;
    color: #ffff;
  }
  span {
    display: flex;
    align-items: center;
    margin-top: 0.6rem;
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    color: #ffff;
  }
`;

const FeedbackBanner = styled.section`
  background: url('./../../img/bannerImg2.png') center / cover no-repeat;
  width: 100%;
  padding: 2.4rem 1.6rem 2.4rem 1.6rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-bottom: 1px solid #f4f4f4;
  .survey_home_title {
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    line-height: 140%;
    color: ${({ theme }) => theme.color.primaryOrange};
  }
  span {
    display: flex;
    align-items: center;
    margin-top: 0.6rem;
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.color.primaryOrange};
  }
`;

const GuideModal = styled.div`
  padding: 4rem 1.6rem 1.6rem 1.6rem;
  .guideModal_title {
    font-size: 2.2rem;
    line-height: 140%;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.neutralBlack.main};
    margin-bottom: 1.6rem;
  }

  .guideModal_subtitle {
    font-size: 1.5rem;
    line-height: 140%;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    color: #4b4b4b;

    margin-bottom: 1.6rem;
  }
  .guideModal_img {
    margin-bottom: 2.4rem;
  }
`;

const BannerSection = styled.section`
  width: 100%;
  height: 128px;
  position: relative;
`;

const CoverSlider = styled(Slider)`
  height: 100%;
  width: 100%;

  .slide_div {
    height: 128px;
    position: relative;
  }
  .slick-list {
    height: 100%;
  }
  .slick-dots {
    bottom: 1rem;
    li {
      width: 1.5rem;
      margin: 0;
    }
    li.slick-active button:before {
      color: #fff !important;
      opacity: 1;
    }
  }
  .slick-slide {
    div {
      height: 100%;
    }
  }
  .slick-slider {
    height: 100%;
    margin: 0 -15px;
  }
  .slick-track {
    height: 100%;
  }
`;

const GuideModalImg = styled.div<{ imgUrl: string; imgWidth: number }>`
  width: 100%;
  height: 0;
  padding-top: ${({ imgWidth }) => `calc( ${imgWidth} * 100%)`};
  background: url(${({ imgUrl }) => imgUrl}) center center / cover no-repeat;
  position: relative;
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
