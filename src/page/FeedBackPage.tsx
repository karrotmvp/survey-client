import { ChangeEvent, MouseEvent, useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator, useQueryParams } from '@karrotframe/navigator';
import { useRecoilState } from 'recoil';

import AlertTostModal from '@component/common/modal/TostModal';
import { useAnalytics } from '@src/analytics/faContext';
import { questionFeedBack } from '@src/atom/questionAtom';
import NavBar from '@src/component/common/navbar/NavBar';
import { contents } from '@src/config/const/const';
import useSubmit from '@src/hook/useSubmit';

export default function FeedBackPage(): JSX.Element {
  const [feedback, setFeedback] = useRecoilState(questionFeedBack);
  const [isToastOpen, setToastOpen] = useState(false);
  const { replace } = useNavigator();
  const query = useQueryParams<{ ref?: string }>();
  const ref = query.ref || 'app';

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
      setFeedback({
        question: contents.text.feedback.SUBTITLE,
        answer: '',
      });
      replace(`/feedback/complete?ref=${ref}`);
    } else {
      fa.logEvent('feedback_complete_button_disable_click');
      setToastOpen(true);
    }
  };

  return (
    <>
      <NavBar
        type="BACK"
        title="피드백"
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
        <FeedbackTitle>되고 싶어요🔥</FeedbackTitle>
        <FeedbackSubtitle>{contents.text.feedback.SUBTITLE}</FeedbackSubtitle>
        <StyledTitleInput
          value={feedback.answer}
          onChange={handleChange}
          placeholder={contents.placeholder.FEEDBACK}
        />

        <AlertTostModal
          text={'내용을 모두 입력하세요'}
          time={3000}
          {...{ isToastOpen, setToastOpen }}
        />
      </StyledFeedBackPage>
    </>
  );
}

const StyledFeedBackPage = styled.section`
  background-color: #ffff;
  width: 100%;
  height: 100vh;
  padding: 8rem 1.6rem 1.6rem 1.6rem;
  display: flex;
  flex-direction: column;
`;

const FeedbackTitle = styled.h1`
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: 2.2rem;
  color: #141414;
  line-height: 140%;
  display: flex;
  align-items: center;
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

const FeedbackSubtitle = styled.h4`
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: 1.5rem;
  line-height: 140%;
  margin-top: 1.6rem;
  margin-bottom: 1.6rem;
  color: #4b4b4b;
  width: 28rem;
`;

const StyledTitleInput = styled.textarea`
  margin-top: 1.6rem;
  border: none;
  resize: none;
  outline: none;
  width: 100%;
  height: 40%;
  background: #f4f5f6;
  border: 1px solid #c9c9c9;
  box-sizing: border-box;
  border-radius: 7px;
  padding: 1.6rem;
  font-size: 1.6rem;
  ::placeholder {
    color: ${({ theme }) => theme.color.neutralBlack.placeholder};
  }
`;
