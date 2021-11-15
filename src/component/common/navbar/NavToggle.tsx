import styled from '@emotion/styled';

const StyledNavToggle = styled.ul`
  padding: 1.2rem;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  list-style: none;
  position: absolute;
  z-index: 99999999;
`;
const NavList = styled.li`
  padding: 1.2rem;
  font-size: 1.5rem;
  text-align: center;
  line-height: 120%;
  color: #707070;
  :focus {
    background-color: #f4f5f6;
  }
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
