import { FormEvent, MouseEvent, useRef, useState } from 'react';

import styled from '@emotion/styled';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';

import AlertToastModal from '@component/common/modal/TostModal';
import { ReactComponent as PluseIcon } from '@config/icon/plus.svg';
import { useAnalytics } from '@src/analytics/faContext';

import { submitType } from '../question/QuestionCardList';
import ChoiceInputForm from './ChoiceInputForm';

export default function ChoiceInputFormList({
  control,
  register,
  questionIndex,
}: {
  control: Control<submitType>;
  register: UseFormRegister<submitType>;
  questionIndex: number;
}): JSX.Element {
  const elRefs = useRef<HTMLTextAreaElement[]>([]);
  const [isToastOpen, setToastOpen] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices`,
  });

  const fa = useAnalytics();
  // since it is an array we need to method to add the refs
  const addToRefs = (el: HTMLTextAreaElement | null) => {
    if (el && !elRefs.current.includes(el)) {
      elRefs.current.push(el);
    }
  };

  const onInput = (e: FormEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const index = target.dataset.list;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ref = elRefs.current[+index!];
    if (ref === null) {
      return;
    }
    ref.style.height = 'auto';
    ref.style.height = `${ref.scrollHeight}px`;
  };

  const handleClick = (e: MouseEvent) => {
    append({ value: '' }, { shouldFocus: false });
    setTimeout(() => {
      elRefs.current[elRefs.current.length - 1].focus();
    }, 400);
    if (e.currentTarget.ariaDisabled === 'true') {
      fa.logEvent('question_choice_add_button_disable_click');
      setToastOpen(true);
    } else {
      fa.logEvent('question_choice_add_button_active_click');
    }
  };

  return (
    <StyledQuestionChoiceList>
      <AlertToastModal
        text={'객관식 답변을 입력해주세요'}
        time={3000}
        {...{ setToastOpen, isToastOpen }}
      />
      {fields.map((item, index) => (
        <ChoiceInputForm
          key={item.id}
          choiceRef={addToRefs}
          {...{ onInput, register, questionIndex, remove, index }}
        />
      ))}
      <StyledChoiceButton onClick={handleClick}>
        <PluseIcon /> 선택지 추가
      </StyledChoiceButton>
    </StyledQuestionChoiceList>
  );
}

const StyledChoiceButton = styled.button`
  width: 100%;

  border-radius: 25.5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.9rem 1.6rem;
  background-color: #f4f5f6;
  font-size: 1.6rem;
  font-weight: 400;
  color: #707070;
  svg {
    margin-right: 8px;
  }
  &[aria-disabled='true'] {
    color: #c9c9c9;
  }
`;

const StyledQuestionChoiceList = styled.ul`
  display: grid;
  grid-gap: 1.2rem;
  grid-template-columns: auto;
`;
