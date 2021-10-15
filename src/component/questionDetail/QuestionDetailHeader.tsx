import { MouseEvent } from 'react';

import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import { questionAtom } from '@atom/questionAtom';
import ToggleButton from '@component/common/button/ToggleButton';
import NavToggle from '@component/common/navbar/NavToggle';

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
`;

const QuestionDetailLeft = styled.div`
  display: flex;
`;

export type QuestionType = {
  title: number;
  isOpen: boolean;
  questionType: 1 | 2 | 3;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function QuestionDetailHeader({
  title,
  questionType,
  isOpen,
  setToggle,
}: QuestionType): JSX.Element {
  const [questionState, setQuestion] = useRecoilState(questionAtom);

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
      text = '주관식';
      break;
  }

  const handleToggleList = (e: MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    const checkTargetNum = (targetNum: number): 2 | 3 => {
      if (targetNum === 2 || targetNum === 3) {
        return targetNum;
      }
      return 3;
    };

    if (target.dataset.list) {
      setQuestion({
        ...questionState,
        questionType: checkTargetNum(+target.dataset.list + 2),
      });
    }
  };

  return (
    <StyledQuestionDetailHeader>
      <QuestionDetailLeft>
        <StyledQuestionDetailTitle>질문 {title}</StyledQuestionDetailTitle>
      </QuestionDetailLeft>
      <ToggleButton onClick={toggleHandler} text={text} />
      {isOpen && (
        <NavToggle
          navList={['주관식', '객관식']}
          position={{ top: '44px', left: '16px' }}
          onClick={handleToggleList}
        />
      )}
    </StyledQuestionDetailHeader>
  );
}
