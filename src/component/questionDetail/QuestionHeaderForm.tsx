import { MouseEvent, useRef, useState } from 'react';

import styled from '@emotion/styled';
import {
  UseFormSetValue,
  UseFormUnregister,
  UseFormWatch,
} from 'react-hook-form';

import ToggleButton from '@component/common/button/ToggleButton';
import NavToggle from '@component/common/navbar/NavToggle';
import { useAnalytics } from '@src/analytics/faContext';
import { questionTypes } from '@src/config/const/const';
import useOutsideClick from '@src/hook/useOutSideClick';
import { submitType } from '@src/page/QuestionPage';

const StyledQuestionDetailHeader = styled.section`
  display: flex;
  width: 100%;
  align-items: center;
`;

export type QuestionType = {
  questionIndex: number;
  watch: UseFormWatch<submitType>;
  setValue: UseFormSetValue<submitType>;
  remove: (index?: number | number[] | undefined) => void;
  unregister: UseFormUnregister<submitType>;
};

export default function QuestionHeaderForm({
  questionIndex,
  watch,
  setValue,
  remove,
  unregister,
}: QuestionType): JSX.Element {
  const [isOpen, setToggle] = useState(false);
  const ref = useRef<HTMLUListElement>(null);
  const fa = useAnalytics();

  const questionTypeString = ['주관식 질문', '객관식 질문'];
  const questionType = watch(`questions.${questionIndex}.questionType`);

  const text = `${questionIndex + 1}. ${questionTypeString[questionType - 2]}`;

  const handleClick = useOutsideClick(ref, () => {
    if (isOpen) {
      setToggle(false);
    }
  });

  const toggleHandler = (e: MouseEvent) => {
    fa.logEvent('question_type_button_click');
    setToggle(!isOpen);
  };

  const handleToggleList = (e: MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    const checkTargetNum = (targetNum: number): 2 | 3 => {
      if (targetNum === 2 || targetNum === 3) {
        return targetNum;
      }
      return 3;
    };

    if (target.dataset.list) {
      if (checkTargetNum(+target.dataset.list + 2) === questionTypes.TEXTTYPE) {
        unregister(`questions.${questionIndex}.choices`, {
          keepValue: true,
        });
        setValue(
          `questions.${questionIndex}.questionType`,
          questionTypes.TEXTTYPE,
        );

        fa.logEvent('question_type_text_button_click');
      } else {
        setValue(
          `questions.${questionIndex}.questionType`,
          questionTypes.CHOICETYPE,
        );
        fa.logEvent('question_type_choice_button_click');
      }
    }
    setToggle(false);
  };

  const handleDeleteButton = () => {
    remove(questionIndex);
  };

  return (
    <StyledQuestionDetailHeader>
      <ToggleButton toggle={isOpen} onClick={toggleHandler} text={text} />
      {isOpen && (
        <>
          <OutSide onTouchStart={handleClick} />
          <NavToggle
            toggleRef={ref}
            navList={questionTypeString}
            position={{ top: '5.5rem', left: '0' }}
            onClick={handleToggleList}
          />
        </>
      )}
      {questionIndex !== 0 && (
        <DeleteButton type="button" onClick={handleDeleteButton}>
          삭제
        </DeleteButton>
      )}
    </StyledQuestionDetailHeader>
  );
}

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
