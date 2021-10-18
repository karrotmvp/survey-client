import { MouseEvent } from 'react';

import styled from '@emotion/styled';

import { ReactComponent as ExpandIcon } from '@config/icon/expand_more.svg';

type ToggleButtonType = {
  text: string;
  onClick?: (e: MouseEvent) => void;
};

const StyledToggleButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 1rem;
  border-radius: 20px;
  background-color: transparent;
`;

const ButtonText = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  margin-right: 8px;
  color: #8e8f95;
`;

export default function ToggleButton({
  text,
  onClick,
}: ToggleButtonType): JSX.Element {
  return (
    <StyledToggleButton onClick={onClick}>
      <ButtonText>{text}</ButtonText>
      <ExpandIcon />
    </StyledToggleButton>
  );
}
