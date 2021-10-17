import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';

import mini from '@api/mini';
import { ReactComponent as ArrowIcon } from '@config/icon/arrow_back.svg';
import { ReactComponent as ClearIcon } from '@config/icon/clear.svg';

type NavBarType = {
  type: 'CLOSE' | 'BACK';
  appendRight?: React.ReactNode;
  title?: string;
};

const NavBarStyle = styled.div`
  display: flex;
  width: 100%;
  height: 3.5rem;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #ffff;
  padding: 16px;
  top: 0;
  left: 0;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1));
  z-index: 90;
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
}: NavBarType): JSX.Element {
  const { pop } = useNavigator();

  const goBack = () => {
    pop();
  };

  const close = () => {
    mini.close();
  };

  return (
    <NavBarStyle>
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
