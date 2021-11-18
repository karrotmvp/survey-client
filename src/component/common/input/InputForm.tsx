import { useCallback, useEffect, useRef } from 'react';

import styled from '@emotion/styled';
import { FieldPath, UseFormRegister } from 'react-hook-form';

import { submitType } from '@src/page/QuestionPage';

const StyledTitleInput = styled.textarea<{
  inputBackground: string | undefined;
  warning: boolean | undefined;
}>`
  width: 100%;
  overflow: hidden;
  border-style: solid;
  color: #111111;
  caret-color: ${({ theme }) => theme.color.primaryOrange};
  font-size: 1.5rem;
  line-height: 140%;
  letter-spacing: -2%;
  padding: 1.6rem;
  transition: 0.3s ease-in-out;
  margin-top: 0.8rem;
  resize: none;
  font-weight: 400;
  border: 1px solid #c9c9c9;
  box-sizing: border-box;
  border-radius: 8px;
  border-color: ${({ warning }) => (warning ? '#FF0000' : '#c9c9c9')};
  background-color: ${({ inputBackground }) =>
    inputBackground || 'transparent'};
  &::placeholder {
    color: #8b8b8b;
  }
  &:focus {
    outline: none;
    border-color: ${({ theme, warning }) =>
      warning ? '#FF0000' : theme.color.primaryOrange};
  }
`;

export type InputType = {
  placeholder?: string;
};

export default function InputForm({
  path,
  placeholder,
  row,
  backgroundColor,
  register,
  warning,
  handleFocus,
}: InputType & {
  path: FieldPath<submitType>;
  row: number;
  backgroundColor?: string;
  warning?: boolean;
  handleFocus?: () => void;
  register: UseFormRegister<submitType>;
}): JSX.Element {
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const { ref, ...rest } = register(path, {
    required: true,
  });
  useEffect(() => {
    if (textRef === null || textRef.current === null) {
      return;
    }
    textRef.current.style.height = 'auto';
    textRef.current.style.height = `${textRef.current.scrollHeight}px`;
  }, []);

  useEffect(() => {
    if (textRef === null || textRef.current === null) {
      return;
    }

    textRef.current.style.height = `${textRef.current.scrollHeight} px`;
  }, [row]);

  const handleResizeHeight = useCallback(() => {
    if (textRef === null || textRef.current === null) {
      return;
    }
    textRef.current.style.height = 'auto';
    textRef.current.style.height = `${textRef.current.scrollHeight + 1}px`;
  }, [textRef]);

  return (
    <StyledTitleInput
      rows={row}
      inputBackground={backgroundColor}
      onInput={handleResizeHeight}
      onFocus={handleFocus}
      placeholder={placeholder}
      warning={warning}
      {...rest}
      ref={e => {
        ref(e);
        textRef.current = e;
      }}
    ></StyledTitleInput>
  );
}
