import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';

import { ReactComponent as ArrowIcon } from '@config/icon/arrow_back.svg';
import { ReactComponent as ClearIcon } from '@config/icon/clear.svg';

type NavBarType = {
  type: 'CLOSE' | 'BACK';
  appendRight?: React.ReactNode;
  navColor: 'GRAY' | 'WHITE';
  title?: string;
};

type StyleNavBarType = Pick<NavBarType, 'navColor'>;

const NavBarStyle = styled.div<StyleNavBarType>`
  display: flex;
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

const NavTitle = styled.span`
  margin-left: 36px;
  color: #8e8f95;
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
  navColor,
  title,
}: NavBarType): JSX.Element {
  const { pop } = useNavigator();

  const goBack = () => {
    pop();
  };

  return (
    <NavBarStyle {...{ navColor }}>
      <AppendLeft>
        {type === 'CLOSE' ? <ClearIcon /> : <ArrowIcon onClick={goBack} />}
        {title && <NavTitle>{title}</NavTitle>}
      </AppendLeft>
      {appendRight}
    </NavBarStyle>
  );
}
