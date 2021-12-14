import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useParams } from '@karrotframe/navigator';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { choiceType } from '@src/atom/questionAtom';
import { responseListAtom } from '@src/atom/responseAtom';
import { InputType } from '@src/page/AnswerDetailPage';

import ResponseNextButton from '../common/button/ResponseNextButton';
import ResponseChoiceList from './ResponseChoiceList';

const StyledTextInput = styled.section`
  display: flex;
  height: calc(100vh - 25.6rem);
  flex-direction: column;
  justify-content: space-between;
  .button_wrapper {
    background-color: #fff;
    padding-top: 1.6rem;
  }
`;

export default function ResponseChoiceInput({
  isLast,
  questionChoice,
  setResponse,
}: InputType & { questionChoice: choiceType[] }): JSX.Element {
  const { questionTypes, surveyId } =
    useParams<{ surveyId?: string; questionTypes?: string }>();
  if (!questionTypes || !surveyId)
    throw new Error('questionNumber or surveyId none');

  const questionNumber = Number.isNaN(+questionTypes) ? 1 : +questionTypes;
  const response = useRecoilValue(responseListAtom);

  const initialChoice = response[questionNumber - 1]
    ? response[questionNumber - 1].value || ''
    : '';

  const [selectedChoice, setChoice] = useState(initialChoice);

  const handleNextClick = () => {
    setResponse({ value: selectedChoice });
  };
  const history = useHistory();

  useEffect(() => {
    const unblock = history.block((location, action) => {
      if (action === 'POP' && isLast) {
        setResponse({ value: selectedChoice });
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
      <ResponseChoiceList {...{ questionChoice, setChoice, selectedChoice }} />
      <div className="button_wrapper">
        <ResponseNextButton {...{ handleNextClick, isLast }} />
      </div>
    </StyledTextInput>
  );
}
