import { ChangeEvent, MouseEvent } from 'react';

import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import { questionListAtom } from '@atom/questionAtom';
import IconButton from '@component/common/button/IconButton';
import { ReactComponent as PluseIcon } from '@config/icon/plus_gray.svg';

import QuestionChoice from './QuestionChoice';

const StyledQuestionChoiceList = styled.ul`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: auto;
`;
export default function QuestionChoiceList({
  questionIndex,
}: {
  questionIndex: number;
}): JSX.Element {
  const [questionList, setQuestionlist] = useRecoilState(questionListAtom);
  const { choices } = questionList[questionIndex];

  const onChange = (e: ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const index = target.dataset.list;

    if (choices && index !== undefined) {
      setQuestionlist([
        ...questionList.slice(0, questionIndex),
        {
          ...questionList[questionIndex],
          choices: [
            ...choices.slice(0, +index),
            { value: target.value },
            ...choices.slice(+index + 1),
          ],
        },
        ...questionList.slice(questionIndex + 1),
      ]);
    }
  };

  const handleClick = () => {
    setQuestionlist([
      ...questionList.slice(0, questionIndex),
      {
        ...questionList[questionIndex],
        choices: [...choices, { value: '' }],
      },
      ...questionList.slice(questionIndex + 1),
    ]);
  };

  const onDelete = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLButtonElement;
    const index = target.dataset.list;

    if (index !== undefined) {
      setQuestionlist([
        ...questionList.slice(0, questionIndex),
        {
          ...questionList[questionIndex],
          choices: [...choices.filter((v, idx) => idx !== +index)],
        },
        ...questionList.slice(questionIndex + 1),
      ]);
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
