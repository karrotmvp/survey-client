import styled from '@emotion/styled';

import { choiceType } from '@src/atom/questionAtom';

import ResponseChoiceItem from './ResponseChoiceItem';

const StyledResponseChoiceList = styled.ul`
  display: grid;
  grid-gap: 1.2rem;
  grid-template-columns: auto;
  overflow: scroll;
`;

type ResponseChoiceListType = {
  questionChoice: choiceType[];
  setChoiceId: React.Dispatch<React.SetStateAction<number>>;
  selectedChoiceId: number;
};

export default function ResponseChoiceList({
  questionChoice,
  setChoiceId,
  selectedChoiceId,
}: ResponseChoiceListType): JSX.Element {
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const selectId = e.currentTarget.dataset.list || '-1';
    if (+selectId === selectedChoiceId) setChoiceId(-1);
    else setChoiceId(+selectId);
  };

  return (
    <StyledResponseChoiceList>
      {questionChoice &&
        questionChoice.map(({ value, choiceId }) => (
          <ResponseChoiceItem
            key={choiceId}
            {...{ selectedChoiceId, value, choiceId, handleClick }}
          />
        ))}
    </StyledResponseChoiceList>
  );
}
