import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { questionListAtom } from '@atom/questionAtom';
import QuestionCard from '@component/common/card/QuestionCard';

const StyledQuestionCardList = styled.ul`
  display: grid;
  grid-template-columns: auto;
`;

export default function QuestionCardList(): JSX.Element {
  const questionListState = useRecoilValue(questionListAtom);
  console.log(questionListState);
  return (
    <StyledQuestionCardList>
      {questionListState.map(
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
