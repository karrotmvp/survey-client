import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';

import { questionListAtom, questionListSelector } from '@atom/questionAtom';
import { ReactComponent as PluseIcon } from '@config/icon/plus.svg';

import QuestionChoice from './QuestionChoice';

const StyledQuestionChoiceList = styled.ul`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: auto;
`;
export default function QuestionChoiceList({
  questionIndex,
}: {
  questionIndex: number;
}): JSX.Element {
  const [questionList, setQuestionlist] = useRecoilState(questionListAtom);
  const { choices } = questionList[questionIndex];
  const elRefs = useRef<HTMLTextAreaElement[]>([]);

  const [focus, setFocus] = useState(false);
  // since it is an array we need to method to add the refs
  const addToRefs = (el: HTMLTextAreaElement) => {
    if (el && !elRefs.current.includes(el)) {
      elRefs.current.push(el);
    }
  };

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
    const ref = elRefs.current[+index!];
    if (ref === null) {
      return;
    }
    ref.style.height = 'auto';
    ref.style.height = `${ref.scrollHeight}px`;
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

    setFocus(true);
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

  const StyledChoiceButton = styled.button`
    width: 100%;
    height: 55px;
    border-radius: 25.5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 1.2rem;
    background-color: #f4f5f6;
    font-size: 1rem;
    font-weight: 400;
    svg {
      margin-right: 8px;
    }
    :disabled {
      opacity: 0.5;
    }
  `;

  const { choicesCheck } = useRecoilValue(questionListSelector);

  const onInput = (e: FormEvent<HTMLTextAreaElement>) => {
    console.log(e);
  };

  useEffect(() => {
    if (elRefs && focus) {
      elRefs.current[choices.length - 1].focus();
    }
  }, [focus, choices.length]);

  return (
    <StyledQuestionChoiceList>
      {choices &&
        choices.map(({ value }, index) => (
          <QuestionChoice
            // eslint-disable-next-line no-return-assign
            ref={addToRefs}
            key={index}
            {...{ value, onDelete, onChange, index, onInput }}
          />
        ))}
      <StyledChoiceButton
        disabled={!choicesCheck[questionIndex]}
        onClick={handleClick}
      >
        <PluseIcon /> 항목 추가
      </StyledChoiceButton>
    </StyledQuestionChoiceList>
  );
}
