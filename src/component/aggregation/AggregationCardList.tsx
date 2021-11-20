import styled from '@emotion/styled';

import { questionCardType } from '@src/page/QuestionPage';

import AggregationCard from './AggregationCard';

export default function AggregationCardList({
  questions,
}: {
  questions: questionCardType[];
}): JSX.Element {
  return (
    <StyledAggregationCardList>
      {questions.map((question, questionIdx) => (
        <AggregationCard
          key={questionIdx}
          questionIdx={questionIdx}
          {...question}
        />
      ))}
    </StyledAggregationCardList>
  );
}

const StyledAggregationCardList = styled.ul`
  display: grid;
  grid-gap: 0.8rem;
  grid-template-columns: auto;
  background-color: #f8f8f8;
`;
