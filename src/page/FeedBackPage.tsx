import { ChangeEvent } from 'react';

import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import mini from '@src/api/mini';
import { questionFeedBack } from '@src/atom/questionAtom';
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
  margin-bottom: 1rem;
  width: 284px;
  line-height: 140%;
  white-space: pre-wrap;
`;

const CompleteButton = styled.button`
  background-color: transparent;
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.primaryOrange};
  padding: 1rem 0 1rem 0.5rem;
  :disabled {
    color: #c9c9c9;
  }
`;

const FeedbackSubtitle = styled.h4`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 140%;
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

export default function FeedBackPage(): JSX.Element {
  const [feedback, setFeedback] = useRecoilState(questionFeedBack);
  const post = useSubmit('/feedbacks');
  const handleChange = (e: ChangeEvent) => {
    setFeedback({
      question: contents.text.feedback.SUBTITLE,
      answer: (e.target as HTMLTextAreaElement).value,
    });
  };

  const handleComplete = () => {
    post(feedback);
    mini.close();
  };

  return (
    <>
      <NavBar
        type="BACK"
        title="무따 서비스 피드백"
        appendRight={
          <CompleteButton onClick={handleComplete}>완료</CompleteButton>
        }
      />
      <StyledFeedBackPage>
        <FeedbackTitle>{contents.text.feedback.TITLE}</FeedbackTitle>
        <FeedbackSubtitle>{contents.text.feedback.SUBTITLE}</FeedbackSubtitle>
        <StyledTitleInput
          value={feedback.answer}
          onChange={handleChange}
          placeholder={contents.placeholder.FEEDBACK}
        />
      </StyledFeedBackPage>
    </>
  );
}
