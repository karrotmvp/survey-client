import styled from '@emotion/styled';

type IconButtonType = {
  buttonSize: 'LARGE' | 'SMALL';
  icon: React.ReactNode;
  text: string;
  buttonColor: 'PRIMARY' | 'WHITE';
};

type StyleButtonType = Pick<IconButtonType, 'buttonSize' | 'buttonColor'>;

const StyledIconButton = styled.button<StyleButtonType>`
  display: flex;
  align-items: center;
  padding: ${({ buttonSize }) =>
    buttonSize === 'LARGE' ? '12.5px 30px' : '8px 16px'};
  border-radius: ${({ buttonSize }) =>
    buttonSize === 'LARGE' ? '33px' : '20px'};
  background-color: ${({ buttonColor, theme }) =>
    buttonColor === 'PRIMARY'
      ? theme.color.primaryOrange
      : theme.color.darkWhite};
  ${({ buttonSize }) =>
    buttonSize === 'LARGE'
      ? 'box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.25); position: absolute; bottom : 24px; left: 50%; transform: translate(-50%, -50%);'
      : ''};
`;

const ButtonText = styled.span<StyleButtonType>`
  font-size: ${({ buttonSize }) => (buttonSize === 'LARGE' ? '18px' : '14px')};
  font-weight: ${({ buttonSize }) => (buttonSize === 'LARGE' ? '700' : '400')};
  color: ${({ buttonColor, theme }) =>
    buttonColor === 'PRIMARY' ? theme.color.white : theme.color.gray};
  margin-left: ${({ buttonSize }) => (buttonSize === 'LARGE' ? '9px' : '3px')};
`;

export default function IconButton({
  buttonSize,
  icon,
  text,
  buttonColor,
}: IconButtonType): JSX.Element {
  return (
    <StyledIconButton {...{ buttonColor, buttonSize }}>
      {icon}
      <ButtonText {...{ buttonSize, buttonColor }}>{text}</ButtonText>
    </StyledIconButton>
  );
}
