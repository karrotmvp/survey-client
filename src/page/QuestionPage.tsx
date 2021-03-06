import { useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { FieldError, useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import NavBar from '@component/common/navbar/NavBar';
import QuestionCardList from '@component/question/QuestionCardList';
// import { ReactComponent as ExpandIcon } from '@config/icon/expand_more.svg';
import { useAnalytics } from '@src/analytics/faContext';
import { surveyIdAtom, surveyListTrigger } from '@src/api/authorization';
import {
  choiceType,
  questionTarget,
  questionTitleModalOpen,
} from '@src/atom/questionAtom';
import Modal from '@src/component/common/modal/Modal';
// import TargetList from '@src/component/common/target/TargetList';
// import { targetList } from '@src/config/const/const';
import { useShowEvent } from '@src/hook/useShowEvent';
import useSubmitReturn from '@src/hook/useSubmitReturn';

const CompleteButton = styled.button`
  background-color: transparent;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.primaryOrange};
  padding: 1.6rem 0 1.6rem 0.8rem;

  &[aria-disabled='true'] {
    color: #c9c9c9;
  }

  :disabled {
    color: #c9c9c9;
  }
`;

export type questionCardType = {
  text: string;
  choices?: choiceType[];
  questionType: number;
};

export type submitType = {
  title: string;
  questions: questionCardType[];
};

export type errorsType = {
  title?: FieldError | undefined;
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
  // const [isTargetPopup, setTargetPopup] = useState(false);
  const setSurveyId = useSetRecoilState(surveyIdAtom);
  const [submitData, setSubmitData] = useState<
    (submitType & { title: string; target: number }) | undefined
  >(undefined);

  const { replace } = useNavigator();
  const submit = useSubmitReturn<number>('/mongo/surveys');
  const [trigger, setTrigger] = useRecoilState(surveyListTrigger);
  const fa = useAnalytics();
  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    unregister,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<submitType>({
    defaultValues: {
      title: '',
      questions: [],
    },
  });
  useShowEvent('survey_create_question_show');

  const questionList = watch('questions');
  const titleWatch = watch('title');
  const isTitleModalOpen = useRecoilValue(questionTitleModalOpen);

  const onSubmit = ({ title, questions }: submitType) => {
    fa.logEvent('question_complete_button_active_click');
    if (title === '') {
      setError('title', {
        type: 'manual',
        message: '????????? ??????????????????',
      });
    } else {
      setSubmitData({
        title,
        target: targetIndex,
        questions: questions.map(res => {
          if (res.questionType === 2) {
            return { text: res.text, questionType: res.questionType };
          }
          return res;
        }),
      });
      setPopup(true);
    }
  };

  return (
    <>
      <NavBar
        type="BACK"
        title={`?????? ?????????`}
        shadow
        disappear={isTitleModalOpen}
        appendRight={
          <CompleteButton
            aria-disabled={!questionCheck(questionList) || titleWatch === ''}
            form="submitForm"
            type="submit"
          >
            ??????
          </CompleteButton>
        }
      />

      <StyledForm id="submitForm" onSubmit={handleSubmit(onSubmit)}>
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
      </StyledForm>

      {isPopup && (
        <Modal setPopup={setPopup}>
          <ConfirmModal>
            ?????? ????????? ???????????? ?????????
            <br />
            ??? ?????? ????????? ??? ?????????.
            <br />
            ??????????????????????
          </ConfirmModal>
          <div>
            <CancelButton
              onClick={() => {
                clearErrors('questions');
                setPopup(false);
                fa.logEvent('question_modal_complete_button_cancel');
              }}
            >
              ??????
            </CancelButton>
            <ConfirmButton
              onClick={async () => {
                fa.logEvent('question_modal_complete_button_click');
                const result = await submit(submitData);
                setTrigger(trigger + 1);
                if (result) {
                  setSurveyId(`${result}`);
                  replace('/survey/create/complete');
                }
              }}
            >
              ??????
            </ConfirmButton>
          </div>
        </Modal>
      )}
    </>
  );
}

const StyledForm = styled.form`
  overflow: scroll;
  position: relative;
  height: 100vh;
`;

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
