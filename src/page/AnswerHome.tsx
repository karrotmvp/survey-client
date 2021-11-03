import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import {
  useNavigator,
  useParams,
  useQueryParams,
} from '@karrotframe/navigator';
import { useRecoilState, useSetRecoilState } from 'recoil';

import LoginButton from '@component/common/button/LogInButton';
import AlertTostModal from '@component/common/modal/TostModal';
import NavBar from '@component/common/navbar/NavBar';
import { ReactComponent as LogoIcon } from '@config/icon/mudda_orange.svg';
import { ReactComponent as MuddaIcon } from '@config/icon/mudda_textLogo.svg';
import { useMiniAuth } from '@hook/useAuth';
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
  padding: 5rem 1rem 1rem 1rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .logIn_button {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const LogoWrapper = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const QuestionCategoryTage = styled.div`
  background: #f4f4f4;
  border-radius: 4px;
  padding: 0.5rem;
  color: #8e8f95;
  font-size: 0.7rem;
  line-height: 100%;
  width: fit-content;
  .loading {
    height: 1.8rem;
    width: 7rem;
  }
`;

const SurveyTitle = styled.h1`
  color: #141414;
  font-size: 1.4rem;
  line-height: 140%;
  margin: 0.8rem 0;
`;

const SurveySubtitle = styled.h3`
  color: #8e8f95;
  font-size: 0.8rem;
  line-height: 100%;
  display: flex;
  align-items: center;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const Logo = styled(LogoIcon)`
  margin-right: 0.3rem;
  height: 20px;
`;

const TitleLogo = styled(MuddaIcon)`
  height: 20px;
`;

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
  margin: 0 8px;
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

  const [code, setCode] = useRecoilState(codeAtom);
  const [isSuccess, setSuccess] = useLogin(authorizationSelector);
  const [isTostOpen, setTostOpen] = useState(false);
  const [briefData, setBrief] = useState<surveyBriefType | null>(null);

  const setBizUser = useSetRecoilState(responseUserAtom);
  const setQuestion = useSetRecoilState(questionListAtom);

  const getSurveyData = useGet<questionDataType>(`/surveys/${responsesId}`);
  const getSurveyUserData = useGet<respondedType>(
    `responses/surveys/${responsesId}/responded`,
  );
  const getSurveyBrief = useGet<surveyBriefType>(
    `/surveys/brief/${responsesId}`,
    true,
  );

  const auth = useMiniAuth(process.env.REACT_APP_APP_ID || '');

  const click = async () => {
    const resCode = await auth();
    // eslint-disable-next-line no-console
    console.log(resCode);
    if (resCode) {
      if (resCode === code) setSuccess(true);
      setCode(resCode);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('useEffect');
    if (!briefData) {
      getSurveyBrief().then(res => {
        if (res && briefData === null) {
          setBrief(res);
          setBizUser(res.bizProfile);
        }
      });
    }

    if (isSuccess) {
      getSurveyUserData().then(data => {
        // eslint-disable-next-line no-console
        console.log('useEffectdata', data);
        if (!data) return;
        if (data.responded) {
          setTostOpen(true);
        }
        getSurveyData().then(res => {
          // eslint-disable-next-line no-console
          console.log('useEffectres', res);
          if (!res) return;
          const { questions } = res;
          setQuestion(questions);
          setSuccess(false);
          push(`/responses/${responsesId}/1`);
        });
      });
    }
  }, [isSuccess, code, briefData]);

  const handleAlert = () => {
    setTimeout(() => {
      setTostOpen(false);
    }, 3000);
  };

  useEffect(() => {
    if (isTostOpen) handleAlert();
  }, [isTostOpen]);

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
        <div>
          <QuestionCategoryTage>
            {questionCategories[+questionCategory]}
          </QuestionCategoryTage>

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
          {isTostOpen && (
            <AlertTostModal
              text={'이미 답변한 설문입니다'}
              onClick={handleAlert}
              bottom={'9rem'}
            />
          )}
          <LoginButton onClick={click} text={'설문 답변하기'} />
        </div>
      </StyledHomePage>
    </>
  );
}
