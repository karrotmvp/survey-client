import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';

type QuestionCardType = {
  title: string;
  description?: string;
  questionType: 1 | 2 | 3;
  questionIndex: number;
};

const QuestionCardTitle = styled.h3`
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 10px;
  line-height: 140%;
`;

const QuestionCardDescription = styled.span`
  font-weight: 400;
  font-size: 14px;
  opacity: 0.6;
  display: inline-block;
`;

const StyledQuestionCard = styled.li`
  width: 100%;
  background-color: #ffff;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-bottom: 1px solid #c9c9c9;
`;

const QuestionCardText = styled.span`
  font-weight: 700;
  font-size: 1rem;
  color: ${({ theme }) => theme.color.secondaryGreen};
  margin-right: 8px;
`;

const QuestionLeft = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 14px;
`;

const QuestionTypeTag = styled.div`
  padding: 5px 8px;
  background-color: ${({ theme }) => theme.color.whiteGreen};
  color: ${({ theme }) => theme.color.secondaryGreen};
  margin-right: 8px;
  font-weight: 400;
  font-size: 14px;
`;

export default function QuestionCard({
  title,
  description,
  questionType,
  questionIndex,
}: QuestionCardType): JSX.Element {
  const { push } = useNavigator();
  const handleNav = () => {
    push(`question/${questionIndex + 1}`);
  };

  return (
    <StyledQuestionCard onClick={handleNav}>
      <QuestionLeft>
        <>
          <QuestionCardText>{`질문 ${questionIndex + 1}`}</QuestionCardText>

          <QuestionTypeTag>
            {questionType === 2 ? '주관식' : '객관식'}
          </QuestionTypeTag>
        </>
      </QuestionLeft>

      <QuestionCardTitle>{title}</QuestionCardTitle>
      {description && (
        <QuestionCardDescription>{description}</QuestionCardDescription>
      )}
    </StyledQuestionCard>
  );
}
