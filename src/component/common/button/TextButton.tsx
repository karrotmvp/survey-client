import styled from '@emotion/styled';

type TextButtonType = {
  text: string;
  buttonSize: 'LARGE' | 'SMALL';
  buttonColor: string;
  buttonBgColor: string;
};

type StyledType = Pick<
  TextButtonType,
  'buttonSize' | 'buttonColor' | 'buttonBgColor'
>;

const StyledTextButton = styled.button<StyledType>`
  padding: ${({ buttonSize }) =>
    buttonSize === 'SMALL' ? '8px 16px' : '15px 0'};
  ${({ buttonSize }) => (buttonSize === 'SMALL' ? '' : 'width: 100%')};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  background-color: ${({ buttonBgColor }) => buttonBgColor};
  color: ${({ buttonColor }) => buttonColor};
`;

export default function TextButton({
  text,
  buttonSize,
  buttonColor,
  buttonBgColor,
}: TextButtonType): JSX.Element {
  return (
    <StyledTextButton {...{ buttonSize, buttonColor, buttonBgColor }}>
      {text}
    </StyledTextButton>
  );
}
