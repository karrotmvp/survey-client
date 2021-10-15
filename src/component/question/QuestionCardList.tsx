import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { questionListAtom } from '@atom/questionAtom';
import QuestionCard from '@component/common/card/QuestionCard';

const StyledQuestionCardList = styled.ul`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 16px;
`;

export default function QuestionCardList(): JSX.Element {
  const questionState = useRecoilValue(questionListAtom);
  return (
    <StyledQuestionCardList>
      {questionState.map(
        ({ questionType, text, description }, questionIndex) => (
          <QuestionCard
            key={questionIndex}
            title={text}
            questionType={questionType}
            description={description}
            questionIndex={questionIndex}
          />
        ),
      )}
    </StyledQuestionCardList>
  );
}
