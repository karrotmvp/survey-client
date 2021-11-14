import styled from '@emotion/styled';
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister,
  UseFormWatch,
} from 'react-hook-form';

import contents from '@config/const/const';
import {
  errorsType,
  submitType,
} from '@src/component/question/QuestionCardList';
import ChoiceInputFormList from '@src/component/questionDetail/ChoiceInputFormList';
import QuestionHeaderForm from '@src/component/questionDetail/QuestionHeaderForm';
// import QuestionChoiceList from '@src/component/questionDetail/QuestionChoiceList';

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
          row={2}
          backgroundColor={'#F4F5F6'}
          warning={Boolean(errors.questions?.[questionIndex]?.text)}
        />
        {errors.questions?.[questionIndex]?.text && (
          <span>답변을 입력해주세요</span>
        )}

        <StyledQuestionChoiceOrText>
          {questionType === 2 ? (
            <StyledQuestionInput>주관식 답변...</StyledQuestionInput>
          ) : (
            <ChoiceInputFormList
              {...{
                errors,
                questionType,
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
