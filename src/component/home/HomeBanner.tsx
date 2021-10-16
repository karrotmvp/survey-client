import styled from '@emotion/styled';

const StyledHomeBanner = styled.div`
  font-size: 22px;
  font-weight: 700;
  font-family: 'S-Core Dream';
  padding-top: 40px;
`;

const StyledHighlight = styled.span`
  color: ${({ theme }) => theme.color.primaryOrange};
  font-weight: 700;
`;
const StyledText = styled.h1`
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
        고객님의 <StyledHighlight>의견</StyledHighlight>을 들어봐요
      </StyledText>
    </StyledHomeBanner>
  );
}
