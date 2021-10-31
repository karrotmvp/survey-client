import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';

import { questionListAtom, questionListSelector } from '@atom/questionAtom';
import AlertTostModal from '@component/common/modal/TostModal';
import { ReactComponent as PluseIcon } from '@config/icon/plus.svg';
import { useAnalytics } from '@src/analytics/faContext';

import QuestionChoice from './QuestionChoice';

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
  color: #141414;
  svg {
    margin-right: 8px;
  }
  &[aria-disabled='true'] {
    opacity: 0.5;
  }
`;

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
  if (choices === undefined) throw new Error('choice undefined');
  const elRefs = useRef<HTMLTextAreaElement[]>([]);
  const [isToastOpen, setToast] = useState(false);

  const fa = useAnalytics();
  // since it is an array we need to method to add the refs
  const addToRefs = (el: HTMLTextAreaElement) => {
    if (el && !elRefs.current.includes(el)) {
      elRefs.current.push(el);
    }
  };

  const onChange = (e: ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const index = target.dataset.list;

    if (index !== undefined) {
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ref = elRefs.current[+index!];
    if (ref === null) {
      return;
    }
    ref.style.height = 'auto';
    ref.style.height = `${ref.scrollHeight}px`;
  };

  const handleClick = (e: MouseEvent) => {
    if (e.currentTarget.ariaDisabled === 'true') {
      fa.logEvent('question_choice_add_button_disable_click');
      setToast(true);
    } else {
      fa.logEvent('question_choice_add_button_active_click');
      setQuestionlist([
        ...questionList.slice(0, questionIndex),
        {
          ...questionList[questionIndex],
          choices: [...choices, { value: '' }],
        },
        ...questionList.slice(questionIndex + 1),
      ]);
    }
  };

  const onDelete = (e: MouseEvent) => {
    fa.logEvent('question_choice_delete_button_click');
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
      elRefs.current = [];
    }
  };

  const handleContentAlert = () => {
    setTimeout(() => {
      setToast(false);
    }, 3000);
  };

  useEffect(() => {
    if (isToastOpen) handleContentAlert();
  }, [isToastOpen]);

  const { choicesCheck } = useRecoilValue(questionListSelector);

  useEffect(() => {
    if (elRefs && !choicesCheck[0] && elRefs.current.length !== 1) {
      setTimeout(() => {
        elRefs.current[elRefs.current.length - 1].focus();
      }, 200);
    }
  }, [choices.length]);

  return (
    <StyledQuestionChoiceList>
      {isToastOpen && (
        <AlertTostModal
          text={'객관식 답변을 입력해주세요'}
          onClick={handleContentAlert}
        />
      )}
      {choices &&
        choices.map(({ value }, index) => (
          <QuestionChoice
            // eslint-disable-next-line no-return-assign
            ref={addToRefs}
            key={index}
            {...{ value, onDelete, onChange, index }}
          />
        ))}
      <StyledChoiceButton
        aria-disabled={!choicesCheck[questionIndex]}
        onClick={handleClick}
      >
        <PluseIcon /> 항목 추가
      </StyledChoiceButton>
    </StyledQuestionChoiceList>
  );
}
