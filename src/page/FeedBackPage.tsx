import { ChangeEvent } from 'react';

import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import { questionFeedBack } from '@src/atom/questionAtom';
import NavBar from '@src/component/common/navbar/NavBar';
import contents from '@src/config/const/const';

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
  font-size: 1.2rem;
  line-height: 120%;
  color: #259e6b;
  margin-bottom: 1rem;
`;

const FeedbackSubtitle = styled.h4`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 140%;
  margin-bottom: 1rem;
`;

const FeedbackSubmitButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  font-weight: 700;
  color: #fff;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.primaryOrange};
  margin-bottom: 1rem;
`;

const FeedbackSkipButton = styled.button`
  padding: 0.3rem;
  background-color: transparent;
  text-decoration-line: underline;
  color: #707070;
`;

const StyledTitleInput = styled.textarea`
  margin-top: 1rem;
  border: none;
  resize: none;
  outline: none;
  width: 100%;
  height: 20%;
  background: #f4f5f6;
  border: 1px solid #c9c9c9;
  box-sizing: border-box;
  border-radius: 7px;
  padding: 8px 6px;
  ::placeholder {
    opacity: 0.5;
  }
  margin-bottom: 0.8rem;
`;

export default function FeedBackPage(): JSX.Element {
  const [feedback, setFeedback] = useRecoilState(questionFeedBack);
  const handleChange = (e: ChangeEvent) => {
    setFeedback({
      questionType: 4,
      text: (e.target as HTMLTextAreaElement).value,
    });
  };

  return (
    <StyledFeedBackPage>
      <NavBar type="BACK" title="무따 서비스 피드백 남기기" />
      <FeedbackTitle>{contents.text.feedback.TITLE}</FeedbackTitle>
      <FeedbackSubtitle>{contents.text.feedback.SUBTITLE}</FeedbackSubtitle>
      <StyledTitleInput
        value={feedback.text}
        onChange={handleChange}
        placeholder={contents.placeholder.FEEDBACK}
      />
      <FeedbackSubmitButton>{contents.button.SEND}</FeedbackSubmitButton>
      <FeedbackSkipButton>{contents.button.SKIP}</FeedbackSkipButton>
    </StyledFeedBackPage>
  );
}
