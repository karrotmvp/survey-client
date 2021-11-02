import { useState } from 'react';

import styled from '@emotion/styled';
import { useParams } from '@karrotframe/navigator';
import { useRecoilValue } from 'recoil';

import { choiceType } from '@src/atom/questionAtom';
import responseListAtom from '@src/atom/responseAtom';
import { InputType } from '@src/page/AnswerDetailPage';

import ResponseNextButton from '../common/button/ResponseNextButton';
import ResponseChoiceList from './ResponseChoiceList';

const StyledTextInput = styled.section`
  display: flex;
  height: calc(100vh - 16rem);
  flex-direction: column;
  justify-content: space-between;
  .button_wrapper {
    background-color: #fff;
    padding-top: 1rem;
  }
`;

export default function ResponseChoiceInput({
  isLast,
  questionChoice,
  setResponse,
}: InputType & { questionChoice: choiceType[] }): JSX.Element {
  const { questionNumber, responsesId } =
    useParams<{ responsesId?: string; questionNumber?: string }>();
  if (!questionNumber || !responsesId)
    throw new Error('questionNumber or responsesId none');

  const response = useRecoilValue(responseListAtom);
  const initialId = response[+questionNumber - 1]
    ? response[+questionNumber - 1].choiceId || -1
    : -1;

  const [selectedChoiceId, setChoiceId] = useState(initialId);

  const handleNextClick = () => {
    setResponse({ choiceId: selectedChoiceId });
  };

  return (
    <StyledTextInput>
      <ResponseChoiceList
        {...{ questionChoice, setChoiceId, selectedChoiceId }}
      />
      <div className="button_wrapper">
        <ResponseNextButton {...{ handleNextClick, isLast }} />
      </div>
    </StyledTextInput>
  );
}
