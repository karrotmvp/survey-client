import { ChangeEvent, useState } from 'react';

import { useParams } from '@karrotframe/navigator';
import { useRecoilValue } from 'recoil';

import responseListAtom from '@src/atom/responseAtom';
import { InputType } from '@src/page/AnswerDetailPage';

import ResponseNextButton from '../common/button/ResponseNextButton';
import QuestionTitleInput from '../common/input/QuestionTitleInput';

export default function ResponseTextInput({
  isLast,
  setResponse,
}: InputType): JSX.Element {
  const { questionNumber, responsesId } =
    useParams<{ responsesId?: string; questionNumber?: string }>();
  if (!questionNumber || !responsesId)
    throw new Error('questionNumber or responsesId none');

  const response = useRecoilValue(responseListAtom);
  const initialText = response[+questionNumber - 1]
    ? response[+questionNumber - 1].answer || ''
    : '';

  const [text, setText] = useState(initialText);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleNextClick = () => {
    setResponse({ answer: text });
  };

  return (
    <>
      <QuestionTitleInput
        value={text}
        onChange={handleChange}
        placeholder={'답변을 입력해주세요'}
        questionIndex={+questionNumber}
      />

      <ResponseNextButton {...{ handleNextClick, isLast }} />
    </>
  );
}
