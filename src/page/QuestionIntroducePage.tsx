import styled from '@emotion/styled';

import TextButton from '@component/common/button/TextButton';
import QuestionSubtitleInput from '@component/common/input/QuestionSubtitleInput';
import QuestionTitleInput from '@component/common/input/QuestionTitleInput';
import NavBar from '@component/common/navbar/NavBar';

export default function QuestionIntroducePage(): JSX.Element {
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
  const QuestionIntroduceBottom = styled.section`
    opacity: 0.2;
    text-align: center;
  `;

  const QuestionIntroduceTitle = styled.h3`
    color: ${({ theme }) => theme.color.secondaryGreen};
    font-weight: 600;
    font-size: 14px;
    margin-top: 40px;
    margin-left: 8px;
  `;

  const QuestionShare = styled.span`
    display: inline-block;
    font-size: 16px;
    font-weight: 400;
    text-decoration-line: underline;
    color: #858585;
    margin: 28px 0;
  `;
  const handleChange = () => {
    console.log('e');
  };
  return (
    <>
      <NavBar type="BACK" title="소개 페이지" navColor="WHITE" />
      <StyledQuestionIntroducePage>
        <QuestionIntroduceTop>
          <QuestionIntroduceTitle>
            찰리 사진관 카페의 CHALee 사장님
          </QuestionIntroduceTitle>
          <QuestionTitleInput onChange={handleChange} value="" />
          <QuestionSubtitleInput onChange={handleChange} value="" />
        </QuestionIntroduceTop>
        <QuestionIntroduceBottom>
          <TextButton
            text="참여하기"
            buttonColor="PRIMARY"
            buttonSize="LARGE"
          />
          <QuestionShare>공유하기</QuestionShare>
        </QuestionIntroduceBottom>
      </StyledQuestionIntroducePage>
    </>
  );
}
