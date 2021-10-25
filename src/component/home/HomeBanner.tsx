import styled from '@emotion/styled';

const StyledHomeBanner = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
`;

const StyledHighlight = styled.span`
  color: ${({ theme }) => theme.color.primaryOrange};
  font-family: ${({ theme }) => theme.fontFamily.title};
  font-weight: 700;
`;
const StyledText = styled.h1`
  font-size: 1.3rem;
  font-family: ${({ theme }) => theme.fontFamily.title};
  font-weight: 400;
  margin-bottom: 8px;
`;

export default function HomeBanner(): JSX.Element {
  return (
    <StyledHomeBanner>
      <StyledText>
        <StyledHighlight>설문</StyledHighlight>을 만들고
      </StyledText>
      <StyledText>
        우리 동네 이웃 <StyledHighlight>의견</StyledHighlight>을 들어봐요
      </StyledText>
    </StyledHomeBanner>
  );
}
