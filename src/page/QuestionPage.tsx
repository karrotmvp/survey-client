import { useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import NavBar from '@component/common/navbar/NavBar';
import QuestionCardList from '@component/question/QuestionCardList';
import StyledBasicPage from '@config/style/styledCompoent';
import { useAnalytics } from '@src/analytics/faContext';
import { questionListAtom, questionSelector } from '@src/atom/questionAtom';
import Modal from '@src/component/common/modal/Modal';
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

export default function QuestionPage(): JSX.Element {
  const [isPopup, setPopup] = useState(false);
  const restQuestion = useResetRecoilState(questionListAtom);
  // const listValueState = useRecoilValue(questionListSelector);
  const submitData = useRecoilValue(questionSelector);
  // const isValidated = useSetRecoilState(questionValidationAtom);
  const { replace } = useNavigator();
  const submit = useSubmit('/surveys');
  const fa = useAnalytics();

  // const handleComplete = (e: MouseEvent) => {
  //   if ((e.currentTarget as HTMLButtonElement).ariaDisabled === 'true') {
  //     fa.logEvent('question_complete_button_disable_click');
  //     isValidated(true);
  //   } else {
  //     fa.logEvent('question_complete_button_active_click');
  //     setPopup(true);
  //   }
  // };

  return (
    <>
      <NavBar
        type="BACK"
        title="질문 작성"
        shadow
        appendRight={
          <CompleteButton form="submitForm" type="submit">
            완료
          </CompleteButton>
        }
      />
      <StyledBasicPage>
        <QuestionCardList />
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
                fa.logEvent('question_modal_complete_button_click');
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
