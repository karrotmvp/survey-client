import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

import QuestionSubtitleInput from '@component/common/input/QuestionSubtitleInput';
import QuestionTitleInput from '@component/common/input/QuestionTitleInput';
import NavBar from '@component/common/navbar/NavBar';
import QuestionDetailHeader from '@component/questionDetail/QuestionDetailHeader';

export default function QuestionDetailPage(): JSX.Element {
  const location = useLocation();
  const type = location.pathname.split('/')[2];

  const StyledQuestionDetailPage = styled.section`
    background-color: #ffff;
    width: 100%;
    padding: 3.5rem 1rem 10px 1rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  `;

  const QuestionDetailTop = styled.section`
    padding-top: 24px;
  `;

  const QuestionDetailBottom = styled.section`
    margin-top: 52px;
    opacity: 0.2;
  `;

  const QuestionDetailInput = styled.div`
    width: 100%;
    border-bottom: 1.5px solid #2c3049;
    font-size: 20px;
    font-weight: 700;
    line-height: 120%;
    color: #cacbd1;
    padding: 8px;
  `;

  const handleChange = () => {
    console.log('d');
  };
  return (
    <>
      <NavBar type="BACK" title={type} navColor="WHITE" />
      <StyledQuestionDetailPage>
        <QuestionDetailTop>
          <QuestionDetailHeader title={type} />
          <QuestionTitleInput onChange={handleChange} value="" />
          <QuestionSubtitleInput onChange={handleChange} value="" />
        </QuestionDetailTop>
        <QuestionDetailBottom>
          <QuestionDetailInput>답변을 적어주세요</QuestionDetailInput>
        </QuestionDetailBottom>
      </StyledQuestionDetailPage>
    </>
  );
}
