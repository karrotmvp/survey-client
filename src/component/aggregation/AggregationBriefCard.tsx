import styled from '@emotion/styled';

import {
  aggregationCardType,
  answersChoiceType,
  answersTextType,
} from './AggregationBrief';
import AggregationBriefTextList from './AggregationBriefTextList';

export default function AggregationBriefCard({
  questionId,
  order,
  question,
  questionType,
  answers,
  setTabKey,
}: aggregationCardType & {
  setTabKey: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const typeTextAnswer = (
    ans: answersTextType | answersChoiceType,
  ): answersTextType => {
    if (ans.surveyResponseId !== undefined && ans.answer !== undefined) {
      return {
        answer: ans.answer,
        surveyResponseId: ans.surveyResponseId,
      };
    }
    return {
      answer: '',
      surveyResponseId: 0,
    };
  };
  return (
    <StyledAggregationCard>
      <h3 className="aggregation_card_title">질문 {order + 1}</h3>
      <span className="aggregation_card_text">{question}</span>
      {questionType === 2 && answers[0].answer !== undefined ? (
        <AggregationBriefTextList
          setTabKey={setTabKey}
          answers={answers.map(ans => typeTextAnswer(ans))}
        />
      ) : (
        <></>
      )}
    </StyledAggregationCard>
  );
}

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
