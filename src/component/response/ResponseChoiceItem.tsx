import styled from '@emotion/styled';

const RadioButton = styled.input`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: url('./../../img/radio_unchecked.png') center center / cover
    no-repeat;
  &:checked {
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    background: url('./../../img/radio_checked.png') center center / cover
      no-repeat;
  }
`;

const StyledResponseChoice = styled.li`
  padding: 1rem 1.4rem;
  width: 100%;
  background: #f4f5f6;
  border-radius: 25.5px;
  color: #141414;
  border: 1px solid #f4f5f6;
  transition: 0.2s;
  font-size: 1.5rem;
  span {
    margin-left: 0.8rem;
  }

  .choice_circle_Icon {
    align-items: center;
    display: flex;
    width: 2rem;
    height: 2rem;
    svg {
      width: 2rem;
    }
    margin-right: 0.8rem;
  }

  &[aria-checked='true'] {
    border: 1px solid #fe7e35;
    background: #fff2eb;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.color.primaryOrange};
  }

  display: flex;
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
      <RadioButton type="radio" checked={selectedChoice === value} />
      <span>{value}</span>
    </StyledResponseChoice>
  );
}
