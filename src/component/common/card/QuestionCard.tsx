import { ChangeEvent } from 'react';

import styled from '@emotion/styled';

import QuestionTitleInput from '@component/common/input/QuestionTitleInput';
import QuestionDetailHeader from '@component/questionDetail/QuestionDetailHeader';
import contents from '@config/const/const';

type QuestionCardType = {
  title: string;
  questionType: 2 | 3;
  questionIndex: number;
  handleChange: (e: ChangeEvent) => void;
};

const StyledQuestionCard = styled.li`
  width: 100%;
  background-color: #ffff;
  display: flex;
  flex-direction: column;
  position: relative;
  border-top: 1px solid #f4f4f4;
  padding-bottom: 24px;
  padding-top: 12px;
`;

const StyledQuestionInput = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #707070;
  padding: 4px;
  border-bottom: 1px solid #707070;
  width: 100px;
  margin-top: 20px;
  opacity: 0.5;
`;

export default function QuestionCard({
  title,
  questionIndex,
  questionType,
  handleChange,
}: QuestionCardType): JSX.Element {
  return (
    <StyledQuestionCard>
      <QuestionDetailHeader title={questionIndex} questionType={questionType} />
      <QuestionTitleInput
        questionIndex={questionIndex}
        onChange={handleChange}
        placeholder={contents.placeholder.TEXT}
        value={title}
      />
      <StyledQuestionInput>주관식 답변</StyledQuestionInput>
    </StyledQuestionCard>
  );
}
