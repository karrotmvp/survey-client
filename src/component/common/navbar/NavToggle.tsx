import styled from '@emotion/styled';

const StyledNavToggle = styled.ul`
  padding: 0.8rem 2.4rem;
  background: #ffffff;
  box-shadow: 0px 0px 0.8rem 0.1rem rgba(0, 0, 0, 0.1);
  border-radius: 1.6rem;
  list-style: none;
  position: absolute;
  z-index: 99999999;
`;
const NavList = styled.li`
  width: 10.6rem;
  padding: 0.8rem;
  font-size: 1.6rem;
  text-align: center;
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
