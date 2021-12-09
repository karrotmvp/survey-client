import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { TitleViewAtom } from '@src/atom/responseAtom';

import AggregationBriefCard from './AggregationBriefCard';

export type answersType = {
  [key: string]: string | number;
};

export type aggregationCardType = {
  answers: answersType[];
  question: string;
  questionType: 2 | 3;
};

export type aggregationBriefType = aggregationCardType[];

export default function AggregationBrief({
  questionAggregations,
  setTabKey,
}: {
  questionAggregations: aggregationCardType[];
  setTabKey: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const isTitleView = useRecoilValue(TitleViewAtom);
  return (
    <StyledAggregationBrief isTitleView={isTitleView}>
      {questionAggregations &&
        questionAggregations.map((data, idx) => (
          <AggregationBriefCard
            setTabKey={setTabKey}
            key={idx}
            order={idx}
            {...data}
          />
        ))}
    </StyledAggregationBrief>
  );
}

const StyledAggregationBrief = styled.ul<{ isTitleView: boolean }>`
  padding: 0.9rem 0 8rem 0;
  background: #f8f8f8;
  display: grid;
  grid-gap: 0.8rem;
  grid-template-columns: auto;
  margin-bottom: 8rem;
  overflow-y: ${({ isTitleView }) => (isTitleView ? 'hidden' : 'scroll')};
  height: calc(100% - 5.5rem);
`;
