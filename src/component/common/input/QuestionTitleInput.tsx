import { ChangeEvent } from 'react';

import styled from '@emotion/styled';

const StyledTitleInput = styled.textarea`
  margin-top: 24px;
  resize: none;
  outline: none;
  height: 63px;
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  line-height: 140%;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px dashed #9f9f9f;
  color: #141414;
  padding: 1rem;
`;

export type InputType = {
  value: string;
  onChange: (e: ChangeEvent) => void;
};

export default function QuestionTitleInput({
  value,
  onChange,
}: InputType): JSX.Element {
  const inputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = '16px';
    e.target.style.height = `${e.target.scrollHeight + 6}px`;
  };

  return (
    <StyledTitleInput
      value={value}
      onInput={inputChange}
      onChange={onChange}
    ></StyledTitleInput>
  );
}
