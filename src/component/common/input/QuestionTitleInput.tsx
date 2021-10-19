import { ChangeEvent } from 'react';

import styled from '@emotion/styled';

const StyledTitleInput = styled.textarea`
  margin-top: 1rem;
  border: none;
  resize: none;
  outline: none;
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 140%;
  background-color: #f4f5f6;
  border-radius: 4px 4px 0px 0px;
  border-bottom: 1px solid #c9c9c9;
  color: #141414;
  padding: 8px 6px;
  ::placeholder {
    opacity: 0.5;
  }
  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.color.secondaryGreen};
  }
`;

export type InputType = {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
};

export default function QuestionTitleInput({
  value,
  onChange,
  questionIndex,
  placeholder,
}: InputType & { questionIndex: number }): JSX.Element {
  const inputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = '1rem';
    e.target.style.height = `${e.target.scrollHeight + 6}px`;
  };

  return (
    <StyledTitleInput
      value={value}
      onInput={inputChange}
      onChange={onChange}
      placeholder={placeholder}
      data-list={questionIndex}
    ></StyledTitleInput>
  );
}
