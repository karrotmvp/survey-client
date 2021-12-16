import { FormEvent, MouseEvent, useRef, useState } from 'react';

import styled from '@emotion/styled';
import {
  Control,
  useFieldArray,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';

import AlertToastModal from '@component/common/modal/TostModal';
import { ReactComponent as ChoiceCircleIcon } from '@config/icon/choiceCircle.svg';
import { useAnalytics } from '@src/analytics/faContext';
import { errorsType, submitType } from '@src/page/QuestionPage';

import ChoiceInputForm from './ChoiceInputForm';

export default function ChoiceInputFormList({
  control,
  register,
  questionIndex,
  errors,
  watch,
}: {
  control: Control<submitType>;
  register: UseFormRegister<submitType>;
  questionIndex: number;
  errors: errorsType;
  watch: UseFormWatch<submitType>;
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
          warning={Boolean(
            errors.questions?.[questionIndex]?.choices?.[index]?.value,
          )}
          {...{
            errors,
            watch,
            onInput,
            register,
            questionIndex,
            remove,
            index,
          }}
        />
      ))}
      <div className="choice_add_button">
        <StyledCircle />
        <StyledChoiceButton type="button" onClick={handleClick}>
          선택지 추가
        </StyledChoiceButton>
      </div>
    </StyledQuestionChoiceList>
  );
}

const StyledCircle = styled(ChoiceCircleIcon)`
  height: 2rem;
`;

const StyledChoiceButton = styled.button`
  width: fit-content;
  text-decoration: underline;
  justify-content: flex-start;
  align-items: center;
  margin-left: 0.4rem;
  text-underline-offset: 4px;
  padding: 0.9rem 0.6rem 1.5rem 0.6rem;
  background-color: transparent;
  line-height: 140%;
  color: ${({ theme }) => theme.color.primaryOrange};
  :focus {
    background-color: #f4f5f6;
  }
  svg {
    margin-right: 8px;
  }
  &[aria-disabled='true'] {
    color: #c9c9c9;
  }
`;

const StyledQuestionChoiceList = styled.ul`
  display: grid;
  grid-gap: 1.6rem;
  grid-template-columns: auto;
  .choice_add_button {
    display: flex;
    align-items: center;
  }
`;
