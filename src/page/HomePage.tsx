import { useEffect } from 'react';

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
import { ReactComponent as LogoIcon } from '@config/icon/logo.svg';
import { ReactComponent as MuddIcon } from '@config/icon/mudda.svg';
import useGet from '@hook/useGet';
import { useAnalytics } from '@src/analytics/faContext';
import { useMiniBizAuth } from '@src/hook/useAuth';

const StyledImg = styled.img`
  width: 60%;
  position: absolute;
  top: 13%;
`;

const StyledImgThird = styled.img`
  width: 75%;
  position: absolute;
  top: 20%;
`;

const StyledHomePage = styled.section`
  background: #ffff;
  width: 100%;
  height: 100vh;
  padding-top: 3.8rem;
  padding-bottom: 50px;
`;

const StyledSection = styled.section`
  padding: 0 18px;
  height: calc(100vh - 5.5rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Logo = styled(LogoIcon)`
  height: auto;
`;

const TitleLogo = styled(MuddIcon)`
  margin: 0 8px;
  height: auto;
`;

const BetaLogo = styled(BetaIcon)`
  margin: 2px 0;
  path {
    height: auto;
  }
`;

const StyledColomn = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2rem;
  svg {
    font-size: 3rem;
  }
`;

type userType = {
  data: {
    daangnId: string;
    name: string;
    imageUrl: string;
    role: string;
  };
};

const StyledCover = styled.div`
  display: flex;
  justify-content: center;
  background: #f4f3f8;
  border-radius: 8px;
  height: 50vh;
  position: relative;
`;

const StyledSlide = styled(Slider)`
  .slick-dots li button:before {
    color: #f4f3f8;
    opacity: 1;
  }

  .slick-slider {
    margin: 0 -15px;
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
  font-size: 14px;
  line-height: 120%;

  margin-top: 1.3rem;
  text-align: center;

  color: #707070;
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
  const [code, setCode] = useRecoilState(bizCodeAtom);
  const fa = useAnalytics();
  const getBizId = useMiniBizAuth(process.env.REACT_APP_APP_ID || '');
  const jwt = useRecoilValueLoadable(authorizationBizSelector);
  const setUser = useSetRecoilState(userAtom);

  const handleClick = async () => {
    const resBizId = await getBizId();
    if (!resBizId) {
      return;
    }
    if (resBizId === code) {
      push('/survey/create/target');
    }
    fa.setUserId(resBizId);
    fa.logEvent('home_login_button_click');
    setCode(resBizId);
  };

  useEffect(() => {
    if (jwt.state === 'hasValue') {
      sessionStorage.setItem('jwt', jwt.contents.data);
    }
  }, [code, jwt]);

  useEffect(() => {
    if (jwt.state === 'hasValue' && sessionStorage.getItem('jwt')) {
      getData().then(({ data }: userType) => {
        if (data.name) {
          setUser({ nickName: '', storeName: data.name });
          push('/survey/create/target');
        }
      });
    }
  }, [jwt, sessionStorage]);

  return (
    <>
      <NavBar type="CLOSE" />
      <StyledHomePage>
        <StyledSection>
          <div>
            <StyledColomn>
              <Logo /> <TitleLogo /> <BetaLogo />
            </StyledColomn>
            <HomeBanner />
          </div>
          <StyledSlide {...settings}>
            <div>
              <StyledCover>
                <StyledSliderTitle>
                  우리 매장에 대한 고객님 의견을 물어볼 수 있어요
                </StyledSliderTitle>
                <StyledImg src="./img/home_img1.png" />
              </StyledCover>
            </div>
            <div>
              <StyledCover>
                <StyledSliderTitle>
                  우리 동네 상권/고객을 파악해볼 수 있어요
                </StyledSliderTitle>
                <StyledImg src="./img/home_img2.png" />
              </StyledCover>
            </div>
            <div>
              <StyledCover>
                <StyledSliderTitle>
                  이웃들에게 재밌는 퀴즈를 내고 맞춰봐요
                </StyledSliderTitle>
                <StyledImgThird src="./img/home_img3.png" />
              </StyledCover>
            </div>
          </StyledSlide>

          <LogInButton text={'설문 만들러가기'} onClick={handleClick} />
        </StyledSection>
      </StyledHomePage>
    </>
  );
}
