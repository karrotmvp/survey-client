import { useEffect } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import Slider, { Settings } from 'react-slick';
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';

import { authorizationSelector, codeAtom } from '@api/authorization';
import NavBar from '@component/common/navbar/NavBar';
import HomeBanner from '@component/home/HomeBanner';
import { ReactComponent as BetaIcon } from '@config/icon/BETA.svg';
import { ReactComponent as LogoIcon } from '@config/icon/logo.svg';
import { ReactComponent as MuddIcon } from '@config/icon/mudda.svg';
import { userAtom } from '@src/atom/userAtom';
import useGet from '@src/hook/useGet';

import useMiniAuth from '../hook/useAuth';

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

const CreateQuestionButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.color.primaryOrange};
  border-radius: 12px;
  padding: 20px 100px;
  font-size: 18px;
  color: #ffff;
  font-weight: 700;
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
  daangnId: string;
  name: string;
  imageUrl: string;
  role: string;
};
export default function HomePage(): JSX.Element {
  const { replace } = useNavigator();
  const userData = useGet<userType>('/members/me');

  const [code, setCode] = useRecoilState(codeAtom);
  const getCode = useMiniAuth(
    'https://mini-assets.kr.karrotmarket.com/presets/mvp-survey-select-biz-profile/production.html',
    process.env.REACT_APP_APP_ID || '',
  );

  const jwt = useRecoilValueLoadable(authorizationSelector);
  const setUser = useSetRecoilState(userAtom);

  const handleClick = async () => {
    const respCode = await getCode();
    // eslint-disable-next-line no-console
    console.log(code);
    if (!respCode) {
      return;
    }
    setCode(respCode);
    replace('/target');
  };

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
  const StyledImg = styled.img`
    width: 100%;
    object-fit: contain;
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

  useEffect(() => {
    if (jwt.state === 'hasValue') {
      sessionStorage.setItem('jwt', jwt.contents.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt.state, jwt.contents.data, sessionStorage]);

  useEffect(() => {
    if (sessionStorage.getItem('jwt')) {
      userData().then(data => {
        setUser({ nickName: '', storeName: data === '' ? '' : data.data.name });
        if (jwt.state === 'hasValue') {
          replace('/target');
        }
        if (jwt.state === 'hasError') {
          throw new Error('jwt error');
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, jwt.state, jwt.contents.data, userData]);
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
            <StyledSlide {...settings}>
              <StyledImg src="./img/homeImg1.png" />

              <StyledImg src="./img/homeImg2.png" />

              <StyledImg src="./img/homeImg3.png" />
            </StyledSlide>
          </div>
          <div>
            <CreateQuestionButton onClick={handleClick}>
              설문 만들러가기
            </CreateQuestionButton>
          </div>
        </StyledSection>
      </StyledHomePage>
    </>
  );
}
