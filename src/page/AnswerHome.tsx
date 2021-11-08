import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import {
  useNavigator,
  useParams,
  useQueryParams,
} from '@karrotframe/navigator';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import LoginButton from '@component/common/button/LogInButton';
import AlertTostModal from '@component/common/modal/TostModal';
import NavBar from '@component/common/navbar/NavBar';
import { ReactComponent as LogoIcon } from '@config/icon/mudda_orange.svg';
import { ReactComponent as MuddaIcon } from '@config/icon/mudda_textLogo.svg';
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

const StyledHomePage = styled.section`
  background: #ffff;
  width: 100%;
  height: 100vh;
  padding: 8rem 1.6rem 1.6rem 1.6rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .logIn_button {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .response_home_center {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 14%;
  }
`;

const LogoWrapper = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100%;
`;

const QuestionCategoryTag = styled.div`
  background: #f4f4f4;
  border-radius: 4px;
  padding: 0.8rem;
  color: #8e8f95;
  font-size: ${({ theme }) => theme.fontSize.M};
  line-height: 100%;
  width: fit-content;
`;

const SurveyTitle = styled.h1`
  color: #141414;
  font-size: ${({ theme }) => theme.fontSize.XXL};
  line-height: 140%;
  margin: 0.8rem 0;
  font-weight: 600;
  text-align: center;
  word-break: keep-all;
  padding: 0 1.4rem;
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

const Logo = styled(LogoIcon)`
  margin-right: 0.6rem;
`;

const TitleLogo = styled(MuddaIcon)``;

const questionCategories = [
  '의견을 알려주세요',
  '메뉴 추천받아요',
  '퀴즈 풀어봐요',
];

const Dot = styled.div`
  background-color: #c4c4c4;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  margin: 0 0.8rem;
`;

type questionDataType = {
  surveyId: number;
  title: string;
  description: string;
  target: number;
  questions: questionAtomType[];
};

type surveyBriefType = {
  estimatedTime: number;
  questionCount: number;
  title: string;
  bizProfile: bizProfileType;
  target: string;
  createdAt: string;
};
type respondedType = {
  responded: string;
};

export default function AnswerHome(): JSX.Element {
  const { push } = useNavigator();
  const params = useQueryParams<{ questionCategory: string }>();
  const { responsesId } =
    useParams<{ responsesId?: string; questionNumber?: string }>();
  if (!responsesId) throw new Error('responsesId none');

  const questionCategory = params.questionCategory
    ? params.questionCategory
    : '0';

  const jwt = useLogin(authorizationSelector);
  const [isToastOpen, setToastOpen] = useState(false);
  const [briefData, setBrief] = useState<surveyBriefType | null>(null);

  const setCode = useSetRecoilState(codeAtom);
  const setBizUser = useSetRecoilState(responseUserAtom);
  const setQuestion = useSetRecoilState(questionListAtom);

  const getSurveyData = useGet<questionDataType>(`/surveys/${responsesId}`);
  const getSurveyUserResponded = useGet<respondedType>(
    `responses/surveys/${responsesId}/responded`,
  );
  const getSurveyBrief = useGet<surveyBriefType>(
    `/surveys/brief/${responsesId}`,
    true,
  );

  const auth = useMiniAuth(process.env.REACT_APP_APP_ID || '');
  const fa = useAnalytics();

  const click = async () => {
    const resCode = await auth();

    if (resCode) {
      setCode(resCode);
    }
  };

  useEffect(() => {
    if (!briefData) {
      (async function () {
        const res = await getSurveyBrief();
        if (res && briefData === null) {
          setBrief(res);
          setBizUser(res.bizProfile);
        }
      })();
    }
    fa.logEvent(`response_onboard_show`, { responsesId });
    fa.logEvent(`${responsesId}_response_onboard_show`);
    fa.setUserId(uuidv4());
  }, []);

  useEffect(() => {
    if (jwt.state === 'hasValue') {
      (async function getResponseHomeData() {
        const data = await getSurveyUserResponded();
        if (data?.responded) {
          setToastOpen(true);
          fa.logEvent(`response_login_button_click_responded`, { responsesId });
          fa.logEvent(`${responsesId}_response_login_button_click_responded`);

          return;
        }
        const res = await getSurveyData();
        if (!res) return;
        fa.logEvent(`response_login_button_click`, { responsesId });
        fa.logEvent(`${responsesId}_response_login_button_click`);
        const { questions } = res;
        setQuestion(questions);

        push(`/responses/${responsesId}/1`);
      })();
    }
  }, [jwt]);

  return (
    <>
      <NavBar
        type="CLOSE"
        appendCenter={
          <LogoWrapper>
            <Logo />
            <TitleLogo />
          </LogoWrapper>
        }
      />
      <StyledHomePage>
        <div className="response_home_center">
          <QuestionCategoryTag>
            {questionCategories[+questionCategory]}
          </QuestionCategoryTag>

          {briefData ? (
            <>
              <SurveyTitle>{briefData.title}</SurveyTitle>

              <SurveySubtitle>
                {briefData.questionCount}질문 <Dot /> 예상시간{' '}
                {briefData.estimatedTime} 초
              </SurveySubtitle>
              <BizProfile {...briefData.bizProfile} />
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
