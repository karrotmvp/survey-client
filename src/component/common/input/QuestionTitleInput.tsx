import { ChangeEvent, useCallback, useEffect, useRef } from 'react';

import styled from '@emotion/styled';
import { useSetRecoilState } from 'recoil';

import { questionValidationAtom } from '@src/atom/questionAtom';

const StyledTitleInput = styled.textarea<{
  inputBackground: string | undefined;
  warning: boolean | undefined;
}>`
  width: 100%;
  overflow: hidden;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-radius: 4px 4px 0px 0px;
  color: #111111;
  caret-color: ${({ theme }) => theme.color.primaryOrange};
  font-size: 1.6rem;
  line-height: 140%;
  letter-spacing: -2%;
  padding: 0.8rem 0.6rem;
  transition: 0.3s ease-in-out;
  margin-top: 0.8rem;
  resize: none;
  font-weight: 400;
  border-color: ${({ warning }) => (warning ? '#FF0000' : '#c9c9c9')};
  background-color: ${({ inputBackground, warning }) =>
    warning ? '#FFF6F6' : inputBackground || 'transparent'};
  &::placeholder {
    color: #8b8b8b;
  }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.primaryOrange};
    background-color: ${({ inputBackground }) =>
      inputBackground ? '#FFF2EB' : 'transparent'};
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
  row,
  backgroundColor,
  warning,
}: InputType & {
  questionIndex: number;
  row: number;
  backgroundColor?: string;
  warning?: boolean;
}): JSX.Element {
  const ref = useRef<HTMLTextAreaElement>(null);
  const setQuestionValidation = useSetRecoilState(questionValidationAtom);
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
  }, [row, value]);

  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = 'auto';
    ref.current.style.height = `${ref.current.scrollHeight + 1}px`;
  }, [ref]);

  return (
    <StyledTitleInput
      ref={ref}
      rows={row}
      value={value}
      inputBackground={backgroundColor}
      onInput={handleResizeHeight}
      onChange={onChange}
      onFocus={() => setQuestionValidation(false)}
      placeholder={placeholder}
      warning={warning}
      data-list={questionIndex}
    ></StyledTitleInput>
  );
}
