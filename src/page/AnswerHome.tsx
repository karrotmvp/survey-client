/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator, useParams } from '@karrotframe/navigator';
import Slider, { Settings } from 'react-slick';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import LoginButton from '@component/common/button/LogInButton';
import AlertTostModal from '@component/common/modal/TostModal';
import NavBar from '@component/common/navbar/NavBar';
import { useMiniAuth } from '@hook/useAuth';
import { useAnalytics } from '@src/analytics/faContext';
import { authorizationSelector, codeAtom } from '@src/api/authorization';
import { questionAtomType, questionListAtom } from '@src/atom/questionAtom';
import { responseUserAtom } from '@src/atom/responseAtom';
import BizProfile, {
  bizProfileType,
} from '@src/component/common/button/BizProfile';
import useGet from '@src/hook/useGet';
import useLogin from '@src/hook/useLogin';

// const questionCategories = [
//   '의견을 알려주세요',
//   '메뉴 추천받아요',
//   '퀴즈 풀어봐요',
// ];

export type questionDataType = {
  surveyId: number;
  title: string;
  description: string;
  target: number;
  questions: questionAtomType[];
  createdAt?: string;
};

type surveyBriefType = {
  estimatedTime: number;
  questionCount: number;
  title: string;
  bizProfile: bizProfileType;
  target: string;
  createdAt: string;
  followersCount: number;
};

export default function AnswerHome(): JSX.Element {
  const { push } = useNavigator();
  const { surveyId } =
    useParams<{ surveyId?: string; questionNumber?: string }>();
  if (!surveyId) throw new Error('surveyId none');

  const jwt = useLogin(authorizationSelector);
  const [isToastOpen, setToastOpen] = useState(false);
  const [briefData, setBrief] = useState<surveyBriefType | null>(null);

  const [code, setCode] = useRecoilState(codeAtom);
  const setBizUser = useSetRecoilState(responseUserAtom);
  const setQuestion = useSetRecoilState(questionListAtom);
  const fa = useAnalytics();

  const getSurveyData = useGet<questionDataType>(`/surveys/${surveyId}`);

  const getSurveyBrief = useGet<surveyBriefType>(
    `/surveys/brief/${surveyId}`,
    true,
  );

  const auth = useMiniAuth(process.env.REACT_APP_APP_ID || '');

  async function getResponseHomeData() {
    const res = await getSurveyData();
    if (!res) return;
    const { questions } = res;
    setQuestion(questions);
    setToastOpen(false);
    push(`/survey/${surveyId}/1`);
  }

  const click = async () => {
    fa.logEvent(`response_login_button_click`, { surveyId });
    fa.logEvent(`${surveyId}_response_login_button_click`);
    const resCode = await auth();
    if (resCode) {
      setCode(resCode);
      if (code === resCode) {
        getResponseHomeData();
      }
    }
  };

  useEffect(() => {
    if (!briefData) {
      (async function getResponseBriefData() {
        const res = await getSurveyBrief();
        if (res && briefData === null) {
          setBrief(res);
          setBizUser(res.bizProfile);
        }
      })();
    }
    fa.logEvent(`response_onboard_show`, { surveyId });
    fa.logEvent(`${surveyId}_response_onboard_show`);
    fa.setUserId(uuidv4());
  }, [briefData]);

  useEffect(() => {
    if (jwt.state === 'hasValue') {
      getResponseHomeData();
    }
  }, [jwt]);
  const IsCoverImgUrls = briefData
    ? Boolean(briefData.bizProfile.coverImageUrls)
    : false;
  return (
    <>
      <NavBar
        type="CLOSE"
        transparent
        title={IsCoverImgUrls ? `${briefData?.bizProfile.name} 설문` : ''}
        white={IsCoverImgUrls}
      />
      <StyledHomePage>
        <div className="response_home_center">
          {briefData ? (
            <>
              {briefData.bizProfile.coverImageUrls ? (
                <CoverSection>
                  <CoverSlider {...settings}>
                    {briefData.bizProfile.coverImageUrls.map((img, index) => (
                      <div className="slide_div" key={index}>
                        <CoverImg src={img} />
                      </div>
                    ))}
                  </CoverSlider>
                  <BizProfile {...briefData.bizProfile} />
                </CoverSection>
              ) : (
                <BizProfile {...briefData.bizProfile} />
              )}

              <SurveyTitle>{briefData.title}</SurveyTitle>
              <SurveySubtitle>
                {briefData.questionCount}질문 <Dot /> 예상시간{' '}
                {briefData.estimatedTime} 초
              </SurveySubtitle>
            </>
          ) : (
            <div></div>
          )}
        </div>

        <div className="logIn_button">
          <SurveySubtitle>
            설문을 작성하시면 매장을 개선하는데 큰 도움이 돼요
          </SurveySubtitle>

          <AlertTostModal
            text={'이미 답변한 설문입니다'}
            bottom={'9rem'}
            {...{ isToastOpen, setToastOpen }}
            time={3000}
          />

          <LoginButton onClick={click} text={'설문 답변하기'} />
        </div>
      </StyledHomePage>
    </>
  );
}

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  swipe: true,
};

const CoverSection = styled.section`
  width: 100%;
  height: 40vh;
  position: relative;
`;

const CoverImg = styled.img`
  width: 100%;
  height: 40vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  object-fit: cover;
`;

const Dot = styled.div`
  background-color: #c4c4c4;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  margin: 0 0.8rem;
`;

const StyledHomePage = styled.section`
  background: #ffff;
  width: 100%;
  height: 100vh;
  padding: 0 0 1.6rem 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .logIn_button {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 1.6rem;
  }
  .response_home_center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const CoverSlider = styled(Slider)`
  height: 100%;
  width: 100%;

  .slide_div {
    height: 40vh;
    position: relative;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.51) 0%,
      rgba(0, 0, 0, 0) 22.15%,
      rgba(0, 0, 0, 0) 53.93%,
      rgba(0, 0, 0, 0.35) 70.59%,
      rgba(0, 0, 0, 0.6) 100%
    );
  }
  .slick-list {
    height: 100%;
  }
  .slick-dots {
    top: 1.2rem;
    bottom: none;
    li.slick-active button:before {
      color: white !important;
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

// const LogoWrapper = styled.div`
//   justify-content: center;
//   display: flex;
//   align-items: center;
//   width: 100%;
// `;

// const QuestionCategoryTag = styled.div`
//   background: #f4f4f4;
//   border-radius: 4px;
//   padding: 0.8rem;
//   color: #8e8f95;
//   font-size: ${({ theme }) => theme.fontSize.M};
//   line-height: 100%;
//   width: fit-content;
// `;

const SurveyTitle = styled.h1`
  color: #141414;
  font-size: ${({ theme }) => theme.fontSize.XXL};
  line-height: 140%;
  margin: 0.8rem 0;
  font-weight: 600;
  text-align: center;
  word-break: keep-all;
  padding: 0 1.4rem;
  margin-top: 3.6rem;
`;

const SurveySubtitle = styled.h3`
  color: #8e8f95;
  font-size: ${({ theme }) => theme.fontSize.L};
  line-height: 100%;
  display: flex;
  align-items: center;
  font-weight: 400;
  margin-bottom: 2.4rem;
`;

// const Logo = styled(LogoIcon)`
//   margin-right: 0.6rem;
// `;

// const TitleLogo = styled(MuddaIcon)``;
