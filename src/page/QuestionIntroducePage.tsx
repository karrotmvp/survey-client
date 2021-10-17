import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { userSelector } from '@atom/userAtom';
import QuestionSubtitleInput from '@component/common/input/QuestionSubtitleInput';
import NavBar from '@component/common/navbar/NavBar';
import StyledBasicPage from '@config/style/styledCompoent';

export default function QuestionIntroducePage(): JSX.Element {
  const introduceTitle = useRecoilValue(userSelector);

  const StyledQuestionIntroducePage = styled.section`
    background-color: #ffff;
    width: 100%;
    padding: 3.5rem 1rem 10px 1rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `;

  const QuestionIntroduceTop = styled.section``;

  const QuestionIntroduceTitle = styled.h3`
    color: ${({ theme }) => theme.color.secondaryGreen};
    font-weight: 600;
    font-size: 14px;
    margin-top: 40px;
    margin-left: 8px;
  `;

  const handleChange = () => {
    console.log('e');
  };

  return (
    <>
      <StyledBasicPage>
        <NavBar type="BACK" title="설문 소개 작성" />
        <StyledQuestionIntroducePage>
          <QuestionIntroduceTop>
            <QuestionIntroduceTitle>{introduceTitle}</QuestionIntroduceTitle>

            <QuestionSubtitleInput onChange={handleChange} value="" />
          </QuestionIntroduceTop>
        </StyledQuestionIntroducePage>
      </StyledBasicPage>
    </>
  );
}
