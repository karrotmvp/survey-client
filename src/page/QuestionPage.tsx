import { useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { FieldError, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

import NavBar from '@component/common/navbar/NavBar';
import QuestionCardList from '@component/question/QuestionCardList';
import StyledBasicPage from '@config/style/styledCompoent';
import { useAnalytics } from '@src/analytics/faContext';
import { choiceType, questionTarget } from '@src/atom/questionAtom';
import Modal from '@src/component/common/modal/Modal';
import { targetList } from '@src/config/const/const';
import useSubmit from '@src/hook/useSubmit';

const CompleteButton = styled.button`
  background-color: transparent;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.primaryOrange};
  padding: 1.6rem 0 1.6rem 0.8rem;

  &[aria-disabled='true'] {
    color: #c9c9c9;
  }
`;

export type questionCardType = {
  text: string;
  choices?: choiceType[];
  questionType: number;
};

export type submitType = {
  questions: questionCardType[];
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

export function questionCheck(question: questionCardType[]): boolean {
  const check = question.every(({ text }) => text);
  const choicesCheck = question.map(({ questionType, choices }) => {
    if (choices === undefined) {
      return true;
    }

    return choices.every(({ value }) => {
      if (questionType === 2) {
        return true;
      }
      return value;
    });
  });

  return check && choicesCheck.every(value => value);
}

export default function QuestionPage(): JSX.Element {
  const targetIndex = useRecoilValue(questionTarget);
  const [isPopup, setPopup] = useState(false);
  const [submitData, setSubmitData] = useState<
    (submitType & { title: string; target: number }) | undefined
  >(undefined);
  const { replace } = useNavigator();
  const submit = useSubmit('/surveys');
  const fa = useAnalytics();

  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    unregister,
    clearErrors,
    formState: { errors },
  } = useForm<submitType>({
    mode: 'onChange',
    defaultValues: {
      questions: [{ text: '', questionType: 3, choices: [{ value: '' }] }],
    },
  });

  const questionList = watch('questions');

  const onSubmit = (data: submitType) => {
    setSubmitData({
      title: 'example title',
      target: targetIndex,
      questions: data.questions.map(res => {
        if (res.questionType === 2) {
          return { text: res.text, questionType: res.questionType };
        }
        return res;
      }),
    });

    setPopup(true);
  };

  return (
    <>
      <NavBar
        type="BACK"
        title={`${targetList[targetIndex - 1].title} 대상 설문`}
        shadow
        appendRight={
          <CompleteButton
            aria-disabled={!questionCheck(questionList)}
            form="submitForm"
            type="submit"
          >
            완료
          </CompleteButton>
        }
      />
      <StyledBasicPage>
        <form id="submitForm" onSubmit={handleSubmit(onSubmit)}>
          <QuestionCardList
            {...{
              register,
              control,
              setValue,
              watch,
              unregister,
              errors,
            }}
          />
        </form>
      </StyledBasicPage>
      {isPopup && (
        <Modal setPopup={setPopup}>
          <ConfirmModal>
            설문 작성을 완료하면 질문을
            <br />
            더 이상 수정할 수 없어요.
            <br />
            완료하시겠어요?
          </ConfirmModal>
          <div>
            <CancelButton
              onClick={() => {
                clearErrors('questions');
                setPopup(false);
                fa.logEvent('question_modal_complete_button_cancel');
              }}
            >
              수정
            </CancelButton>
            <ConfirmButton
              onClick={() => {
                fa.logEvent('question_modal_complete_button_click');
                submit(submitData);
                replace('/survey/create/complete');
              }}
            >
              확인
            </ConfirmButton>
          </div>
        </Modal>
      )}
    </>
  );
}

const ConfirmModal = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #242424;
  padding: 0 24px;
  height: 124px;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const CancelButton = styled.button`
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  width: 50%;
  height: 51px;
  background-color: #ffff;
  color: #141414;
  border-top: 1px solid #e8e8e8;
  border-right: 1px solid #e8e8e8;
  :focus {
    background-color: #f4f5f6;
  }
  border-bottom-left-radius: 12px;
`;

const ConfirmButton = styled.button`
  font-weight: 600;
  font-size: 14px;
  line-height: 140%;
  width: 50%;
  height: 52px;
  background-color: #ffff;
  color: #141414;
  border-top: 1px solid #e8e8e8;
  :focus {
    background-color: #f4f5f6;
  }
  border-bottom-right-radius: 12px;
`;
