import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';

import { useAnalytics } from '@src/analytics/faContext';

import { aggregationCardType } from './AggregationBrief';
import AggregationBriefChoice from './AggregationBriefChoice';
import AggregationBriefTextList from './AggregationBriefTextList';

export type answerTextType = {
  value: string;
  responseId: number;
};

export type answerChoiceType = {
  value: string;
  count: number;
};

export default function AggregationBriefCard({
  question,
  questionType,
  answers,
  showAll,
  setTabKey,
  order,
}: aggregationCardType & {
  showAll?: boolean;
  setTabKey?: React.Dispatch<React.SetStateAction<string>>;
  order: number;
}): JSX.Element {
  const { push } = useNavigator();
  const fa = useAnalytics();

  const handleClick = async () => {
    const surveyId = window.location.hash.split('/')[3].split('?')[0];
    fa.logEvent('surveyAggregation_showallbutton_click');
    const res = await push<number>(`survey/aggregation/${surveyId}/${order}`);

    if (res && setTabKey) {
      setTabKey('individual');
    }
  };

  return (
    <StyledAggregationCard>
      <h3 className="aggregation_card_title">질문 {order + 1}</h3>
      <span className="aggregation_card_text">{question}</span>
      {questionType === 2 ? (
        <AggregationBriefTextList
          setTabKey={setTabKey}
          answers={answers.map(ans => ans as answerTextType)}
          showAll={showAll}
        />
      ) : (
        <AggregationBriefChoice
          showAll={showAll}
          answers={answers.map(ans => ans as answerChoiceType)}
        />
      )}
      {!showAll && (
        <ShowAllButton onClick={handleClick}>전체 보기</ShowAllButton>
      )}
    </StyledAggregationCard>
  );
}

const ShowAllButton = styled.button`
  width: 100%;
  border: 1px solid #c9c9c9;
  margin-top: 2.4rem;
  border-radius: 4px;
  padding: 12px 0;
  background-color: #fff;
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.color.neutralBlack.text};
`;

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
  }
`;
