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
  padding: 8px 16px;
  border-radius: 20px;
  background-color: #ebf9f4;
`;

const ButtonText = styled.span`
  font-size: 14px;
  font-weight: 400;
  margin-right: 8px;
  color: ${({ theme }) => theme.color.secondaryGreen};
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
