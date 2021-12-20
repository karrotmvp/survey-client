import styled from '@emotion/styled';

import { choiceType } from '@src/atom/questionAtom';

import ResponseChoiceItem from './ResponseChoiceItem';

const StyledResponseChoiceList = styled.ul`
  display: grid;
  grid-gap: 1.2rem;
  grid-template-columns: auto;
`;

type ResponseChoiceListType = {
  questionChoice: choiceType[];
  setChoice: React.Dispatch<React.SetStateAction<string>>;
  selectedChoice: string;
};

export default function ResponseChoiceList({
  questionChoice,
  setChoice,
  selectedChoice,
}: ResponseChoiceListType): JSX.Element {
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const selectId = e.currentTarget.dataset.list || '';
    if (selectId === selectedChoice) setChoice('');
    else setChoice(selectId);
  };

  return (
    <StyledResponseChoiceList>
      {questionChoice &&
        questionChoice.map(({ value }, idx) => (
          <ResponseChoiceItem
            key={idx}
            {...{ selectedChoice, value, handleClick }}
          />
        ))}
    </StyledResponseChoiceList>
  );
}
