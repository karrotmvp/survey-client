import styled from '@emotion/styled';

import { ReactComponent as TrashIcon } from '@config/icon/trash_can.svg';

import IconButton from '../button/IconButton';

type QuestionCardType = {
  title: string;
  description: string;
  type: 'INTRODUCE' | 'Q1' | 'Q2' | 'Q3';
  QuestionType?: 'CHOICE' | 'TEXT';
};

const QuestionCardTitle = styled.h3`
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 8px;
  line-height: 140%;
`;

const QuestionCardDescription = styled.span`
  font-weight: 400;
  font-size: 14px;
  opacity: 0.6;
`;

const QuestionCardTop = styled.div`
  padding: 16px;
`;

const QuestionCardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 25px;
  border-top: 1px solid #dfe1e3;
`;

const StyledQuestionCard = styled.li`
  width: 100%;
  height: 200px;
  border-radius: 20px;
  background-color: #ffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const QuestionCardText = styled.span`
  font-weight: 700;
  font-size: 1rem;
  color: ${({ theme }) => theme.color.secondaryGreen};
`;

const QuestionLeft = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const QuestionTypeTag = styled.div`
  padding: 5px 8px;
  background-color: ${({ theme }) => theme.color.whiteGreen};
  color: ${({ theme }) => theme.color.secondaryGreen};
  margin-left: 8px;
  font-weight: 400;
  font-size: 14px;
`;

export default function QuestionCard({
  title,
  description,
  type,
  QuestionType,
}: QuestionCardType): JSX.Element {
  const lineEnter = (text: string) =>
    text.split('\n').map(line => (
      <>
        {line}
        <br />
      </>
    ));

  return (
    <StyledQuestionCard>
      <QuestionCardTop>
        <QuestionCardTitle>{lineEnter(title)}</QuestionCardTitle>

        <QuestionCardDescription>{description}</QuestionCardDescription>
      </QuestionCardTop>

      <QuestionCardBottom>
        <QuestionLeft>
          <QuestionCardText>
            {type === 'INTRODUCE' ? '소개 페이지' : type}
          </QuestionCardText>
          {QuestionType && (
            <QuestionTypeTag>
              {QuestionType === 'CHOICE' ? '객관식' : '주관식'}
            </QuestionTypeTag>
          )}
        </QuestionLeft>
        <IconButton
          text="삭제"
          buttonColor="WHITE"
          buttonSize="SMALL"
          icon={<TrashIcon />}
        />
      </QuestionCardBottom>
    </StyledQuestionCard>
  );
}
