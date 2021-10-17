import { ChangeEvent } from 'react';

import styled from '@emotion/styled';

import { InputType } from './QuestionTitleInput';

const StyledSubtitleInput = styled.textarea`
  margin-top: 8px;
  resize: none;
  outline: none;
  height: 41px;
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px dashed #9f9f9f;
  color: #707070;
  padding: 0.5rem 1rem;
`;

export default function QuestionSubtitleInput({
  value,
  onChange,
}: InputType): JSX.Element {
  const inputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = '1rem';
    e.target.style.height = `${e.target.scrollHeight + 6}px`;
  };

  return (
    <StyledSubtitleInput
      value={value}
      onInput={inputChange}
      onChange={onChange}
    ></StyledSubtitleInput>
  );
}
