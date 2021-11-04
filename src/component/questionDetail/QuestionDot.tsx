import styled from '@emotion/styled';

type QuestionType = {
  number: number;
  questionNumber: number;
};

const StyledQuestionDot = styled.div`
  height: 100%;
  align-items: flex-end;
  display: flex;
  padding-bottom: 8px;
`;

const Dot = styled.div<{ active?: boolean }>`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.primaryOrange};
  margin: 0 3px;
  opacity: ${({ active }) => (active ? '1' : '0.4')};
`;

export default function QuestionDot({
  number,
  questionNumber,
}: QuestionType): JSX.Element {
  switch (number) {
    case 1:
      return (
        <StyledQuestionDot>
          <Dot active />
          <Dot />
          {questionNumber === 2 ? null : <Dot />}
        </StyledQuestionDot>
      );
    case 2:
      return (
        <StyledQuestionDot>
          <Dot active />
          <Dot active />
          {questionNumber === 2 ? null : <Dot />}
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
