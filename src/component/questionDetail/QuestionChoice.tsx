import { forwardRef, MouseEvent, useState } from 'react';

import styled from '@emotion/styled';
import { useSetRecoilState } from 'recoil';

import { InputType } from '@component/common/input/QuestionTitleInput';
import { ReactComponent as DeleteIcon } from '@config/icon/delete.svg';
import { questionValidationAtom } from '@src/atom/questionAtom';

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
    color: #c9c9c9;
  }
`;
type questionChoicetype = InputType & {
  index: number;
  warning?: boolean;
  onDelete: (e: MouseEvent) => void;
};

// eslint-disable-next-line arrow-body-style
const QuestionChoice = forwardRef<HTMLTextAreaElement, questionChoicetype>(
  ({ index, onDelete, onChange, value, warning }, ref) => {
    const [isFocus, setFocus] = useState(false);
    const setQuestionValidation = useSetRecoilState(questionValidationAtom);
    return (
      <StyledQuestionChoice
        data-list={index}
        warning={warning}
        isFocus={isFocus}
      >
        <StyledChoiceInput
          rows={1}
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={`객관식 답변 ${index + 1}`}
          data-list={index}
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

export default QuestionChoice;
