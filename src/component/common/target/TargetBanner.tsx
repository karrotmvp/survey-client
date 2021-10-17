import styled from '@emotion/styled';

import media from '@src/config/utils/util';

const StyledTargetBanner = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.fontFamily.title};
  color: ${({ theme }) => theme.color.primaryOrange};
  padding-top: 24px;
  line-height: 30.8px;
  ${media.custom(360)} {
    font-size: 1rem;
  }
`;

const StyledHighlight = styled.span`
  font-weight: 700;
`;
const StyledText = styled.h1`
  font-weight: 400;
  margin-bottom: 8px;
`;

export default function TargetBanner(): JSX.Element {
  return (
    <StyledTargetBanner>
      <StyledText>
        답변을 받고 싶은 <StyledHighlight>고객님</StyledHighlight>을
      </StyledText>
      <StyledText>
        <StyledHighlight>설정</StyledHighlight>할 수 있어요
      </StyledText>
    </StyledTargetBanner>
  );
}
