import styled from '@emotion/styled';

import ToggleButton from '@component/common/button/ToggleButton';

import QuestionDot from './QuestionDot';

const StyledQuestionDetailHeader = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledQuestionDetailTitle = styled.h3`
  color: ${({ theme }) => theme.color.secondaryGreen};
  font-weight: 700;
  font-size: 24px;
  margin-left: 8px;
  margin-right: 5px;
`;

const QuestionDetailLeft = styled.div`
  display: flex;
`;

export type QuestionType = {
  title: string;
};

export default function QuestionDetailHeader({
  title,
}: QuestionType): JSX.Element {
  return (
    <StyledQuestionDetailHeader>
      <QuestionDetailLeft>
        <StyledQuestionDetailTitle>{title}</StyledQuestionDetailTitle>
        <QuestionDot title={title} />
      </QuestionDetailLeft>
      <ToggleButton
        onClick={() => {
          console.log('ha');
        }}
        text="주관식"
      />
    </StyledQuestionDetailHeader>
  );
}
