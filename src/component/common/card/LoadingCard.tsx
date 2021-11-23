import styled from '@emotion/styled';
import Skeleton from 'react-loading-skeleton';

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
  }
`;

export default function LoadingCard({ count }: { count: number }): JSX.Element {
  const countArray = new Array(count).fill(0);
  return (
    <>
      {countArray.map((v, idx) => (
        <StyledSurveyCard key={idx}>
          <div className="survey_card_column">
            <Skeleton borderRadius={10} width="45px" height="12px" />
            <Skeleton borderRadius={10} width="54px" height="12px" />
          </div>
          <Skeleton borderRadius={8} width="80%" height="16px" />
          <Skeleton
            borderRadius={5}
            style={{ marginTop: '0.8rem' }}
            width="35px"
            height="16px"
          />
        </StyledSurveyCard>
      ))}
    </>
  );
}
