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
<<<<<<< HEAD
  min-height: 100vh;
  padding-top: 5.5rem;
=======
  height: 100vh;
  padding-top: 3.8rem;
  padding-bottom: 50px;
>>>>>>> 737c1477dd62e01db2aded6967e9e80f1bb8f5f3
`;

const StyledSection = styled.section`
  padding: 0 18px;
  height: calc(100vh - 5.5rem);
<<<<<<< HEAD
=======
  display: flex;
  flex-direction: column;
  justify-content: space-between;
>>>>>>> 737c1477dd62e01db2aded6967e9e80f1bb8f5f3
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
<<<<<<< HEAD
  width: 12%;
=======
>>>>>>> 737c1477dd62e01db2aded6967e9e80f1bb8f5f3
  height: auto;
`;

const TitleLogo = styled(MuddIcon)`
  margin: 0 8px;
<<<<<<< HEAD
  width: 25%;
=======

>>>>>>> 737c1477dd62e01db2aded6967e9e80f1bb8f5f3
  height: auto;
`;

const BetaLogo = styled(BetaIcon)`
  margin: 2px 0;
  path {
<<<<<<< HEAD
    width: 10%;
=======
>>>>>>> 737c1477dd62e01db2aded6967e9e80f1bb8f5f3
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
<<<<<<< HEAD

=======
>>>>>>> 737c1477dd62e01db2aded6967e9e80f1bb8f5f3
  const [code, setCode] = useRecoilState(codeAtom);
  const getCode = useMiniAuth(
    process.env.REACT_APP_PRESET_BIZ || '',
    process.env.REACT_APP_APP_ID || '',
  );
<<<<<<< HEAD
  const jwt = useRecoilValueLoadable(authorizationSelector);
  const setUser = useSetRecoilState(userAtom);
  const handleClick = async () => {
    const respCode = await getCode();
=======

  const jwt = useRecoilValueLoadable(authorizationSelector);
  const setUser = useSetRecoilState(userAtom);

  const handleClick = async () => {
    const respCode = await getCode();
    // eslint-disable-next-line no-console
    console.log(respCode);
>>>>>>> 737c1477dd62e01db2aded6967e9e80f1bb8f5f3
    if (!respCode) {
      return;
    }
    setCode(respCode);
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
<<<<<<< HEAD
=======

>>>>>>> 737c1477dd62e01db2aded6967e9e80f1bb8f5f3
  useEffect(() => {
    if (jwt.state === 'hasValue') {
      sessionStorage.setItem('jwt', jwt.contents.data);
    }
<<<<<<< HEAD

    if (sessionStorage.getItem('jwt')) {
      userData().then(data => {
        setUser({ nickName: '', storeName: data === '' ? '' : data.data.name });
=======
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt.state, jwt.contents.data, sessionStorage]);

  useEffect(() => {
    if (jwt.state === 'hasValue' && sessionStorage.getItem('jwt') !== '') {
      userData().then(data => {
        if (!data) throw new Error('error');
        setUser({ nickName: '', storeName: data.data.name });
        // eslint-disable-next-line no-console
        console.log(data.data.name);
>>>>>>> 737c1477dd62e01db2aded6967e9e80f1bb8f5f3
        replace('/target');
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
<<<<<<< HEAD
  }, [code, jwt.state, jwt.contents.data]);
=======
  }, [code, jwt.state, jwt.contents.data, userData]);
>>>>>>> 737c1477dd62e01db2aded6967e9e80f1bb8f5f3
  return (
    <>
      <NavBar type="CLOSE" />
      <StyledHomePage>
        <StyledSection>
<<<<<<< HEAD
          <StyledColomn>
            <Logo /> <TitleLogo /> <BetaLogo />
          </StyledColomn>
          <HomeBanner />
          <StyledSlide {...settings}>
            <StyledImg src="./img/homeImg1.png" />

            <StyledImg src="./img/homeImg2.png" />

            <StyledImg src="./img/homeImg3.png" />
          </StyledSlide>
          <CreateQuestionButton onClick={handleClick}>
            설문 만들러가기
          </CreateQuestionButton>
=======
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
>>>>>>> 737c1477dd62e01db2aded6967e9e80f1bb8f5f3
        </StyledSection>
      </StyledHomePage>
    </>
  );
}
