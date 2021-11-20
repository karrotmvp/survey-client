import styled from '@emotion/styled';

import { questionCardType } from '@src/page/QuestionPage';

import AggregationChoiceList from './AggregationChoiceList';

const StyledAggregationCard = styled.div`
  padding: 2.4rem 2rem;
  background-color: #fff;
  .aggregation_card_title {
    font-size: 1.3rem;
    color: ${({ theme }) => theme.color.primaryOrange};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    margin-bottom: 1.2rem;
  }
  .aggregation_card_text {
    display: block;
    font-size: 1.5rem;
    line-height: 140%;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    margin-bottom: 2rem;
  }
`;

const StyledQuestionInput = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  color: #707070;
  padding: 0.6rem 0;
  border-bottom: 1px solid #707070;
`;

export default function AggregationCard({
  text,
  questionType,
  choices,
  questionIdx,
}: questionCardType & { questionIdx: number }): JSX.Element {
  return (
    <StyledAggregationCard>
      <h3 className="aggregation_card_title">질문 {questionIdx + 1}</h3>
      <span className="aggregation_card_text">{text}</span>

      {questionType === 2 ? (
        <StyledQuestionInput>주관식 답변...</StyledQuestionInput>
      ) : (
        <AggregationChoiceList {...{ choices }} />
      )}
    </StyledAggregationCard>
  );
}
