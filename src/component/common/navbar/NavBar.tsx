import styled from '@emotion/styled';

import { ReactComponent as ArrowIcon } from '@config/icon/arrow_back.svg';
import { ReactComponent as ClearIcon } from '@config/icon/clear.svg';

type NavBarType = {
  type: 'CLOSE' | 'BACK';
  appendRight?: React.ReactNode;
  navColor: 'GRAY' | 'WHITE';
};

type StyleNavBarType = Pick<NavBarType, 'navColor'>;

const NavBarStyle = styled.div<StyleNavBarType>`
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ navColor, theme }) =>
    navColor === 'GRAY' ? '#e5e5e5' : '#ffff'};
`;

export default function NavBar({
  type,
  appendRight,
  navColor,
}: NavBarType): JSX.Element {
  return (
    <NavBarStyle {...{ navColor }}>
      {type === 'CLOSE' ? <ClearIcon /> : <ArrowIcon />}
      {appendRight}
    </NavBarStyle>
  );
}
