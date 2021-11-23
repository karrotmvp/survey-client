import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { TitleViewAtom } from '@src/atom/responseAtom';

import AggregationBriefCard from './AggregationBriefCard';

export type answersChoiceType = {
  answer?: string;
  surveyResponseId?: number;
  value: string;
  count: number;
};

export type answersTextType = {
  answer: string;
  surveyResponseId: number;
  value?: string;
  count?: number;
};

export type aggregationCardType =
  | {
      answers: answersTextType[];
      order: number;
      question: string;
      questionId: number;
      questionType: 2;
    }
  | {
      answers: answersChoiceType[];
      order: number;
      question: string;
      questionId: number;
      questionType: 3;
    };

export type aggregationBriefType = {
  surveyId: number;
  questionAggregations: aggregationCardType[];
};

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
      {questionAggregations.map(data => (
        <AggregationBriefCard
          setTabKey={setTabKey}
          key={data.questionId}
          {...data}
        />
      ))}
    </StyledAggregationBrief>
  );
}

const StyledAggregationBrief = styled.ul<{ isTitleView: boolean }>`
  padding: 0.9rem 0;
  background: #f8f8f8;
  display: grid;
  grid-gap: 0.8rem;
  grid-template-columns: auto;
  overflow-y: ${({ isTitleView }) => (isTitleView ? 'hidden' : 'scroll')};
  height: calc(100% - 5.5rem);
`;
