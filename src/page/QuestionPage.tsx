import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';

import AlertTostModal from '@component/common/modal/TostModal';
import NavBar from '@component/common/navbar/NavBar';
import QuestionCardList from '@component/question/QuestionCardList';
import { ReactComponent as PlusIcon } from '@config/icon/plus.svg';
import StyledBasicPage from '@config/style/styledCompoent';
import { questionListAtom, questionListSelector } from '@src/atom/questionAtom';

const AddQuestionButton = styled.button`
  background-color: ${({ theme }) => theme.color.primaryOrange};
  padding: 9px 26px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #ffff;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    margin-right: 8px;
  }
  :disabled {
    opacity: 0.5;
  }
  margin-left: auto;
`;

const CompleteButton = styled.button`
  background-color: transparent;
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.primaryOrange};
  padding: 0.5rem 1rem;
`;

const StyleQuestionPage = styled.section`
  width: 100%;
  min-height: calc(100vh - 5.5rem);
`;

export default function QuestionPage(): JSX.Element {
  const [questionList, setQuestionList] = useRecoilState(questionListAtom);
  const [isTostOpen, setTostOpen] = useState(true);
  const listValueState = useRecoilValue(questionListSelector);
  const handleAddQuestionButton = () => {
    if (questionList.length < 3) {
      setQuestionList([
        ...questionList,
        {
          questionType: 2,
          text: '',
          choices: [{ value: '' }],
        },
      ]);
    }
  };
  const handleAlert = () => {
    setTostOpen(false);
  };
  useEffect(() => {
    setTimeout(handleAlert, 5000);
  }, []);
  return (
    <StyledBasicPage>
      {isTostOpen && <AlertTostModal onClick={handleAlert} />}
      <NavBar
        type="BACK"
        title="질문 작성"
        appendRight={<CompleteButton>완료</CompleteButton>}
      />
      <StyleQuestionPage>
        <QuestionCardList />
        <AddQuestionButton
          disabled={!listValueState.check || listValueState.len === 3}
          onClick={handleAddQuestionButton}
        >
          <PlusIcon /> 질문 추가
        </AddQuestionButton>
      </StyleQuestionPage>
    </StyledBasicPage>
  );
}
