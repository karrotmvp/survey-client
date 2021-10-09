import styled from '@emotion/styled';
import { ScreenHelmet } from '@karrotframe/navigator';

import { ReactComponent as ArrowIcon } from '@config/icon/arrow_back.svg';
import { ReactComponent as ClearIcon } from '@config/icon/clear.svg';

const NavBarStyle = styled.div`
  width: 100%;
  height: 3.5rem;
  display: flex;
  background-color: aqua;
`;

export default function NavBar(): JSX.Element {
  return (
    <>
      <NavBarStyle>
        <ArrowIcon />
        <ClearIcon />
      </NavBarStyle>
      <ScreenHelmet />
    </>
  );
}
