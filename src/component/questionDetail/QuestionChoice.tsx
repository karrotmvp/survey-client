import styled from '@emotion/styled';

import { InputType } from '@component/common/input/QuestionTitleInput';
import { ReactComponent as DeleteIcon } from '@config/icon/delete.svg';

const StyledQuestionChoice = styled.li`
  padding: 12px 16px;
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
  height: 30px;
  width: 100%;
  font-size: 18px;
  font-weight: 400;
  line-height: 20px;
  border: 1px dashed #141414;
  color: #141414;
  background-color: transparent;
  padding: 4px;
  margin-right: 12px;
`;

export default function QuestionChoice({
  value,
  onChange,
  index,
}: InputType & { index: number }): JSX.Element {
  return (
    <StyledQuestionChoice>
      <StyledChoiceInput
        value={value}
        onChange={onChange}
        placeholder={`객관식 답변 ${index + 1}`}
        data-list={index}
      />
      {index !== 0 && <DeleteIcon />}
    </StyledQuestionChoice>
  );
}
