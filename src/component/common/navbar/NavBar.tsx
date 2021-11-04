import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';

import mini from '@api/mini';
import { ReactComponent as ArrowIcon } from '@config/icon/arrow_back.svg';
import { ReactComponent as ClearIcon } from '@config/icon/clear.svg';

type NavBarType = {
  type: 'CLOSE' | 'BACK';
  appendRight?: React.ReactNode;
  title?: string;
  shadow?: boolean;
  transparent?: boolean;
  appendCenter?: React.ReactNode;
};

const NavBarStyle = styled.div<{ shadow?: boolean; transparent?: boolean }>`
  display: flex;
  width: 100%;
  height: 5.6rem;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ transparent }) =>
    transparent ? 'transparent' : '#ffff'};
  padding: 1.6rem;
  z-index: 99999;
  ${({ shadow }) => (shadow ? 'border-bottom : 1px solid #E5E5E5;' : '')};
  .nav_last {
    justify-content: flex-end;
  }
`;

const NavTitle = styled.span`
  margin-left: 1.6rem;
  color: #141414;
  font-size: 1.6rem;
  font-weight: 600;
  white-space: nowrap;
`;

const NavItem = styled.nav`
  display: flex;
  height: 100%;
  align-items: center;
  min-width: 33%;
`;

export default function NavBar({
  type,
  appendRight,
  appendCenter,
  title,
  transparent,
  shadow,
}: NavBarType): JSX.Element {
  const { pop } = useNavigator();

  const goBack = () => {
    pop();
  };

  const close = () => {
    mini.close();
  };

  return (
    <NavBarStyle shadow={shadow} transparent={transparent}>
      <NavItem>
        {type === 'CLOSE' ? (
          <ClearIcon onClick={close} />
        ) : (
          <ArrowIcon onClick={goBack} />
        )}
        {title && <NavTitle>{title}</NavTitle>}
      </NavItem>
      {appendCenter && <NavItem>{appendCenter}</NavItem>}
      <NavItem className={'nav_last'}>{appendRight}</NavItem>
    </NavBarStyle>
  );
}
