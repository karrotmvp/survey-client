import styled from '@emotion/styled';
import { useQueryParams } from '@karrotframe/navigator';

import NavBar from '@src/component/common/navbar/NavBar';

const StyledGuidePage = styled.section`
  height: 100vh;
  overflow: scroll;
`;

const StyledGuideImg = styled.img`
  width: 100%;
`;

export default function ExamplePage(): JSX.Element {
  const { _si } = useQueryParams<{ _si: string }>();

  return (
    <StyledGuidePage>
      <NavBar type={_si === '0' ? 'CLOSE' : 'BACK'} transparent />
      <StyledGuideImg src="./img/exampleGuide.png" />
    </StyledGuidePage>
  );
}
