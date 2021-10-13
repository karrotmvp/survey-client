import styled from '@emotion/styled';

import { QuestionType } from './QuestionDetailHeader';

const StyledQuestionDot = styled.div`
  height: 100%;
  align-items: flex-end;
  display: flex;
  padding-bottom: 8px;
`;

const Dot = styled.div<{ active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.secondaryGreen};
  margin: 0 3px;
  opacity: ${({ active }) => (active ? '1' : '0.4')};
`;

export default function QuestionDot({ title }: QuestionType): JSX.Element {
  switch (title) {
    case 'Q1':
      return (
        <StyledQuestionDot>
          <Dot active />
          <Dot />
          <Dot />
        </StyledQuestionDot>
      );
    case 'Q2':
      return (
        <StyledQuestionDot>
          <Dot active />
          <Dot active />
          <Dot />
        </StyledQuestionDot>
      );
    case 'Q3':
      return (
        <StyledQuestionDot>
          <Dot active />
          <Dot active />
          <Dot active />
        </StyledQuestionDot>
      );
    default:
      return <></>;
  }
}
