import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import Slider, { Settings } from 'react-slick';
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';

import { authorizationBizSelector, bizCodeAtom } from '@api/authorization';
import { userAtom } from '@atom/userAtom';
import LogInButton from '@component/common/button/LogInButton';
import NavBar from '@component/common/navbar/NavBar';
import HomeBanner from '@component/home/HomeBanner';
import { ReactComponent as BetaIcon } from '@config/icon/BETA.svg';
import { ReactComponent as LogoIcon } from '@config/icon/logoIcon.svg';
import { ReactComponent as MuddaIcon } from '@config/icon/mudda.svg';
import useGet from '@hook/useGet';
import { useAnalytics } from '@src/analytics/faContext';
import UpDownModal from '@src/component/common/modal/UpDownModal';
import { useMiniBizAuth } from '@src/hook/useAuth';

const StyledImg = styled.img`
  width: 100%;
  position: absolute;
  top: 8.5rem;
`;

const StyledSecondImg = styled.img`
  width: calc(100% - 3.3rem);
  position: absolute;
  top: 8.5rem;
`;

const StyledHomePage = styled.section`
  background: #ffff;
  width: 100%;
  height: 100vh;
  padding: 8rem 1.6rem 1.6rem 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Logo = styled(LogoIcon)`
  height: auto;
`;

const TitleLogo = styled(MuddaIcon)`
  margin: 0 8px;
  height: auto;
`;

const BetaLogo = styled(BetaIcon)`
  margin: 2px 0;
  path {
    height: auto;
  }
`;

const StyledColumn = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2rem;
  svg {
    font-size: 3rem;
  }
`;

export type userType = {
  daangnId: string;
  name: string;
  imageUrl: string;
  role: string;
};

const StyledCover = styled.div`
  display: flex;
  justify-content: center;
  background: #fedecc;
  border-radius: 8px;
  height: 100%;
  position: relative;
`;

const StyledSlide = styled(Slider)`
  height: 100%;
  .slide_div {
    height: 100%;
  }
  .slick-list {
    height: 100%;
  }

  .slick-dots li button:before {
    color: #7a7885;
    opacity: 1;
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

  .slick-dots li.slick-active button:before {
    color: ${({ theme }) => theme.color.primaryOrange} !important;
  }
  margin-top: 2rem;
  margin-bottom: 3rem;
`;

const StyledSliderTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.title};
  font-weight: bold;
  font-size: 1.6rem;
  line-height: 140%;
  margin-top: 2.2rem;
  text-align: center;

  color: ${({ theme }) => theme.color.primaryOrange};
`;

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
};

export default function HomePage(): JSX.Element {
  const { push } = useNavigator();
  const getData = useGet<userType>('/members/me');
  const [isPopup, setPopup] = useState(false);
  const [close, setClose] = useState(false);

  const onClose = () => {
    setClose(true);
  };

  const [code, setCode] = useRecoilState(bizCodeAtom);
  const fa = useAnalytics();
  const getBizId = useMiniBizAuth(process.env.REACT_APP_APP_ID || '', onClose);
  const jwt = useRecoilValueLoadable(authorizationBizSelector);
  const setUser = useSetRecoilState(userAtom);

  const handleClick = async () => {
    fa.logEvent('home_login_button_click');
    const resBizId = await getBizId();
    if (!resBizId) {
      return;
    }
    if (resBizId === code) {
      setPopup(true);
    }
    fa.setUserId(resBizId);

    setCode(resBizId);
  };

  const handleNextClick = () => {
    fa.logEvent('home_onboarding_next_button_click');
    push('/survey/create/target');
  };

  useEffect(() => {
    fa.logEvent('home_onboarding_show');
  }, []);

  useEffect(() => {
    if (close && code) {
      setPopup(true);
    }
  }, [close, code]);

  useEffect(() => {
    if (jwt.state === 'hasValue') {
      sessionStorage.setItem('jwt', jwt.contents.data);
    }
  }, [code, jwt]);

  useEffect(() => {
    if (jwt.state === 'hasValue' && sessionStorage.getItem('jwt')) {
      getData().then(data => {
        if (data === undefined) return;

        if (data.name) {
          setUser({ nickName: '', storeName: data.name });
          // setPopup(true)
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt, sessionStorage]);

  return (
    <>
      <NavBar type="CLOSE" />
      <StyledHomePage>
        <div>
          <StyledColumn>
            <Logo /> <TitleLogo /> <BetaLogo />
          </StyledColumn>
          <HomeBanner />
        </div>
        <StyledSlide {...settings}>
          <div className="slide_div">
            <StyledCover>
              <StyledSliderTitle>
                우리 매장에 대한 <br />
                고객님 의견을 물어볼 수 있어요
              </StyledSliderTitle>
              <StyledImg src="./img/home_Img_1.png" />
            </StyledCover>
          </div>
          <div className="slide_div">
            <StyledCover>
              <StyledSliderTitle>
                우리 동네 상권/고객을 <br /> 파악해볼 수 있어요
              </StyledSliderTitle>
              <StyledSecondImg src="./img/home_Img_2.png" />
            </StyledCover>
          </div>
        </StyledSlide>

        <LogInButton text={'설문 만들러가기'} onClick={handleClick} />
      </StyledHomePage>
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
    </>
  );
}

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
  &:focus {
    background-color: ${({ theme }) => theme.color.primaryOrangePressed};
  }
`;
