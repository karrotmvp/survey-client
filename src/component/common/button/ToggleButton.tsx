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
  padding: 8px 0.7rem 8px 0.9rem;
  border-radius: 4px;
  background-color: transparent;
  color: #707070;
  :focus {
    background-color: #f4f5f6;
  }
`;

const ButtonText = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-right: 8px;
  color: #707070;
`;

const ToggleIcon = styled(ExpandIcon)<{ toggle: boolean }>`
  ${({ toggle }) => (toggle ? `transform: rotate(180deg)` : '')};
`;

export default function ToggleButton({
  text,
  onClick,
  toggle,
}: ToggleButtonType): JSX.Element {
  return (
    <StyledToggleButton onClick={onClick}>
      <ButtonText>{text}</ButtonText>
      <ToggleIcon toggle={toggle} />
    </StyledToggleButton>
  );
}
