import { MouseEvent } from 'react';

import styled from '@emotion/styled';

type IconButtonType = {
  buttonSize: 'LARGE' | 'SMALL';
  icon: React.ReactNode;
  text: string;
  buttonColor: 'PRIMARY' | 'WHITE';
  onClick?: (e: MouseEvent) => void;
};

type StyleButtonType = Pick<IconButtonType, 'buttonSize' | 'buttonColor'>;

const StyledIconButton = styled.button<StyleButtonType>`
  width: fit-content;
  display: flex;
  align-items: center;
  padding: ${({ buttonSize }) =>
    buttonSize === 'LARGE' ? '1.25rem 3rem' : '0.8rem 1rem'};
  border-radius: ${({ buttonSize }) =>
    buttonSize === 'LARGE' ? '3.3rem' : '2rem'};
  background-color: ${({ buttonColor, theme }) =>
    buttonColor === 'PRIMARY' ? theme.color.primaryOrange : '#ffff'};
  ${({ buttonSize }) =>
    buttonSize === 'LARGE'
      ? 'box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.25); position: absolute; bottom : 24px; left: 50%; transform: translate(-50%, -50%);'
      : ''};
`;

const ButtonText = styled.span<StyleButtonType>`
  font-size: ${({ buttonSize }) =>
    buttonSize === 'LARGE' ? '1.8rem' : '1.3rem'};
  font-weight: ${({ buttonSize }) => (buttonSize === 'LARGE' ? '700' : '400')};
  color: ${({ buttonColor, theme }) =>
    buttonColor === 'PRIMARY' ? theme.color.white : theme.color.gray};
  margin-left: ${({ buttonSize }) =>
    buttonSize === 'LARGE' ? '0.9rem' : '0.3rem'};
`;

export default function IconButton({
  buttonSize,
  icon,
  text,
  buttonColor,
  onClick,
}: IconButtonType): JSX.Element {
  return (
    <StyledIconButton onClick={onClick} {...{ buttonColor, buttonSize }}>
      {icon}
      <ButtonText {...{ buttonSize, buttonColor }}>{text}</ButtonText>
    </StyledIconButton>
  );
}
