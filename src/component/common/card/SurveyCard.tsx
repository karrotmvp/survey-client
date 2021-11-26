import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';

import { useAnalytics } from '@src/analytics/faContext';
import { surveyItemType } from '@src/page/SurveyHome';

const StyledSurveyCard = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2.2rem 1.6rem;
  border-bottom: 1px solid #f4f4f4;
  .survey_card_column {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.8rem;
    span {
      display: block;
      font-size: 1.2rem;
    }
    .column_create {
      font-weight: ${({ theme }) => theme.fontWeight.medium};
      color: #c9c9c9;
    }

    .column_target {
      font-weight: ${({ theme }) => theme.fontWeight.bold};
      color: ${({ theme }) => theme.color.primaryOrange};
    }
  }
`;

const SurveyCardTitle = styled.span`
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const SurveyCardSubtitle = styled.span`
  font-size: 1.3rem;
  margin-top: 0.8rem;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

export default function SurveyCard({
  createdAt,
  responseCount,
  surveyId,
  target,
  title,
}: surveyItemType): JSX.Element {
  const { push } = useNavigator();
  const fa = useAnalytics();
  const convertDate = (date: string): string => {
    const currentDate = new Date(date);
    return `${currentDate.getMonth()}월 ${currentDate.getDate()}일`;
  };
  return (
    <StyledSurveyCard
      onClick={() => {
        fa.logEvent('surveyList_click');
        push(`/survey/aggregation/${surveyId}`);
      }}
    >
      <div className="survey_card_column">
        <span className="column_target">{target}</span>
        <span className="column_create">{convertDate(createdAt)}</span>
      </div>
      <SurveyCardTitle>{title}</SurveyCardTitle>

      {responseCount !== 0 && (
        <SurveyCardSubtitle>답변 {responseCount}</SurveyCardSubtitle>
      )}
    </StyledSurveyCard>
  );
}
