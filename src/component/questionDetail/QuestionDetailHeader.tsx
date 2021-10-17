import { MouseEvent, useRef, useState } from 'react';

import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import { questionListAtom } from '@atom/questionAtom';
import ToggleButton from '@component/common/button/ToggleButton';
import NavToggle from '@component/common/navbar/NavToggle';
import { ReactComponent as TrashIcon } from '@config/icon/trash.svg';
import useOutsideClick from '@src/hook/useOutSideClick';

const StyledQuestionDetailHeader = styled.section`
  display: flex;
  width: 100%;
`;

const StyledQuestionDetailTitle = styled.h3`
  color: ${({ theme }) => theme.color.secondaryGreen};
  font-weight: 700;
  font-size: 24px;
  margin-left: 8px;
  margin-right: 5px;
  font-family: ${({ theme }) => theme.fontFamily.title};
`;

const QuestionDetailLeft = styled.div`
  display: flex;
`;

export type QuestionType = {
  questionIndex: number;
  questionType: 2 | 3;
};

export default function QuestionDetailHeader({
  questionIndex,
  questionType,
}: QuestionType): JSX.Element {
  const [questionListState, setQuestionList] = useRecoilState(questionListAtom);
  const [isOpen, setToggle] = useState(false);
  const ref = useRef<HTMLUListElement>(null);

  const handleClick = useOutsideClick(ref, () => {
    if (isOpen) {
      setToggle(false);
    }
  });
  const toggleHandler = (e: MouseEvent) => {
    setToggle(!isOpen);
  };

  let text: string;
  switch (questionType) {
    case 2:
      text = '주관식';
      break;
    case 3:
      text = '객관식';
      break;
    default:
      throw new Error();
  }
  // 단방향이다

  const handleToggleList = (e: MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    const checkTargetNum = (targetNum: number): 2 | 3 => {
      if (targetNum === 2 || targetNum === 3) {
        return targetNum;
      }
      return 3;
    };

    if (target.dataset.list) {
      setQuestionList([
        ...questionListState.slice(0, questionIndex),
        {
          ...questionListState[questionIndex],
          questionType: checkTargetNum(+target.dataset.list + 2),
        },
        ...questionListState.slice(questionIndex + 1),
      ]);
    }
    setToggle(false);
  };

  const OutSide = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: transparent;
    z-index: 9999999;
  `;

  const DeleteButton = styled.button`
    border-radius: 50%;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  `;
  const handleDeleteButton = () => {
    setQuestionList([
      ...questionListState.slice(0, questionIndex),

      ...questionListState.slice(questionIndex + 1),
    ]);
  };
  return (
    <StyledQuestionDetailHeader>
      <QuestionDetailLeft>
        <StyledQuestionDetailTitle>
          질문 {questionIndex + 1}
        </StyledQuestionDetailTitle>
      </QuestionDetailLeft>
      <ToggleButton onClick={toggleHandler} text={text} />
      {isOpen && (
        <>
          <OutSide onClick={handleClick} />
          <NavToggle
            toggleRef={ref}
            navList={['주관식', '객관식']}
            position={{ top: '46px', left: '4px' }}
            onClick={handleToggleList}
          />
        </>
      )}
      {questionIndex !== 0 && (
        <DeleteButton onClick={handleDeleteButton}>
          <TrashIcon />
        </DeleteButton>
      )}
    </StyledQuestionDetailHeader>
  );
}
