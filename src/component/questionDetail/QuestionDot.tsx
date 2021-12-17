import styled from '@emotion/styled';

type QuestionType = {
  number: number;
  questionNumber: number;
};

const StyledQuestionDot = styled.div`
  width: 100%;
  height: 0.4rem;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.color.neutralBlack.tag};
  position: relative;
  margin: 1.2rem 0;
`;

const ProgressBar = styled.div<{ percent: number }>`
  width: ${({ percent }) => `${percent}%`};
  height: 0.4rem;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.color.primaryOrange};
  position: absolute;
  top: 0;
  left: 0;
`;

export default function QuestionDot({
  number,
  questionNumber,
}: QuestionType): JSX.Element {
  if (questionNumber === 1) return <></>;
  return (
    <StyledQuestionDot>
      <ProgressBar percent={(number / questionNumber) * 100} />
    </StyledQuestionDot>
  );
}
