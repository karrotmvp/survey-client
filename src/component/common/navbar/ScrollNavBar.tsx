import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';

import mini from '@api/mini';
import { ReactComponent as ArrowIcon } from '@config/icon/arrow_back.svg';
import { ReactComponent as ClearIcon } from '@config/icon/clear.svg';

type NavBarType = {
  type: 'CLOSE' | 'BACK';
  appendRight?: React.ReactNode;
  reverse?: boolean;
  title?: string;
  shadow?: boolean;
  transparent?: boolean;
  white?: boolean;
  appendCenter?: React.ReactNode;
  titleAppear?: boolean;
};

const NavBarStyle = styled.div<{
  shadow?: boolean;
  transparent?: boolean;
  reverse?: boolean;
}>`
  display: flex;
  width: 100%;
  height: 5.6rem;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  -webkit-transform: translate3d(0, 0, 0);
  top: 0;
  left: 0;
  background-color: ${({ transparent }) =>
    transparent ? 'transparent' : '#ffff'};
  padding: 1.6rem;
  z-index: 99999;
  ${({ reverse }) => (reverse ? 'flex-direction: row-reverse;' : null)}

  ${({ shadow }) => (shadow ? 'border-bottom : 1px solid #E5E5E5;' : '')};
  .nav_last {
    justify-content: flex-end;
  }

  .nav {
    ${({ reverse }) => (reverse ? 'flex-direction: row-reverse;' : null)}
  }
`;

const NavTitle = styled.span<{ titleAppear: boolean | undefined }>`
  margin-left: 1.6rem;
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  transition: 0.3s;
  color: ${({ titleAppear }) => (titleAppear ? '#141414' : '#fff')};
`;

const NavItem = styled.nav<{ isAppendCenter?: boolean }>`
  display: flex;
  height: 100%;
  align-items: center;
  ${({ isAppendCenter }) =>
    isAppendCenter ? ' min-width: 33%;' : 'min-width: 10%;'}
`;

export default function ScrollNavBar({
  type,
  reverse,
  appendRight,
  appendCenter,
  title,
  transparent,
  shadow,
  white,
  titleAppear,
}: NavBarType): JSX.Element {
  const { pop } = useNavigator();

  const goBack = () => {
    pop();
  };

  const close = () => {
    mini.close();
  };

  return (
    <NavBarStyle {...{ shadow, transparent, reverse }}>
      <NavItem className="nav">
        {type === 'CLOSE' ? (
          <StyledClearIcon onClick={close} white={white} />
        ) : (
          <ArrowIcon onClick={goBack} />
        )}
        {title && <NavTitle titleAppear={titleAppear}>{title}</NavTitle>}
      </NavItem>

      {appendCenter && <NavItem className="nav">{appendCenter}</NavItem>}

      <NavItem
        className={'nav nav_last'}
        isAppendCenter={Boolean(appendCenter)}
      >
        {appendRight}
      </NavItem>
    </NavBarStyle>
  );
}

const StyledClearIcon = styled(ClearIcon)<{ white: boolean | undefined }>`
  color: ${({ white }) => (white ? 'white' : '')};
`;
