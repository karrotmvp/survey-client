import { MouseEvent, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import {
  Control,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister,
  UseFormWatch,
} from 'react-hook-form';

import QuestionCard from '@component/common/card/QuestionCard';
import AlertToastModal from '@component/common/modal/TostModal';
import { ReactComponent as PlusIcon } from '@config/icon/plus.svg';
import { log } from '@src/config/utils/util';
import { errorsType, questionCheck, submitType } from '@src/page/QuestionPage';

type questionCardListType = {
  register: UseFormRegister<submitType>;
  control: Control<submitType>;
  setValue: UseFormSetValue<submitType>;
  watch: UseFormWatch<submitType>;
  unregister: UseFormUnregister<submitType>;
  errors: errorsType;
};

export default function QuestionCardList({
  register,
  control,
  setValue,
  watch,
  unregister,
  errors,
}: questionCardListType): JSX.Element {
  const [isContentToastOpen, setContentToastOpen] = useState(false);
  const [isToastOpen, setToastOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const questionList = watch('questions');

  const handleAddQuestionButton = (e: MouseEvent) => {
    log(questionList);
    if ((e.currentTarget as HTMLButtonElement).ariaDisabled === 'true') {
      setContentToastOpen(true);
    } else if (questionList.length < 3) {
      append({
        text: '',
        questionType: 3,
        choices: [{ value: '' }, { value: '' }],
      });
    }
  };

  useEffect(() => {
    if (questionList.length === 3) {
      setToastOpen(true);
    }
  }, [questionList.length]);

  useEffect(() => {
    setTimeout(() => {
      setToastOpen(true);
    }, 1000);
  }, []);

  return (
    <>
      <AlertToastModal
        text={'질문은 3개 이하까지 만들 수 있어요'}
        time={3000}
        {...{ isToastOpen, setToastOpen }}
      />
      <AlertToastModal
        text={'내용을 모두 입력하세요'}
        time={3000}
        isToastOpen={isContentToastOpen}
        setToastOpen={setContentToastOpen}
      />
      <StyledQuestionCardList>
        {fields &&
          fields.map(({ id }, questionIndex) => (
            <QuestionCard
              key={id}
              {...{
                register,
                control,
                setValue,
                watch,
                remove,
                unregister,
                errors,
                questionIndex,
              }}
            />
          ))}
      </StyledQuestionCardList>

      {fields.length < 3 && (
        <AddQuestionButton
          type="button"
          className="complete"
          aria-disabled={!questionCheck(questionList)}
          onClick={handleAddQuestionButton}
        >
          <PlusIcon /> 질문 추가
        </AddQuestionButton>
      )}
    </>
  );
}

const AddQuestionButton = styled.button`
  background-color: ${({ theme }) => theme.color.primaryOrange};
  padding: 0.8rem;
  border-radius: 4px;
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffff;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    margin-right: 8px;
  }
  &[aria-disabled='true'] {
    background-color: #c9c9c9;
  }
  margin-left: auto;
`;

const StyledQuestionCardList = styled.ul`
  display: grid;
  grid-template-columns: auto;
`;
