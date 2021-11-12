import { FormEvent, forwardRef, useState } from 'react';

import styled from '@emotion/styled';
import { UseFormRegister } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import { ReactComponent as DeleteIcon } from '@config/icon/delete.svg';
import { questionValidationAtom } from '@src/atom/questionAtom';

import { submitType } from '../question/QuestionCardList';

const StyledChoiceInput = styled.textarea`
  resize: none;
  outline: none;
  width: 100%;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 120%;
  border: 1px dashed;
  color: #141414;
  background-color: transparent;
  padding: 4px;
  margin-right: 12px;
  overflow-y: hidden;
  :focus {
    border: 1px dashed #fe7e35;
  }
  ::placeholder {
    color: ${({ theme }) => theme.color.neutralBlack.placeholder};
  }
`;

type questionChoicetype = {
  index: number;
  warning?: boolean;
  register: UseFormRegister<submitType>;
  onInput: (e: FormEvent) => void;
  choiceRef: (el: HTMLTextAreaElement | null) => void;
  remove: (index?: number | number[] | undefined) => void;
  questionIndex: number;
};

// eslint-disable-next-line arrow-body-style
const ChoiceInputForm = forwardRef<HTMLTextAreaElement, questionChoicetype>(
  ({ index, onInput, remove, register, warning, choiceRef, questionIndex }) => {
    const [isFocus, setFocus] = useState(false);

    const { ref, ...rest } = register(
      `questions.${questionIndex}.choices.${index}.value`,
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
        <StyledChoiceInput
          rows={1}
          ref={e => {
            ref(e);
            choiceRef(e);
          }}
          {...rest}
          placeholder={`객관식 답변 ${index + 1}`}
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

const StyledQuestionChoice = styled.li<{
  warning: boolean | undefined;
  isFocus: boolean;
}>`
  padding: 0.5rem 1.6rem;
  width: 100%;
  background: ${({ warning, isFocus }) => {
    if (warning) return '#FFE6E6';
    if (isFocus) return '#fff2eb';
    return '#f4f5f6';
  }};
  border-radius: 25.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;

  textarea {
    border-color: ${({ warning }) => (warning ? '#FF0000' : '#b1b2b2')};
  }
`;
