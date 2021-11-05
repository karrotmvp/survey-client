import styled from '@emotion/styled';

import NavBar from '@src/component/common/navbar/NavBar';

const StyledGuidePage = styled.section``;

const StyledGuideImg = styled.img`
  width: 100%;
`;

export default function GuidePage(): JSX.Element {
  return (
    <StyledGuidePage>
      <NavBar type="CLOSE" transparent />
      <StyledGuideImg src="./img/guideImg.png" />
    </StyledGuidePage>
  );
}
