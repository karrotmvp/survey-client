import styled from '@emotion/styled';

const StyledNavToggle = styled.ul`
  padding: 8px 24px;
  background: #ffffff;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  list-style: none;
  position: absolute;
  z-index: 99999999;
`;
const NavList = styled.li`
  width: 106px;
  padding: 8px;
  font-size: 1rem;
  text-align: center;
  color: 707070;
`;

export default function NavToggle({
  navList,
  position,
  onClick,
  toggleRef,
}: {
  navList: string[];
  position?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
  toggleRef: React.RefObject<HTMLUListElement>;
}): JSX.Element {
  return (
    <StyledNavToggle style={position} ref={toggleRef}>
      {navList.map((content, idx) => (
        <NavList key={idx} data-list={idx} onClick={onClick}>
          {content}
        </NavList>
      ))}
    </StyledNavToggle>
  );
}
