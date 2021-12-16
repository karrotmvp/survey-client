import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { TitleViewAtom } from '@src/atom/responseAtom';

import AggregationBriefCard from './AggregationBriefCard';

export type answersChoiceType = {
  count: number;
  value: string;
};

export type answersTextType = {
  responseId: number;
  value: string;
};

export type textAggregationCardType = {
  answers: answersTextType[];
  question: string;
  questionType: 2;
};

export type choiceAggregationCardType = {
  answers: answersChoiceType[];
  question: string;
  questionType: 3;
};

export type aggregationBriefType = (
  | textAggregationCardType
  | choiceAggregationCardType
)[];

export default function AggregationBrief({
  questionAggregations,
  setTabKey,
}: {
  questionAggregations: aggregationBriefType;
  setTabKey: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const isTitleView = useRecoilValue(TitleViewAtom);

  return (
    <StyledAggregationBrief isTitleView={isTitleView}>
      {questionAggregations &&
        questionAggregations.map(
          (
            aggregationData:
              | textAggregationCardType
              | choiceAggregationCardType,
            idx,
          ) => (
            <AggregationBriefCard
              setTabKey={setTabKey}
              key={idx}
              order={idx}
              aggregationData={aggregationData}
            />
          ),
        )}
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
