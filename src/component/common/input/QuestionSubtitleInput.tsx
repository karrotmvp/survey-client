import { ChangeEvent, useCallback, useEffect, useRef } from 'react';

import styled from '@emotion/styled';

const StyledSubtitleInput = styled.textarea`
  margin-top: 8px;
  resize: none;
  outline: none;
  height: 41px;
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 120%;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px dashed #9f9f9f;
  color: #707070;
  padding: 0.5rem 1rem;
  :focus {
    border-color: #141414;
  }
`;

export type InputType = {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
};

export default function QuestionSubtitleInput({
  value,
  onChange,
}: InputType): JSX.Element {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, []);

  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }

    ref.current.style.height = `${ref.current.scrollHeight + 1}px`;
  }, [ref]);

  return (
    <StyledSubtitleInput
      ref={ref}
      value={value}
      onInput={handleResizeHeight}
      onChange={onChange}
    ></StyledSubtitleInput>
  );
}
