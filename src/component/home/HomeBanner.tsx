import styled from '@emotion/styled';

type HomeBannerType = {
  storeName: string;
};

const StyledHomeBanner = styled.div`
  font-size: 22px;
  font-weight: 700;
  font-family: 'S-Core Dream';
  padding-top: 40px;
`;

const StyledHighlight = styled.h1`
  font-size: 22px;
  color: ${({ theme }) => theme.color.primaryOrange};
  font-weight: 700;
`;
const StyledText = styled.h1`
  font-weight: 400;
  margin-bottom: 8px;
`;

export default function HomeBanner({ storeName }: HomeBannerType): JSX.Element {
  return (
    <StyledHomeBanner>
      <StyledText>안녕하세요</StyledText>
      <StyledHighlight>{storeName} 사장님! 👋</StyledHighlight>
    </StyledHomeBanner>
  );
}
