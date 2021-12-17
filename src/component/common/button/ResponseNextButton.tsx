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
import { responseListAtom } from '@src/atom/responseAtom';

const NextButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.color.primaryOrange};
  color: #fff;
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
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
  handleNextClick: (e: React.MouseEvent) => boolean;
};

// 리팩토링 필요

export default function ResponseNextButton({
  isLast,
  handleNextClick,
  disable,
}: ResponseNextButton): JSX.Element {
  const { surveyId } =
    useParams<{ surveyId?: string; questionTypes?: string }>();
  if (!surveyId) throw new Error('questionNumber or surveyId none');
  const fa = useAnalytics();
  const { push } = useNavigator();
  const responseState = useRecoilValue(responseListAtom);
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
    push(`/survey/${surveyId}/complete?ref=${ref}`);
  };

  useEffect(() => {
    if (!answerCheck) {
      push(`/survey/${surveyId}/complete?ref=${ref}`);
    } else {
      setToastOpen(true);
    }
  }, [answerCheck]);

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
