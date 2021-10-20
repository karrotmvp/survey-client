import styled from '@emotion/styled';

import SurveyCard from '@component/common/card/SurveyCard';

const StyledHomeSurveyList = styled.ul`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 1rem;
`;

export default function HomeSurveyList(): JSX.Element {
  return (
    <StyledHomeSurveyList>
      <SurveyCard title="설문1" answer={3} date="2021년 9월 10일" />
      <SurveyCard title="설문1" answer={3} date="2021년 9월 10일" />
      <SurveyCard title="설문1" answer={3} date="2021년 9월 10일" />
      <SurveyCard title="설문1" answer={3} date="2021년 9월 10일" />
      <SurveyCard title="설문1" answer={3} date="2021년 9월 10일" />
      <SurveyCard title="설문1" answer={3} date="2021년 9월 10일" />
      <SurveyCard title="설문1" answer={3} date="2021년 9월 10일" />
    </StyledHomeSurveyList>
  );
}
