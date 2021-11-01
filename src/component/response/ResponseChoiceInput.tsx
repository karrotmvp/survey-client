import { useState } from 'react';

import { useParams } from '@karrotframe/navigator';
import { useRecoilValue } from 'recoil';

import { choiceType } from '@src/atom/questionAtom';
import responseListAtom from '@src/atom/responseAtom';
import { InputType } from '@src/page/AnswerDetailPage';

import ResponseNextButton from '../common/button/ResponseNextButton';
import ResponseChoiceList from './ResponseChoiceList';

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
    <>
      <ResponseChoiceList
        {...{ questionChoice, setChoiceId, selectedChoiceId }}
      />
      <ResponseNextButton {...{ handleNextClick, isLast }} />
    </>
  );
}
