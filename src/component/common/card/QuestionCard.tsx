import styled from '@emotion/styled';
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister,
  UseFormWatch,
} from 'react-hook-form';

import { contents } from '@config/const/const';
import ChoiceInputFormList from '@src/component/questionDetail/ChoiceInputFormList';
import QuestionHeaderForm from '@src/component/questionDetail/QuestionHeaderForm';
import { errorsType, submitType } from '@src/page/QuestionPage';

import InputForm from '../input/InputForm';

export type formConfigType = {
  watch: UseFormWatch<submitType>;
  setValue: UseFormSetValue<submitType>;
  register: UseFormRegister<submitType>;
  control: Control<submitType>;
  remove: (index?: number | number[] | undefined) => void;
  unregister: UseFormUnregister<submitType>;
  errors: errorsType;
};

type QuestionCardType = {
  questionIndex: number;
} & formConfigType;

const StyledQuestionCard = styled.li`
  width: 100%;
  background-color: #ffff;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 1.6rem;
  padding-top: 1.6rem;
`;

const StyledQuestionInput = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  color: #707070;
  padding: 0.6rem 0;
  border-bottom: 1px solid #707070;
`;
const StyledQuestionChoiceOrText = styled.div`
  padding-top: 3.2rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #f4f4f4;
`;

const ErrorText = styled.h6`
  font-size: 1.3rem;
  line-height: 100%;
  font-weight: 400;
  color: #ff0000;
  padding-left: 1.6rem;
  margin-top: 0.8rem;
`;

export default function QuestionCard({
  questionIndex,
  watch,
  setValue,
  remove,
  register,
  unregister,
  control,
  errors,
}: QuestionCardType): JSX.Element {
  const questionType = watch(`questions.${questionIndex}.questionType`);
  return (
    <>
      {questionIndex !== 0 && <Divider />}
      <StyledQuestionCard>
        <QuestionHeaderForm
          {...{
            questionIndex,
            watch,
            setValue,
            remove,
            unregister,
          }}
        />

        <InputForm
          register={register}
          questionIndex={questionIndex}
          placeholder={contents.placeholder.TEXT}
          row={1}
          backgroundColor={'#F4F5F6'}
          warning={Boolean(errors.questions?.[questionIndex]?.text)}
        />
        {errors.questions?.[questionIndex]?.text && (
          <ErrorText>답변을 입력해주세요</ErrorText>
        )}

        <StyledQuestionChoiceOrText>
          {questionType === 2 ? (
            <StyledQuestionInput>주관식 답변...</StyledQuestionInput>
          ) : (
            <ChoiceInputFormList
              {...{
                errors,
                register,
                control,
                questionIndex,
                unregister,
              }}
            />
          )}
        </StyledQuestionChoiceOrText>
      </StyledQuestionCard>
    </>
  );
}
