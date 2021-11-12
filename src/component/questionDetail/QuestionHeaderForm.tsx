import { MouseEvent, useRef, useState } from 'react';

import styled from '@emotion/styled';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import ToggleButton from '@component/common/button/ToggleButton';
import NavToggle from '@component/common/navbar/NavToggle';
import { useAnalytics } from '@src/analytics/faContext';
import useOutsideClick from '@src/hook/useOutSideClick';

import { submitType } from '../question/QuestionCardList';

const StyledQuestionDetailHeader = styled.section`
  display: flex;
  width: 100%;
  align-items: center;
`;

const StyledQuestionDetailTitle = styled.h3`
  color: #141414;
  font-weight: 700;
  font-size: 1.6rem;
  margin-right: 5px;
`;

const QuestionDetailLeft = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
`;

export type QuestionType = {
  questionIndex: number;
  watch: UseFormWatch<submitType>;
  setValue: UseFormSetValue<submitType>;
  remove: (index?: number | number[] | undefined) => void;
};

export default function QuestionHeaderForm({
  questionIndex,
  watch,
  setValue,
  remove,
}: QuestionType): JSX.Element {
  const [isOpen, setToggle] = useState(false);
  const ref = useRef<HTMLUListElement>(null);
  const fa = useAnalytics();

  const questionType = watch(`questions.${questionIndex}.questionType`);
  const handleClick = useOutsideClick(ref, () => {
    if (isOpen) {
      setToggle(false);
    }
  });
  const toggleHandler = (e: MouseEvent) => {
    fa.logEvent('question_type_button_click');
    setToggle(!isOpen);
  };

  let text: string;
  switch (questionType) {
    case 2:
      text = '주관식';
      break;
    case 3:
      text = '객관식';
      break;
    default:
      throw new Error();
  }
  // 단방향이다

  const handleToggleList = (e: MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    const checkTargetNum = (targetNum: number): 2 | 3 => {
      if (targetNum === 2 || targetNum === 3) {
        return targetNum;
      }
      return 3;
    };

    if (target.dataset.list) {
      if (checkTargetNum(+target.dataset.list + 2) === 2) {
        setValue(`questions.${questionIndex}.questionType`, 2);

        fa.logEvent('question_type_text_button_click');
      } else {
        setValue(`questions.${questionIndex}.questionType`, 3);

        fa.logEvent('question_type_choice_button_click');
      }
    }
    setToggle(false);
  };

  const OutSide = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: transparent;
    z-index: 9999999;
  `;

  const DeleteButton = styled.button`
    border-radius: 20px;
    margin-left: auto;
    display: flex;
    color: #707070;
    background-color: #f4f3f8;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
  `;
  const handleDeleteButton = () => {
    remove(questionIndex);
  };
  return (
    <StyledQuestionDetailHeader>
      <QuestionDetailLeft>
        <StyledQuestionDetailTitle>
          질문 {questionIndex + 1}
        </StyledQuestionDetailTitle>
      </QuestionDetailLeft>
      <ToggleButton toggle={isOpen} onClick={toggleHandler} text={text} />
      {isOpen && (
        <>
          <OutSide onTouchStart={handleClick} />
          <NavToggle
            toggleRef={ref}
            navList={['주관식', '객관식']}
            position={{ top: '5.5rem', left: '0' }}
            onClick={handleToggleList}
          />
        </>
      )}
      {questionIndex !== 0 && (
        <DeleteButton onClick={handleDeleteButton}>삭제</DeleteButton>
      )}
    </StyledQuestionDetailHeader>
  );
}
