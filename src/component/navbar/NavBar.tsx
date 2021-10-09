import styled from '@emotion/styled';

import { ReactComponent as ArrowIcon } from '@config/icon/arrow_back.svg';
import { ReactComponent as ClearIcon } from '@config/icon/clear.svg';

const NavBarStyle = styled.div`
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

type NavBarType = {
  type: 'CLOSE' | 'BACK';
  appendRight?: React.ReactNode;
};

export default function NavBar({ type, appendRight }: NavBarType): JSX.Element {
  return (
    <NavBarStyle>
      {type === 'CLOSE' ? <ClearIcon /> : <ArrowIcon />}
      {appendRight}
    </NavBarStyle>
  );
}
