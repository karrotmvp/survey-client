import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import AlertTostModal from '@component/common/modal/TostModal';
import { useAnalytics } from '@src/analytics/faContext';
import mini from '@src/api/mini';
import { questionFeedBack } from '@src/atom/questionAtom';
import Modal from '@src/component/common/modal/Modal';
import NavBar from '@src/component/common/navbar/NavBar';
import contents from '@src/config/const/const';
import useSubmit from '@src/hook/useSubmit';

const StyledFeedBackPage = styled.section`
  background-color: #ffff;
  width: 100%;
  height: 100vh;
  padding: 5.5rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
`;

const FeedbackTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.title};
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 120%;
  color: #fe7e35;
  line-height: 140%;
  white-space: pre-wrap;
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

const FeedbackSubtitle = styled.h4`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 140%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const StyledTitleInput = styled.textarea`
  margin-top: 1rem;
  border: none;
  resize: none;
  outline: none;
  width: 100%;
  height: 40%;
  background: #f4f5f6;
  border: 1px solid #c9c9c9;
  box-sizing: border-box;
  border-radius: 7px;
  padding: 0.5rem;
  font-size: 1rem;
  ::placeholder {
    color: #c9c9c9;
  }
  margin-bottom: 0.8rem;
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

const ConfirmButton = styled.button`
  font-weight: 600;
  font-size: 14px;
  line-height: 140%;
  width: 100%;
  height: 52px;
  background-color: #ffff;
  color: #141414;
  border-top: 1px solid #e8e8e8;
  :focus {
    background-color: #f4f5f6;
  }
`;

export default function FeedBackPage(): JSX.Element {
  const [feedback, setFeedback] = useRecoilState(questionFeedBack);
  const [isToastOpen, setToastOpen] = useState(false);
  const [isPopup, setPopup] = useState(false);
  const fa = useAnalytics();
  const post = useSubmit('/feedbacks');
  const handleChange = (e: ChangeEvent) => {
    setFeedback({
      question: contents.text.feedback.SUBTITLE,
      answer: (e.target as HTMLTextAreaElement).value,
    });
  };

  const handleComplete = (e: MouseEvent) => {
    if (e.currentTarget.ariaDisabled !== 'true') {
      fa.logEvent('feedback_complete_button_active_click');
      post(feedback);
      setPopup(true);
    } else {
      fa.logEvent('feedback_complete_button_disable_click');
      setToastOpen(true);
    }
  };
  const handleAlert = () => {
    setTimeout(() => {
      setToastOpen(false);
    }, 3000);
  };

  useEffect(() => {
    if (isToastOpen) handleAlert();
  }, [isToastOpen]);

  return (
    <>
      <NavBar
        type="BACK"
        title="무따 서비스 피드백"
        appendRight={
          <CompleteButton
            aria-disabled={!feedback.answer}
            onClick={handleComplete}
          >
            완료
          </CompleteButton>
        }
      />
      <StyledFeedBackPage>
        <FeedbackTitle>무따는 더 좋은 설문 서비스가</FeedbackTitle>
        <FeedbackTitle>되고 싶어요</FeedbackTitle>
        <FeedbackSubtitle>{contents.text.feedback.SUBTITLE}</FeedbackSubtitle>
        <StyledTitleInput
          value={feedback.answer}
          onChange={handleChange}
          placeholder={contents.placeholder.FEEDBACK}
        />
        {isToastOpen && (
          <AlertTostModal
            text={'내용을 모두 입력하세요'}
            onClick={handleAlert}
          />
        )}

        {isPopup && (
          <Modal setPopup={setPopup}>
            <ConfirmModal>소중한 의견 남겨 주셔서 감사합니다.</ConfirmModal>

            <ConfirmButton
              onClick={() => {
                mini.close();
              }}
            >
              종료
            </ConfirmButton>
          </Modal>
        )}
      </StyledFeedBackPage>
    </>
  );
}
