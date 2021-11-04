import styled from '@emotion/styled';

import { ReactComponent as CheckIcon } from '@config/icon/check.svg';
import { choiceType } from '@src/atom/questionAtom';

const StyledResponseChoice = styled.li`
  padding: 0.8rem 1.6rem;
  width: 100%;
  background: #f4f5f6;
  border-radius: 25.5px;
  color: #141414;
  border: 1px solid #f4f5f6;
  transition: 0.2s;
  font-size: 1.6rem;
  svg {
    opacity: 0.3;
    margin-left: 1.4rem;
  }
  &[aria-checked='true'] {
    border: 1px solid #fe7e35;
    background: #fff2eb;
    font-weight: 700;
    color: ${({ theme }) => theme.color.primaryOrange};
    svg {
      opacity: 1;
    }
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
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
      <span>{value}</span>
      <div>
        <CheckIcon className="checkIcon" />
      </div>
    </StyledResponseChoice>
  );
}
