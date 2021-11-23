import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { TitleViewAtom } from '@src/atom/responseAtom';
import { questionCardType } from '@src/page/QuestionPage';

import AggregationCard from './AggregationCard';

export default function AggregationCardList({
  questions,
}: {
  questions: questionCardType[];
}): JSX.Element {
  const isTitleView = useRecoilValue(TitleViewAtom);
  return (
    <StyledAggregationCardList isTitleView={isTitleView}>
      {questions.map((question, questionIdx) => (
        <AggregationCard
          key={questionIdx}
          questionIdx={questionIdx}
          isLast={questions.length === questionIdx + 1}
          {...question}
        />
      ))}
    </StyledAggregationCardList>
  );
}

const StyledAggregationCardList = styled.ul<{ isTitleView: boolean }>`
  display: grid;
  grid-gap: 0.8rem;
  grid-template-columns: auto;
  background-color: #f8f8f8;
  height: 100%;
  overflow-y: ${({ isTitleView }) => (isTitleView ? 'hidden' : 'scroll')};
`;
