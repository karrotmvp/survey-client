import { ChangeEvent, FocusEvent } from 'react';

import styled from '@emotion/styled';
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister,
  UseFormWatch,
} from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import { contents } from '@config/const/const';
import { ReactComponent as WarningIcon } from '@config/icon/warning.svg';
import { focusAtom } from '@src/atom/questionAtom';
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
  padding-bottom: 2.4rem;
  padding-top: 1.2rem;
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
  display: flex;
  align-items: center;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
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
  const setFocus = useSetRecoilState(focusAtom);

  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    setFocus(true);
  };

  const handleBlur = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFocus(false);
  };

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
          path={`questions.${questionIndex}.text`}
          placeholder={contents.placeholder.TEXT}
          row={1}
          backgroundColor={'#F4F5F6'}
          config={{ required: true }}
          Blur={handleBlur}
          handleFocus={handleFocus}
          warning={Boolean(errors.questions?.[questionIndex]?.text)}
        />
        {errors.questions?.[questionIndex]?.text && (
          <ErrorText>
            <WarningIcon style={{ marginRight: '0.4rem' }} />
            질문을 적어주세요
          </ErrorText>
        )}

        <StyledQuestionChoiceOrText>
          {questionType === 2 ? (
            <StyledQuestionInput>주관식 답변...</StyledQuestionInput>
          ) : (
            <ChoiceInputFormList
              {...{
                watch,
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
