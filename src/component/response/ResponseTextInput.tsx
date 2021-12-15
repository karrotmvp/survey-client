// import { ChangeEvent, useEffect, useState } from 'react';
import { ChangeEvent } from 'react';

import styled from '@emotion/styled';
import { useParams } from '@karrotframe/navigator';

import { InputType } from '@src/page/AnswerDetailPage';

import QuestionTitleInput from '../common/input/QuestionTitleInput';

const StyledTextInput = styled.section`
  display: flex;
  height: calc(100vh - 23rem);
  flex-direction: column;
  justify-content: space-between;
`;
export default function ResponseTextInput({
  currentValue,
  setValue,
}: InputType): JSX.Element {
  const { questionTypes, surveyId } =
    useParams<{ surveyId?: string; questionTypes?: string }>();
  if (!questionTypes || !surveyId)
    throw new Error('questionNumber or surveyId none');

  const questionNumber = Number.isNaN(+questionTypes) ? 1 : +questionTypes;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <StyledTextInput>
      <QuestionTitleInput
        value={currentValue}
        onChange={handleChange}
        placeholder={'답변을 입력해주세요'}
        questionIndex={+questionNumber}
        row={1}
      />
    </StyledTextInput>
  );
}
