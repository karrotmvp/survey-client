import styled from '@emotion/styled';

type TextButtonType = {
  text: string;
  buttonSize: 'LARGE' | 'SMALL';
  buttonColor: 'PRIMARY' | 'WHITE';
};

type StyledType = Pick<TextButtonType, 'buttonSize' | 'buttonColor'>;

const StyledTextButton = styled.button<StyledType>`
  padding: ${({ buttonSize }) =>
    buttonSize === 'SMALL' ? '15px 63px' : '15px 130px'};
  border-radius: 33px;
  font-size: 18px;
  font-weight: 700;
  background-color: ${({ buttonColor, theme }) =>
    buttonColor === 'PRIMARY'
      ? theme.color.primaryOrange
      : theme.color.darkWhite};
  color: ${({ buttonColor, theme }) =>
    buttonColor === 'PRIMARY' ? theme.color.white : theme.color.gray};
`;

export default function TextButton({
  text,
  buttonSize,
  buttonColor,
}: TextButtonType): JSX.Element {
  return (
    <StyledTextButton {...{ buttonSize, buttonColor }}>{text}</StyledTextButton>
  );
}
