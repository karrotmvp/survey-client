import { ChangeEvent } from 'react';

import styled from '@emotion/styled';

import QuestionTitleInput from '@component/common/input/QuestionTitleInput';
import QuestionDetailHeader from '@component/questionDetail/QuestionDetailHeader';
import contents from '@config/const/const';
import QuestionChoiceList from '@src/component/questionDetail/QuestionChoiceList';

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
  opacity: 0.5;
`;
const StyledQuestionChoiceOrText = styled.div`
  padding-top: 16px;
`;

const Divid = styled.div`
  width: 100%;
  height: 1px;
  background-color: #f4f4f4;
`;

export default function QuestionCard({
  title,
  questionIndex,
  questionType,
  handleChange,
}: QuestionCardType): JSX.Element {
  return (
    <>
      {questionIndex !== 0 && <Divid />}
      <StyledQuestionCard>
        <QuestionDetailHeader {...{ questionIndex, questionType }} />
        <QuestionTitleInput
          questionIndex={questionIndex}
          onChange={handleChange}
          placeholder={contents.placeholder.TEXT}
          value={title}
        />
        <StyledQuestionChoiceOrText>
          {questionType === 2 ? (
            <StyledQuestionInput>주관식 답변</StyledQuestionInput>
          ) : (
            <QuestionChoiceList questionIndex={questionIndex} />
          )}
        </StyledQuestionChoiceOrText>
      </StyledQuestionCard>
    </>
  );
}
