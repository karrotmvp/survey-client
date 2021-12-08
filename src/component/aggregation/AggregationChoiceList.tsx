import styled from '@emotion/styled';

import { ReactComponent as ChoiceCircleIcon } from '@config/icon/choiceCircle.svg';
import { ReactComponent as CheckedChoiceCircleIcon } from '@config/icon/radio_checked.svg';
import { choiceType } from '@src/atom/questionAtom';

const StyledChoiceInput = styled.span`
  outline: none;
  border: none;
  width: 100%;
  margin-left: 0.8rem;
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  line-height: 120%;
  border-bottom: 1px solid #c9c9c9;
  color: #707070;
  background-color: transparent;
  padding: 5.5px 0;
`;

const StyledQuestionChoice = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .choice_circle_Icon {
    align-items: center;
    display: flex;
    width: 1.6rem;
  }
`;
const StyledAggregationChoiceList = styled.ul`
  display: grid;
  grid-gap: 1.6rem;
  grid-template-columns: auto;
`;

export default function AggregationChoiceList({
  choices,
  answer,
}: {
  choices: choiceType[] | undefined;
  answer?: { choice: string }[];
}): JSX.Element {
  return (
    <StyledAggregationChoiceList>
      {choices &&
        choices.map(({ value }, idx) => (
          <StyledQuestionChoice key={idx}>
            <div
              className="choice_circle_Icon"
              aria-checked={
                answer !== undefined &&
                answer.some(({ choice }) => choice === value)
              }
            >
              {answer !== undefined &&
              answer.some(({ choice }) => choice === value) ? (
                <CheckedChoiceCircleIcon />
              ) : (
                <ChoiceCircleIcon />
              )}
            </div>
            <StyledChoiceInput>{value}</StyledChoiceInput>
          </StyledQuestionChoice>
        ))}
    </StyledAggregationChoiceList>
  );
}
