import { ChangeEvent } from 'react';

import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import { questionListAtom } from '@atom/questionAtom';
import QuestionCard from '@component/common/card/QuestionCard';

const StyledQuestionCardList = styled.ul`
  display: grid;
  grid-template-columns: auto;
`;

export default function QuestionCardList(): JSX.Element {
  const [questionList, setQuestionList] = useRecoilState(questionListAtom);
  console.log(questionList);

  const handleChange = (e: ChangeEvent) => {
    const target = e.currentTarget as HTMLTextAreaElement;
    const idx = +target.dataset.list!;
    console.log('d', idx);
    setQuestionList([
      ...questionList.slice(0, idx),
      { ...questionList[idx], text: target.value },
      ...questionList.slice(idx + 1, -1),
    ]);
  };
  return (
    <StyledQuestionCardList>
      {questionList &&
        questionList.map(({ questionType, text }, questionIndex) => (
          <QuestionCard
            key={questionIndex}
            title={text}
            questionType={questionType}
            questionIndex={questionIndex}
            handleChange={handleChange}
          />
        ))}
    </StyledQuestionCardList>
  );
}
