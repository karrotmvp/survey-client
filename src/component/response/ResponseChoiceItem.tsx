import styled from '@emotion/styled';

import { choiceType } from '@src/atom/questionAtom';

const StyledResponseChoice = styled.li`
  padding: 12px 1rem;
  width: 100%;
  background: #f4f5f6;
  border-radius: 25.5px;
  &[aria-checked='true'] {
    opacity: 0.5;
  }
`;

export default function ResponseChoiceItem({
  choiceId,
  value,
  handleClick,
  selectedChoiceId,
}: choiceType & {
  handleClick: (e: React.MouseEvent<HTMLLIElement>) => void;
  selectedChoiceId: number;
}): JSX.Element {
  return (
    <StyledResponseChoice
      aria-checked={selectedChoiceId === choiceId}
      data-list={choiceId}
      onClick={handleClick}
    >
      {value}
    </StyledResponseChoice>
  );
}
