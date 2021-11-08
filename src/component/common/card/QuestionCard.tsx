import { ChangeEvent } from 'react';

import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import QuestionTitleInput from '@component/common/input/QuestionTitleInput';
import QuestionDetailHeader from '@component/questionDetail/QuestionDetailHeader';
import contents from '@config/const/const';
import { questionValidationAtom } from '@src/atom/questionAtom';
import QuestionChoiceList from '@src/component/questionDetail/QuestionChoiceList';

type QuestionCardType = {
  title: string;
  questionType: 2 | 3;
  questionIndex: number;
  handleChange: (e: ChangeEvent) => void;
  warning: boolean;
};

const StyledQuestionCard = styled.li`
  width: 100%;
  background-color: #ffff;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 1.6rem;
  padding-top: 1.6rem;
`;

const StyledQuestionInput = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  color: #707070;
  padding: 0.6rem 0;
  border-bottom: 1px solid #707070;
`;
const StyledQuestionChoiceOrText = styled.div`
  padding-top: 3.2rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #f4f4f4;
`;

export default function QuestionCard({
  title,
  questionIndex,
  questionType,
  handleChange,
  warning,
}: QuestionCardType): JSX.Element {
  const isValidated = useRecoilValue(questionValidationAtom);
  return (
    <>
      {questionIndex !== 0 && <Divider />}
      <StyledQuestionCard>
        <QuestionDetailHeader {...{ questionIndex, questionType }} />
        <QuestionTitleInput
          questionIndex={questionIndex}
          onChange={handleChange}
          placeholder={contents.placeholder.TEXT}
          value={title}
          row={2}
          backgroundColor={'#F4F5F6'}
          warning={warning && isValidated}
        />

        <StyledQuestionChoiceOrText>
          {questionType === 2 ? (
            <StyledQuestionInput>주관식 답변...</StyledQuestionInput>
          ) : (
            <QuestionChoiceList questionIndex={questionIndex} />
          )}
        </StyledQuestionChoiceOrText>
      </StyledQuestionCard>
    </>
  );
}
