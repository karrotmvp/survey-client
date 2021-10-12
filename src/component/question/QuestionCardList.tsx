import styled from '@emotion/styled';

import QuestionCard from '@component/common/card/QuestionCard';

const StyledQuestionCardList = styled.ul`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 16px;
`;

export default function QuestionCardList(): JSX.Element {
  return (
    <StyledQuestionCardList>
      <QuestionCard
        key={'eeee'}
        title={`안녕하세요. 카페나무입니다!\n우리가게 신메뉴에 대한 설문이에요!`}
        type="INTRODUCE"
        description="참여한 분들께는 소정의 선물을 드려요"
      />
      <QuestionCard
        key={3333}
        title={`겨울에 어울리는 음료 메뉴를 추가하려고 해요. 메뉴를 추천해주세요!`}
        type="Q1"
        description="ex) 얼그레이티, 따뜻한 코코아"
        QuestionType="TEXT"
      />
    </StyledQuestionCardList>
  );
}
