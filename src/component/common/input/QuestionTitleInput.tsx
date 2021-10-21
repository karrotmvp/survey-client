import { ChangeEvent, useCallback, useEffect, useRef } from 'react';

import styled from '@emotion/styled';

const StyledTitleInput = styled.textarea`
  width: 100%;
  overflow: hidden;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: #c9c9c9;
  background-color: #f4f5f6;
  border-radius: 4px 4px 0px 0px;
  color: #111111;
  caret-color: ${({ theme }) => theme.color.secondaryGreen};
  font-size: 16px;
  line-height: 140%;
  letter-spacing: -2%;
  padding: 10px 0.5rem;
  margin-top: 0.5rem;
  resize: none;
  &::placeholder {
    color: #c6c9cc;
  }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.secondaryGreen};
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
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = 'auto';
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, []);

  useEffect(() => {
    if (ref === null || ref.current === null) {
      return;
    }

    ref.current.style.height = `${ref.current.scrollHeight} px`;
    if (value === '') ref.current.style.height = '64px';
  }, [value]);

  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
<<<<<<< HEAD

=======
    ref.current.style.height = 'auto';
>>>>>>> 737c1477dd62e01db2aded6967e9e80f1bb8f5f3
    ref.current.style.height = `${ref.current.scrollHeight + 1}px`;
  }, [ref]);

  return (
    <StyledTitleInput
      ref={ref}
      value={value}
      onInput={handleResizeHeight}
      onChange={onChange}
      placeholder={placeholder}
      data-list={questionIndex}
    ></StyledTitleInput>
  );
}
