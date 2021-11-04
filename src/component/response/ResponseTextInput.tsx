import { ChangeEvent, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useParams } from '@karrotframe/navigator';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { responseListAtom } from '@src/atom/responseAtom';
import { InputType } from '@src/page/AnswerDetailPage';

import ResponseNextButton from '../common/button/ResponseNextButton';
import QuestionTitleInput from '../common/input/QuestionTitleInput';

const StyledTextInput = styled.section`
  display: flex;
  height: calc(100vh - 25.6rem);
  flex-direction: column;
  justify-content: space-between;
`;
export default function ResponseTextInput({
  isLast,
  setResponse,
}: InputType): JSX.Element {
  const { questionTypes, responsesId } =
    useParams<{ responsesId?: string; questionTypes?: string }>();
  if (!questionTypes || !responsesId)
    throw new Error('questionNumber or responsesId none');

  const questionNumber = Number.isNaN(+questionTypes) ? 1 : +questionTypes;
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
  const history = useHistory();

  useEffect(() => {
    const unblock = history.block((location, action) => {
      if (action === 'POP' && isLast) {
        setResponse({ answer: text });
      }
      return undefined;
    });

    return () => {
      unblock();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);
  return (
    <StyledTextInput>
      <QuestionTitleInput
        value={text}
        onChange={handleChange}
        placeholder={'답변을 입력해주세요'}
        questionIndex={+questionNumber}
        row={1}
      />

      <ResponseNextButton
        disable={text === ''}
        {...{ handleNextClick, isLast }}
      />
    </StyledTextInput>
  );
}
