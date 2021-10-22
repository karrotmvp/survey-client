import { MouseEvent, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import AlertTostModal from '@component/common/modal/TostModal';
import NavBar from '@component/common/navbar/NavBar';
import QuestionCardList from '@component/question/QuestionCardList';
import { ReactComponent as PlusIcon } from '@config/icon/plus.svg';
import StyledBasicPage from '@config/style/styledCompoent';
import {
  questionListAtom,
  questionListSelector,
  questionSelector,
} from '@src/atom/questionAtom';
import Modal from '@src/component/common/modal/Modal';
import useSubmit from '@src/hook/useSubmit';
import { useAnalytics } from '@src/analytics/faContext';

const AddQuestionButton = styled.button`
  background-color: ${({ theme }) => theme.color.primaryOrange};
  padding: 9px 26px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #ffff;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    margin-right: 8px;
  }
  &[aria-disabled='true'] {
    opacity: 0.5;
  }
  margin-left: auto;
`;

const CompleteButton = styled.button`
  background-color: transparent;
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.primaryOrange};
  padding: 1rem 0 1rem 0.5rem;

  &[aria-disabled='true'] {
    color: #c9c9c9;
  }
`;

const StyleQuestionPage = styled.section`
  width: 100%;
  height: calc(100vh - 5.5rem);
`;

export default function QuestionPage(): JSX.Element {
  const [questionList, setQuestionList] = useRecoilState(questionListAtom);
  const [isTostOpen, setTostOpen] = useState(false);
  const [isContentTostOpen, setContentTostOpen] = useState(false);
  const [isPopup, setPopup] = useState(false);

  const restQuestion = useResetRecoilState(questionListAtom);
  const listValueState = useRecoilValue(questionListSelector);
  const submitData = useRecoilValue(questionSelector);
  const { replace } = useNavigator();
  const submit = useSubmit('/surveys');
  const fa = useAnalytics();

  const handleAddQuestionButton = (e: MouseEvent) => {
    if ((e.currentTarget as HTMLButtonElement).ariaDisabled === 'true') {
      setContentTostOpen(true);
    } else if (questionList.length < 3) {
      setQuestionList([
        ...questionList,
        {
          questionType: 2,
          text: '',
          choices: [{ value: '' }],
        },
      ]);
    }
  };

  const handleAlert = () => {
    setTimeout(() => {
      setTostOpen(false);
    }, 1600);
  };

  const handleContentAlert = () => {
    setTimeout(() => {
      setContentTostOpen(false);
    }, 1600);
  };

  const handleComplete = (e: MouseEvent) => {
    if ((e.currentTarget as HTMLButtonElement).ariaDisabled === 'true') {
      fa.logEvent('question-completeClick-disable');
      setContentTostOpen(true);
    } else {
      fa.logEvent('question-completeClick-active', {
        questionlen: questionList.length,
      });
      setPopup(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setTostOpen(true);
    }, 1600);
  }, []);

  useEffect(() => {
    if (questionList.length === 3) {
      setTostOpen(true);
    }
  }, [questionList.length]);

  useEffect(() => {
    if (isTostOpen) handleAlert();
  }, [isTostOpen]);
  useEffect(() => {
    if (isContentTostOpen) handleContentAlert();
  }, [isContentTostOpen]);

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
        {isTostOpen && (
          <AlertTostModal
            text={'질문은 3개 이하까지 만들 수 있어요'}
            onClick={handleAlert}
          />
        )}
        {isContentTostOpen && (
          <AlertTostModal
            text={'내용을 모두 입력하세요'}
            onClick={handleContentAlert}
          />
        )}
        <StyleQuestionPage>
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
        </StyleQuestionPage>
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
              }}
            >
              수정
            </CancelButton>
            <ConfirmButton
              onClick={() => {
                submit(submitData);
                restQuestion();
                replace('/complete');
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
