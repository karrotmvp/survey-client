import styled from '@emotion/styled';

import { ReactComponent as CheckIcon } from '@config/icon/check.svg';

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

// post 보내는 것과 get 받는 것의 type 이 다르다.
type choiceType = {
  value: string;
};

export default function ResponseChoiceItem({
  value,
  handleClick,
  selectedChoice,
}: choiceType & {
  handleClick: (e: React.MouseEvent<HTMLLIElement>) => void;
  selectedChoice: string;
}): JSX.Element {
  return (
    <StyledResponseChoice
      aria-checked={selectedChoice === value}
      data-list={value}
      onClick={handleClick}
    >
      <span>{value}</span>
      <div>
        <CheckIcon className="checkIcon" />
      </div>
    </StyledResponseChoice>
  );
}
