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
};

const NavBarStyle = styled.div<{ shadow?: boolean }>`
  display: flex;
  width: 100%;
  height: 3.5rem;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffff;
  padding: 1rem;
  z-index: 99999;
   ${({ shadow }) =>
     shadow ? 'filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1));' : ''}
  }
`;

const NavTitle = styled.span`
  margin-left: 36px;
  color: #141414;
  font-size: 1rem;
  font-weight: 700;
`;

const AppendLeft = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

export default function NavBar({
  type,
  appendRight,
  title,
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
    <NavBarStyle shadow={shadow}>
      <AppendLeft>
        {type === 'CLOSE' ? (
          <ClearIcon onClick={close} />
        ) : (
          <ArrowIcon onClick={goBack} />
        )}
        {title && <NavTitle>{title}</NavTitle>}
      </AppendLeft>
      {appendRight}
    </NavBarStyle>
  );
}
