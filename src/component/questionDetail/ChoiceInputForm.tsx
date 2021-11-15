import { FormEvent, forwardRef, useState } from 'react';

import styled from '@emotion/styled';
import { UseFormRegister } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import { ReactComponent as ChoiceCircleIcon } from '@config/icon/choiceCircle.svg';
import { ReactComponent as DeleteIcon } from '@config/icon/delete.svg';
import { questionValidationAtom } from '@src/atom/questionAtom';
import { submitType } from '@src/page/QuestionPage';

type questionChoiceType = {
  index: number;
  warning?: boolean;
  register: UseFormRegister<submitType>;
  onInput: (e: FormEvent) => void;
  choiceRef: (el: HTMLTextAreaElement | null) => void;
  remove: (index?: number | number[] | undefined) => void;
  questionIndex: number;
};

const ChoiceInputForm = forwardRef<HTMLTextAreaElement, questionChoiceType>(
  ({ index, onInput, remove, register, warning, choiceRef, questionIndex }) => {
    const [isFocus, setFocus] = useState(false);
    const { ref, ...rest } = register(
      `questions.${questionIndex}.choices.${index}.value`,
      { required: true },
    );
    const setQuestionValidation = useSetRecoilState(questionValidationAtom);

    const onDelete = () => {
      remove(index);
    };
    return (
      <StyledQuestionChoice
        data-list={index}
        warning={warning}
        isFocus={isFocus}
      >
        <div className="choice_circle_Icon">
          <ChoiceCircleIcon />
        </div>
        <StyledChoiceInput
          rows={1}
          ref={e => {
            ref(e);
            choiceRef(e);
          }}
          {...rest}
          placeholder={`객관식 선택지 ${index + 1}`}
          data-list={index}
          onInput={onInput}
          onFocus={() => {
            setFocus(true);
            setQuestionValidation(false);
          }}
          onBlur={() => setFocus(false)}
        />
        {index !== 0 && <DeleteIcon onClick={onDelete} data-list={index} />}
      </StyledQuestionChoice>
    );
  },
);

export default ChoiceInputForm;

const StyledChoiceInput = styled.textarea`
  resize: none;
  outline: none;
  border: none;
  width: 100%;
  margin-left: 0.8rem;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 120%;
  border-bottom: 1px solid;
  color: #141414;
  background-color: transparent;
  padding: 5.5px 0;
  overflow-y: hidden;
  :focus {
    border-color: #fe7e35;
  }
  ::placeholder {
    color: ${({ theme }) => theme.color.neutralBlack.placeholder};
  }
`;

const StyledQuestionChoice = styled.li<{
  warning: boolean | undefined;
  isFocus: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  .choice_circle_Icon {
    align-items: center;
    display: flex;
  }
  textarea {
    border-color: ${({ warning }) => (warning ? '#FF0000' : '#b1b2b2')};
  }
`;
