import styled from '@emotion/styled';
import { useParams } from '@karrotframe/navigator';

import { choiceType } from '@src/atom/questionAtom';
import { InputType } from '@src/page/AnswerDetailPage';

import ResponseChoiceList from './ResponseChoiceList';

const StyledTextInput = styled.section`
  display: flex;
  height: max-content;
  overflow: scroll;
  flex-direction: column;
  justify-content: space-between;
  .button_wrapper {
    background-color: #fff;
    padding-top: 1.6rem;
  }
  ::-webkit-scrollbar {
    position: absolute;
    left: 0;
    width: 6px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    height: 5%;
    background-color: #c9c9c9;
    border-radius: 13px;
  }
`;

export default function ResponseChoiceInput({
  questionChoice,
  setValue,
  currentValue,
}: InputType & { questionChoice: choiceType[] }): JSX.Element {
  const { questionTypes, surveyId } =
    useParams<{ surveyId?: string; questionTypes?: string }>();
  if (!questionTypes || !surveyId)
    throw new Error('questionNumber or surveyId none');

  return (
    <StyledTextInput>
      <ResponseChoiceList
        {...{ questionChoice }}
        setChoice={setValue}
        selectedChoice={currentValue}
      />
    </StyledTextInput>
  );
}
