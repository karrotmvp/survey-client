import { MouseEvent, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { FieldError, useFieldArray, useForm } from 'react-hook-form';

import QuestionCard from '@component/common/card/QuestionCard';
import AlertToastModal from '@component/common/modal/TostModal';
import { ReactComponent as PlusIcon } from '@config/icon/plus.svg';
import { choiceType } from '@src/atom/questionAtom';

const StyledQuestionCardList = styled.ul`
  display: grid;
  grid-template-columns: auto;
`;
type questionType = {
  text: string;
  choices?: choiceType[];
  questionType: number;
};

export type submitType = {
  questions: questionType[];
};

export type errorsType = {
  questions?:
    | {
        text?: FieldError | undefined;
        questionType?: FieldError | undefined;
        choices?:
          | {
              value?: FieldError | undefined;
              choiceId?: FieldError | undefined;
            }[]
          | undefined;
      }[]
    | undefined;
};

export default function QuestionCardList(): JSX.Element {
  const [isContentToastOpen, setContentToastOpen] = useState(false);
  const [isToastOpen, setToastOpen] = useState(false);

  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    unregister,
    formState: { errors },
  } = useForm<submitType>({
    mode: 'onChange',
    defaultValues: {
      questions: [{ text: '', questionType: 3, choices: [{ value: '' }] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const questionList = watch('questions');

  const handleAddQuestionButton = (e: MouseEvent) => {
    if ((e.currentTarget as HTMLButtonElement).ariaDisabled === 'true') {
      setContentToastOpen(true);
    } else if (questionList.length < 3) {
      append(
        { text: '', questionType: 3, choices: [{ value: '' }] },
        { shouldFocus: false },
      );
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

  const onSubmit = (data: submitType) => {
    const submitdata = {
      questions: data.questions.map(res => {
        if (res.questionType === 2) {
          return { text: res.text, questionType: res.questionType };
        }
        return res;
      }),
    };

    if (process.env.NODE_ENV === 'development') {
      console.log('submitdata : ', submitdata, data);
    }
  };
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(errors);
    }
  }, [errors]);

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
        <form id="submitForm" onSubmit={handleSubmit(onSubmit)}>
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
                }}
                questionIndex={questionIndex}
              />
            ))}
        </form>
      </StyledQuestionCardList>
      {fields.length < 3 && (
        <AddQuestionButton
          type="button"
          className="complete"
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
