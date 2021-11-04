import { useEffect } from 'react';

import styled from '@emotion/styled';
import { useNavigator, useParams } from '@karrotframe/navigator';
import { useRecoilState, useRecoilValue } from 'recoil';

import ResponseTextInput from '@component/response/ResponseTextInput';
import { useAnalytics } from '@src/analytics/faContext';
import { questionListAtom } from '@src/atom/questionAtom';
import { responseListAtom } from '@src/atom/responseAtom';
import NavBar from '@src/component/common/navbar/NavBar';
import QuestionDot from '@src/component/questionDetail/QuestionDot';
import ResponseChoiceInput from '@src/component/response/ResponseChoiceInput';

export type InputType = {
  setResponse: (
    responseInput: { choiceId: number } | { answer: string },
  ) => void;
  isLast: boolean;
};

export default function AnswerDetailPage(): JSX.Element {
  const questions = useRecoilValue(questionListAtom);
  const fa = useAnalytics();
  const { questionTypes, responsesId } =
    useParams<{ responsesId?: string; questionTypes?: string }>();
  if (!questionTypes || !responsesId)
    throw new Error('questionNumber or responsesId none');

  const questionNumber = Number.isNaN(+questionTypes) ? 1 : +questionTypes;
  const { questionType } = questions[questionNumber - 1];
  const questionLength = questions.length;
  const questionChoice = questions[questionNumber - 1].choices || [];
  const isLast = questionLength === questionNumber;
  const [response, setResponseState] = useRecoilState(responseListAtom);

  const { push } = useNavigator();

  const setResponse = (
    responseInput: { choiceId: number } | { answer: string },
  ) => {
    const newRes = [
      ...response.slice(0, +questionNumber - 1),
      responseInput,
      ...response.slice(+questionNumber),
    ];
    setResponseState(newRes);

    if (!isLast) {
      fa.logEvent(`response_question_${questionNumber}_next_button_click`, {
        responsesId,
      });
      fa.logEvent(
        `${responsesId}_response_question_${questionNumber}_next_button_click`,
      );
      push(`/responses/${responsesId}/${+questionNumber + 1}`);
    }
  };

  useEffect(() => {
    fa.logEvent(`response_question_${questionNumber}_show`, {
      responsesId,
      questionLength,
    });
    fa.logEvent(`${responsesId}_response_question_${questionNumber}_show`, {
      questionLength,
    });
  }, []);

  return (
    <>
      <NavBar type="BACK" title="설문 답변" />
      <StyledResponsePage>
        <div>
          <div className="response_title">
            <StyledQuestionDetailTitle>
              질문 {questionNumber}
            </StyledQuestionDetailTitle>
            {questionLength !== 1 && (
              <QuestionDot
                questionNumber={questionLength}
                number={+questionNumber}
              />
            )}
          </div>
          <StyledAnswerTitle>
            {questions[+questionNumber - 1].text}
          </StyledAnswerTitle>
        </div>
        {questionType === 2 ? (
          <ResponseTextInput
            {...{
              isLast,
              setResponse,
            }}
          />
        ) : (
          <ResponseChoiceInput
            {...{
              isLast,
              questionChoice,
              setResponse,
            }}
          />
        )}
      </StyledResponsePage>
    </>
  );
}

const StyledResponsePage = styled.section`
  background: #ffff;
  width: 100%;
  height: 100vh;
  padding: 8rem 1.6rem 1.6rem 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .response_title {
    display: flex;
    align-items: center;
  }
`;

const StyledQuestionDetailTitle = styled.h3`
  color: ${({ theme }) => theme.color.primaryOrange};
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 100%;
  margin-right: 0.8rem;
  font-family: ${({ theme }) => theme.fontFamily.title};
  margin-bottom: 0.8rem;
`;

const StyledAnswerTitle = styled.h3`
  color: #141414;
  font-weight: 600;
  margin-right: 0.5rem;
  font-size: 1.8rem;
  line-height: 140%;
  margin-bottom: 2.6rem;
`;
