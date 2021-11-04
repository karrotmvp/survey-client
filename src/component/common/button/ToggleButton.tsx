import { MouseEvent } from 'react';

import styled from '@emotion/styled';

import { ReactComponent as ExpandIcon } from '@config/icon/expand_more.svg';

type ToggleButtonType = {
  text: string;
  onClick?: (e: MouseEvent) => void;
  toggle: boolean;
};

const StyledToggleButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.6rem 0.8rem 0.5rem;
  border-radius: 4px;
  background-color: transparent;
  color: #707070;
  :focus {
    background-color: #f4f5f6;
  }
`;

const ButtonText = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  margin-right: 0.8rem;
  color: #707070;
`;

const ToggleIcon = styled(ExpandIcon)`
  &[aria-checked='true'] {
    transform: rotate(180deg);
  }
`;

export default function ToggleButton({
  text,
  onClick,
  toggle,
}: ToggleButtonType): JSX.Element {
  return (
    <StyledToggleButton onClick={onClick}>
      <ButtonText>{text}</ButtonText>
      <ToggleIcon aria-checked={toggle} />
    </StyledToggleButton>
  );
}
