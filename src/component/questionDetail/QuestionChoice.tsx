import { forwardRef, MouseEvent } from 'react';

import styled from '@emotion/styled';

import { InputType } from '@component/common/input/QuestionTitleInput';
import { ReactComponent as DeleteIcon } from '@config/icon/delete.svg';

const StyledQuestionChoice = styled.li`
  padding: 0.5rem 1.6rem;
  width: 100%;
  background: #f4f5f6;
  border-radius: 25.5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledChoiceInput = styled.textarea`
  resize: none;
  outline: none;
  width: 100%;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 120%;
  border: 1px dashed #b1b2b2;
  color: #141414;
  background-color: transparent;
  padding: 4px;
  margin-right: 12px;
  overflow-y: hidden;
  :focus {
    background-color: transparent;
    border: 1px dashed #141414;
  }
  ::placeholder {
    color: #c9c9c9;
  }
`;
type questionChoicetype = InputType & {
  index: number;
  onDelete: (e: MouseEvent) => void;
};

// eslint-disable-next-line arrow-body-style
const QuestionChoice = forwardRef<HTMLTextAreaElement, questionChoicetype>(
  ({ index, onDelete, onChange, value }, ref) => (
    <StyledQuestionChoice data-list={index}>
      <StyledChoiceInput
        rows={1}
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={`객관식 답변 ${index + 1}`}
        data-list={index}
      />
      {index !== 0 && <DeleteIcon onClick={onDelete} data-list={index} />}
    </StyledQuestionChoice>
  ),
);

export default QuestionChoice;
