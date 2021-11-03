import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator, useParams } from '@karrotframe/navigator';
import { useRecoilValue } from 'recoil';

import { questionListAtom } from '@src/atom/questionAtom';
import { responseListAtom } from '@src/atom/responseAtom';
import useSubmit from '@src/hook/useSubmit';

const NextButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.color.primaryOrange};
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  padding: 1rem 0;
  border-radius: 8px;
`;

type ResponseNextButton = {
  isLast: boolean;
  handleNextClick: (e: React.MouseEvent) => void;
};

export default function ResponseNextButton({
  isLast,
  handleNextClick,
}: ResponseNextButton): JSX.Element {
  const { responsesId } =
    useParams<{ responsesId?: string; questionNumber?: string }>();
  if (!responsesId) throw new Error('questionNumber or responsesId none');

  const responsePost = useSubmit('/responses');
  const { push } = useNavigator();
  const responseState = useRecoilValue(responseListAtom);
  const question = useRecoilValue(questionListAtom);
  const [isSubmit, setSubmit] = useState(false);
  const handleLastClick = (e: React.MouseEvent) => {
    handleNextClick(e);
    setSubmit(true);
  };

  useEffect(() => {
    if (isSubmit && responseState.length === question.length) {
      const responses = question.map(({ questionType, questionId }, idx) => ({
        questionType,
        questionId,
        ...responseState[idx],
      }));

      responsePost({
        surveyId: +responsesId,
        responses,
      });
      setSubmit(false);
      push(`/responses/${responsesId}/complete`);
    }
  }, [isSubmit, responseState]);

  return (
    <>
      {isLast ? (
        <NextButton onClick={handleLastClick}>설문 제출하기</NextButton>
      ) : (
        <NextButton onClick={handleNextClick}>다음</NextButton>
      )}
    </>
  );
}
