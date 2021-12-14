import styled from '@emotion/styled';

const StyledHomeBanner = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
`;

const StyledText = styled.h1`
  font-size: 2.2rem;
  font-weight: 400;
  margin-bottom: 8px;
  color: #707070;
`;

export default function HomeBanner(): JSX.Element {
  return (
    <StyledHomeBanner>
      <StyledText>설문을 만들고</StyledText>
      <StyledText>동네 이웃 의견을 들어봐요</StyledText>
    </StyledHomeBanner>
  );
}
