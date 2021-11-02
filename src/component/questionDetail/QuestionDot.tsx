import styled from '@emotion/styled';

type QuestionType = {
  number: number;
};

const StyledQuestionDot = styled.div`
  height: 100%;
  align-items: flex-end;
  display: flex;
  padding-bottom: 8px;
`;

const Dot = styled.div<{ active?: boolean }>`
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.primaryOrange};
  margin: 0 3px;
  opacity: ${({ active }) => (active ? '1' : '0.4')};
`;

export default function QuestionDot({ number }: QuestionType): JSX.Element {
  switch (number) {
    case 1:
      return (
        <StyledQuestionDot>
          <Dot active />
          <Dot />
          <Dot />
        </StyledQuestionDot>
      );
    case 2:
      return (
        <StyledQuestionDot>
          <Dot active />
          <Dot active />
          <Dot />
        </StyledQuestionDot>
      );
    case 3:
      return (
        <StyledQuestionDot>
          <Dot active />
          <Dot active />
          <Dot active />
        </StyledQuestionDot>
      );
    default:
      return <></>;
  }
}
