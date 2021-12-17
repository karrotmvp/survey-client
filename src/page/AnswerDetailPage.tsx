import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import {
  useNavigator,
  useParams,
  useQueryParams,
} from '@karrotframe/navigator';
import { useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import AlertToastModal from '@component/common/modal/TostModal';
import ResponseTextInput from '@component/response/ResponseTextInput';
import { useAnalytics } from '@src/analytics/faContext';
import { questionListAtom } from '@src/atom/questionAtom';
import { responseListAtom, responseType } from '@src/atom/responseAtom';
import NavBar from '@src/component/common/navbar/NavBar';
import QuestionDot from '@src/component/questionDetail/QuestionDot';
import ResponseChoiceInput from '@src/component/response/ResponseChoiceInput';
import { useResponseShowEvent } from '@src/hook/useShowEvent';
import useSubmit from '@src/hook/useSubmit';

export type InputType = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  currentValue: string;
};

type responsePostBodyType = {
  surveyId: number;
  answers: { questionId: number; value: string }[];
};

export default function AnswerDetailPage(): JSX.Element {
  const questions = useRecoilValue(questionListAtom);
  const fa = useAnalytics();
  const { questionTypes, surveyId } =
    useParams<{ surveyId?: string; questionTypes?: string }>();
  if (!questionTypes || !surveyId)
    throw new Error('questionNumber or surveyId none');

  const questionNumber = Number.isNaN(+questionTypes) ? 1 : +questionTypes;
  const { questionType } = questions[questionNumber - 1];
  const questionLength = questions.length;
  const questionChoice = questions[questionNumber - 1].choices || [];
  const isLast = questionLength === questionNumber;
  const [response, setResponseState] = useRecoilState(responseListAtom);
  const [isToastOpen, setToastOpen] = useState(false);
  const { push } = useNavigator();
  const query = useQueryParams<{ ref?: string }>();
  const ref = query.ref || 'app';
  const history = useHistory();
  const initialValue = response[questionNumber - 1]
    ? response[questionNumber - 1].value || ''
    : '';

  const [value, setValue] = useState(initialValue);
  const responsePost = useSubmit<responsePostBodyType>('/mongo/responses');

  useResponseShowEvent(
    `response_question_${questionNumber}_show`,
    surveyId,
    ref,
  );

  const handleNextClick = () => {
    fa.logEvent(`response_question_${questionNumber}_next_button_click`, {
      surveyId,
      ref,
    });
    fa.logEvent(
      `${surveyId}_response_question_${questionNumber}_next_button_click`,
      { ref },
    );
    push(`/survey/${surveyId}/${+questionNumber + 1}?ref=${ref}`);
    setResponse({ value });
  };

  const setResponse = (responseInput: responseType) => {
    const newRes = [
      ...response.slice(0, +questionNumber - 1),
      responseInput,
      ...response.slice(+questionNumber),
    ];
    setResponseState(newRes);
  };

  const handleLastClick = (e: React.MouseEvent) => {
    fa.logEvent(`response_question_complete_button_click`, {
      surveyId,
      ref,
    });

    fa.logEvent(`${surveyId}_response_question_complete_button_click`, { ref });
    const responses = [
      ...response.slice(0, +questionNumber - 1),
      { value },
      ...response.slice(+questionNumber),
    ];

    const answerCheck = responses.every(res => res.value === '');

    if (!answerCheck) {
      const answers = questions.map(({ questionId }, idx) => ({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        questionId: questionId!,
        value: responses[idx].value,
      }));

      responsePost({
        surveyId: +surveyId,
        answers,
      });
      push(`/survey/${surveyId}/complete?ref=${ref}`);
    } else {
      setToastOpen(true);
    }
  };

  useEffect(() => {
    const unblock = history.block((location, action) => {
      if (action === 'POP' && isLast) {
        setResponse({ value });
      }
      return undefined;
    });

    return () => {
      unblock();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <>
      <AlertToastModal
        text={'하나 이상의 질문에 답해주세요!'}
        time={3000}
        bottom="3rem"
        isToastOpen={isToastOpen}
        setToastOpen={setToastOpen}
      />
      <NavBar type="BACK" title="설문 답변" />
      <StyledResponsePage>
        <div>
          <StyledQuestionDetailTitle>
            <h3>질문 {questionNumber}</h3>
            <span>
              {questionNumber}/{questionLength}
            </span>
          </StyledQuestionDetailTitle>

          <QuestionDot
            questionNumber={questionLength}
            number={+questionNumber}
          />

          <StyledAnswerTitle>
            {questions[+questionNumber - 1].text}
          </StyledAnswerTitle>
        </div>
        {questionType === 2 ? (
          <ResponseTextInput
            {...{
              setValue,
            }}
            currentValue={value}
          />
        ) : (
          <ResponseChoiceInput
            {...{
              questionChoice,
              setValue,
            }}
            currentValue={value}
          />
        )}
        <div className="button_wrapper">
          {isLast ? (
            <NextButton onClick={handleLastClick}>설문 제출하기</NextButton>
          ) : (
            <NextButton onClick={handleNextClick}>다음</NextButton>
          )}
        </div>
      </StyledResponsePage>
    </>
  );
}

const NextButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.color.primaryOrange};
  color: #fff;
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  padding: 1.6rem 0;
  border-radius: 8px;
  margin-top: 0.8rem;
  &:disabled {
    background-color: #c9c9c9;
  }
`;

const StyledResponsePage = styled.section`
  background: #ffff;
  width: 100%;
  height: 100vh;
  padding: 8rem 1.6rem 1.6rem 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .button_wrapper {
    background-color: #fff;
    padding-top: 1.6rem;
  }
`;

const StyledQuestionDetailTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  h3 {
    color: ${({ theme }) => theme.color.primaryOrange};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: 1.8rem;
    line-height: 100%;
  }
  span {
    font-size: 1.4rem;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.color.neutralBlack.placeholder};
  }
`;

const StyledAnswerTitle = styled.h3`
  color: #141414;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: 1.6rem;
  line-height: 140%;
  min-height: 8rem;
  margin-bottom: 2.6rem;
`;
