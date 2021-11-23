import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';

import {
  aggregationCardType,
  answersChoiceType,
  answersTextType,
} from './AggregationBrief';
import AggregationBriefChoice from './AggregationBriefChoice';
import AggregationBriefTextList from './AggregationBriefTextList';

export default function AggregationBriefCard({
  questionId,
  order,
  question,
  questionType,
  answers,
  showAll,
  setTabKey,
}: aggregationCardType & {
  showAll?: boolean;
  setTabKey?: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const { push } = useNavigator();

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
  // const setResponseId = useSetRecoilState(responseIndividualAtom);
  const handleClick = async () => {
    const surveyId = window.location.hash.split('/')[3].split('?')[0];

    const res = await push<number>(`survey/aggregation/${surveyId}/${order}`);

    if (res && setTabKey) {
      setTabKey('개별보기');
    }
  };

  const typeChoiceAnswer = (
    ans: answersTextType | answersChoiceType,
  ): answersChoiceType => {
    if (ans.count !== undefined && ans.value !== undefined) {
      return {
        value: ans.value,
        count: ans.count,
      };
    }
    return {
      value: '',
      count: 0,
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
          showAll={showAll}
        />
      ) : (
        <AggregationBriefChoice
          showAll={showAll}
          answers={answers.map(ans => typeChoiceAnswer(ans))}
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
