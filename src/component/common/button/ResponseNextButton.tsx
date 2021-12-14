import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import {
  useNavigator,
  useParams,
  useQueryParams,
} from '@karrotframe/navigator';
import { useRecoilValue } from 'recoil';

import AlertToastModal from '@component/common/modal/TostModal';
import { useAnalytics } from '@src/analytics/faContext';
import { questionListAtom } from '@src/atom/questionAtom';
import { responseListAtom } from '@src/atom/responseAtom';
import useSubmit from '@src/hook/useSubmit';

const NextButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.color.primaryOrange};
  color: #fff;
  font-size: 1.4rem;
  font-weight: 400;
  padding: 1.6rem 0;
  border-radius: 8px;
  margin-top: 0.8rem;
  &:disabled {
    background-color: #c9c9c9;
  }
`;

type ResponseNextButton = {
  isLast: boolean;
  disable?: boolean;
  handleNextClick: (e: React.MouseEvent) => void;
};

type responsePostBodyType = {
  surveyId: number;
  answers: { questionId: number; value: string }[];
};

export default function ResponseNextButton({
  isLast,
  handleNextClick,
  disable,
}: ResponseNextButton): JSX.Element {
  const { surveyId } =
    useParams<{ surveyId?: string; questionNumber?: string }>();
  if (!surveyId) throw new Error('questionNumber or surveyId none');
  const fa = useAnalytics();
  const responsePost = useSubmit<responsePostBodyType>('/mongo/responses');
  const { push } = useNavigator();
  const responseState = useRecoilValue(responseListAtom);
  const question = useRecoilValue(questionListAtom);
  const [isSubmit, setSubmit] = useState(false);
  const query = useQueryParams<{ ref?: string }>();
  const ref = query.ref || 'app';
  const [isToastOpen, setToastOpen] = useState(false);
  const answerCheck = responseState.every(({ value }) => value === '');
  const handleLastClick = (e: React.MouseEvent) => {
    fa.logEvent(`response_question_complete_button_click`, {
      surveyId,
      ref,
    });
    fa.logEvent(`${surveyId}_response_question_complete_button_click`, { ref });
    handleNextClick(e);
    setSubmit(true);
  };

  useEffect(() => {
    if (isSubmit && responseState.length === question.length) {
      const answers = question.map(({ questionId }, idx) => ({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        questionId: questionId!,
        value: responseState[idx].value,
      }));

      setSubmit(false);
      if (!answerCheck) {
        responsePost({
          surveyId: +surveyId,
          answers,
        });
        push(`/survey/${surveyId}/complete?ref=${ref}`);
      } else {
        setToastOpen(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit, responseState, answerCheck]);

  return (
    <>
      <AlertToastModal
        text={'하나 이상의 질문에 답해주세요!'}
        time={3000}
        bottom="3rem"
        isToastOpen={isToastOpen}
        setToastOpen={setToastOpen}
      />

      {isLast ? (
        <NextButton disabled={disable} onClick={handleLastClick}>
          설문 제출하기
        </NextButton>
      ) : (
        <NextButton disabled={disable} onClick={handleNextClick}>
          다음
        </NextButton>
      )}
    </>
  );
}
