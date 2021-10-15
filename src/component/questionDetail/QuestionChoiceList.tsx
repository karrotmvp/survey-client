import { ChangeEvent, MouseEvent } from 'react';

import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import { questionAtom } from '@atom/questionAtom';
import IconButton from '@component/common/button/IconButton';
import { ReactComponent as PluseIcon } from '@config/icon/plus_gray.svg';

import QuestionChoice from './QuestionChoice';

const StyledQuestionChoiceList = styled.ul`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: auto;
`;
export default function QuestionChoiceList(): JSX.Element {
  const [questionState, setQuestionState] = useRecoilState(questionAtom);
  const { choices } = questionState;

  const onChange = (e: ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const index = target.dataset.list;

    if (choices && index !== undefined) {
      setQuestionState({
        ...questionState,
        choices: [
          ...choices.slice(0, +index),
          { value: target.value },
          ...choices.slice(+index + 1),
        ],
      });
    }
  };

  const handleClick = () => {
    setQuestionState({
      ...questionState,
      choices: [...choices, { value: '' }],
    });
  };

  const onDelete = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLButtonElement;
    const index = target.dataset.list;

    console.log(target);
    if (index !== undefined) {
      console.log(index);
      setQuestionState({
        ...questionState,
        choices: [...choices.filter((v, idx) => idx !== +index)],
      });
    }
  };

  return (
    <StyledQuestionChoiceList>
      {choices &&
        choices.map(({ value }, index) => (
          <QuestionChoice
            key={index}
            {...{ value, onDelete, onChange, index }}
          />
        ))}
      <IconButton
        onClick={handleClick}
        text="선택지 추가"
        icon={<PluseIcon />}
        buttonColor="WHITE"
        buttonSize="SMALL"
      />
    </StyledQuestionChoiceList>
  );
}
