import { MouseEvent } from 'react';

import styled from '@emotion/styled';

const StyledAddButton = styled.button`
  padding: 0.8rem 0;
  width: 100%;
  background-color: #ffff;
  background: rgba(254, 126, 53, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  line-height: 120%;
  font-weight: 700;
  color: ${({ theme }) => theme.color.primaryOrange};
`;

type AddButtonType = {
  text: string;
  onClick: (e: MouseEvent) => void;
};

export default function AddButton({
  text,
  onClick,
}: AddButtonType): JSX.Element {
  return <StyledAddButton {...{ onClick }}>{text}</StyledAddButton>;
}
