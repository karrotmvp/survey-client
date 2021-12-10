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
  const arr = new Array(questionNumber).fill(0);
  if (questionNumber === 1) return <></>;
  return (
    <StyledQuestionDot>
      {arr.map((res, idx) => (idx < number ? <Dot active /> : <Dot />))}
    </StyledQuestionDot>
  );
}
