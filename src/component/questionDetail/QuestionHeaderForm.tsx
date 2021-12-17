import { MouseEvent, useRef, useState } from 'react';

import styled from '@emotion/styled';
import {
  UseFormSetValue,
  UseFormUnregister,
  UseFormWatch,
} from 'react-hook-form';

import ToggleButton from '@component/common/button/ToggleButton';
import NavToggle from '@component/common/navbar/NavToggle';
import { ReactComponent as ClearIcon } from '@config/icon/clear.svg';
import { useAnalytics } from '@src/analytics/faContext';
import { questionTypes } from '@src/config/const/const';
import useOutsideClick from '@src/hook/useOutSideClick';
import { submitType } from '@src/page/QuestionPage';

const StyledQuestionDetailHeader = styled.section`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
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
  const [isTooltip, setTooltip] = useState(
    Boolean(localStorage.getItem('type_toolpit')),
  );
  const handleClick = useOutsideClick(ref, () => {
    if (isOpen) {
      setToggle(false);
    }
  });

  const tooltipClose = () => {
    setTooltip(true);
    localStorage.setItem('type_toolpit', 'true');
  };

  const toggleHandler = (e: MouseEvent) => {
    fa.logEvent('question_type_button_click');
    setToggle(!isOpen);
    tooltipClose();
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
            position={{ top: '3.5rem', left: '0' }}
            onClick={handleToggleList}
          />
        </>
      )}
      {!isTooltip && (
        <ToolTip>
          주관식 질문으로도 바꿀 수 있어요
          <ClearIcon onClick={tooltipClose} />
        </ToolTip>
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

const ToolTip = styled.div`
  position: absolute;
  box-sizing: border-box;
  padding: 1.1rem 3.4rem 1.1rem 1.4rem;
  background: ${({ theme }) => theme.color.neutralBlack.main};
  border-radius: 0.8rem;
  bottom: -5.3rem;
  left: 0rem;
  svg {
    position: absolute;
    right: 1.4rem;
    width: 16px;
    height: 16px;
    margin-left: 0.8rem;
  }
  font-size: 1.3rem;
  line-height: 2rem;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    width: 0;
    height: 0;
    border: 0.7rem solid transparent;
    border-bottom-color: ${({ theme }) => theme.color.neutralBlack.main};
    border-top: 0;
    margin-left: -0.7rem;
    margin-top: -0.7rem;
  }
  filter: drop-shadow(0px 0px 4px rgba(27, 27, 27, 0.08))
    drop-shadow(0px 6px 12px rgba(27, 27, 27, 0.1));
`;
