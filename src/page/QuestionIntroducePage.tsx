import { ChangeEvent } from 'react';

import styled from '@emotion/styled';

import TextButton from '@component/common/button/TextButton';
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
  `;
  const QuestionIntroduceTitleInput = styled.textarea`
    margin-top: 24px;
    resize: none;
    outline: none;
    height: 63px;
    width: 100%;
    font-size: 18px;
    font-weight: 700;
    line-height: 140%;
    background-color: rgba(255, 255, 255, 0.5);
    border: 1px dashed #9f9f9f;
    color: #141414;
    padding: 1rem;
  `;

  const QuestionIntroduceSubtitleInput = styled.textarea`
    margin-top: 8px;
    resize: none;
    outline: none;
    height: 41px;
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px dashed #9f9f9f;
    color: #707070;
    padding: 0.5rem 1rem;
  `;

  const QuestionShare = styled.span`
    display: inline-block;
    font-size: 16px;
    font-weight: 400;
    text-decoration-line: underline;
    color: #858585;
    margin: 28px 0;
  `;

  const inputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = '16px';
    e.target.style.height = `${e.target.scrollHeight + 6}px`;
  };
  return (
    <>
      <NavBar type="BACK" title="소개 페이지" navColor="WHITE" />
      <StyledQuestionIntroducePage>
        <QuestionIntroduceTop>
          <QuestionIntroduceTitle>
            찰리 사진관 카페의 CHALee 사장님
          </QuestionIntroduceTitle>
          <QuestionIntroduceTitleInput onInput={inputChange} />
          <QuestionIntroduceSubtitleInput onInput={inputChange} />
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
