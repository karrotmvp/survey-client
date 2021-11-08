import { MouseEvent, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import AlertToastModal from '@component/common/modal/TostModal';
import NavBar from '@component/common/navbar/NavBar';
import QuestionCardList from '@component/question/QuestionCardList';
import { ReactComponent as PlusIcon } from '@config/icon/plus.svg';
import StyledBasicPage from '@config/style/styledCompoent';
import { useAnalytics } from '@src/analytics/faContext';
import {
  questionListAtom,
  questionListSelector,
  questionSelector,
  questionValidationAtom,
} from '@src/atom/questionAtom';
import Modal from '@src/component/common/modal/Modal';
import useSubmit from '@src/hook/useSubmit';

const AddQuestionButton = styled.button`
  background-color: ${({ theme }) => theme.color.primaryOrange};
  padding: 0.8rem;
  border-radius: 8px;
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

export default function QuestionPage(): JSX.Element {
  const [questionList, setQuestionList] = useRecoilState(questionListAtom);
  const [isToastOpen, setToastOpen] = useState(false);
  const [isContentToastOpen, setContentToastOpen] = useState(false);
  const [isPopup, setPopup] = useState(false);
  const restQuestion = useResetRecoilState(questionListAtom);
  const listValueState = useRecoilValue(questionListSelector);
  const submitData = useRecoilValue(questionSelector);
  const isValidated = useSetRecoilState(questionValidationAtom);
  const { replace } = useNavigator();
  const submit = useSubmit('/surveys');
  const fa = useAnalytics();

  const handleAddQuestionButton = (e: MouseEvent) => {
    if ((e.currentTarget as HTMLButtonElement).ariaDisabled === 'true') {
      setContentToastOpen(true);
      fa.logEvent('question_add_button_disable_click');

      isValidated(true);
    } else if (questionList.length < 3) {
      isValidated(false);
      fa.logEvent('question_add_button_active_click');
      setQuestionList([
        ...questionList,
        {
          questionType: 3,
          text: '',
          choices: [{ value: '' }],
        },
      ]);
    }
  };

  const handleComplete = (e: MouseEvent) => {
    if ((e.currentTarget as HTMLButtonElement).ariaDisabled === 'true') {
      fa.logEvent('question_complete_button_disable_click');
      setContentToastOpen(true);
      isValidated(true);
    } else {
      fa.logEvent('question_complete_button_active_click');
      setPopup(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setToastOpen(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (questionList.length === 3) {
      setToastOpen(true);
    }
  }, [questionList.length]);

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

  return (
    <>
      <NavBar
        type="BACK"
        title="질문 작성"
        shadow
        appendRight={
          <CompleteButton
            aria-disabled={!listValueState.check}
            onClick={handleComplete}
          >
            완료
          </CompleteButton>
        }
      />
      <StyledBasicPage>
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

        <QuestionCardList />
        {questionList.length < 3 && (
          <AddQuestionButton
            className="complete"
            aria-disabled={!listValueState.check || listValueState.len === 3}
            onClick={handleAddQuestionButton}
          >
            <PlusIcon /> 질문 추가
          </AddQuestionButton>
        )}
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
                setPopup(false);
                fa.logEvent('question_modal_complete_button_cancel');
              }}
            >
              수정
            </CancelButton>
            <ConfirmButton
              onClick={() => {
                fa.logEvent('question_modal_complete_button_click', {
                  questionlen: questionList.length,
                  textlen: questionList.filter(
                    ({ questionType }) => questionType === 2,
                  ).length,
                  choicelen: questionList.filter(
                    ({ questionType }) => questionType === 3,
                  ).length,
                });
                submit(submitData);
                restQuestion();
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
