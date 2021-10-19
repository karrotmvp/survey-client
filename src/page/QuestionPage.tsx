import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { useRecoilState, useRecoilValue } from 'recoil';

import AlertTostModal from '@component/common/modal/TostModal';
import NavBar from '@component/common/navbar/NavBar';
import QuestionCardList from '@component/question/QuestionCardList';
import { ReactComponent as PlusIcon } from '@config/icon/plus.svg';
import StyledBasicPage from '@config/style/styledCompoent';
import {
  questionListAtom,
  questionListSelector,
  questionSelector,
} from '@src/atom/questionAtom';
import useSubmit from '@src/hook/useSubmit';

const AddQuestionButton = styled.button`
  background-color: ${({ theme }) => theme.color.primaryOrange};
  padding: 9px 26px;
  border-radius: 8px;
  font-size: 0.8rem;
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
  padding: 1rem 0 1rem 0.5rem;
  :disabled {
    color: #c9c9c9;
  }
`;

const StyleQuestionPage = styled.section`
  width: 100%;
  height: calc(100vh - 5.5rem);
`;

export default function QuestionPage(): JSX.Element {
  const [questionList, setQuestionList] = useRecoilState(questionListAtom);
  const [isTostOpen, setTostOpen] = useState(false);

  const listValueState = useRecoilValue(questionListSelector);
  const submitData = useRecoilValue(questionSelector);
  const { push } = useNavigator();
  const submit = useSubmit('/surveys');
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
    setTimeout(() => {
      setTostOpen(false);
    }, 1600);
  };

  const handleComplete = () => {
    submit(submitData);
    push('/complete');
  };

  useEffect(() => {
    if (questionList.length === 3) {
      setTostOpen(true);
    }
  }, [questionList.length]);

  useEffect(() => {
    if (isTostOpen) handleAlert();
  }, [isTostOpen]);

  return (
    <>
      <NavBar
        type="BACK"
        title="질문 작성"
        shadow
        appendRight={
          <CompleteButton
            disabled={!listValueState.check}
            onClick={handleComplete}
          >
            완료
          </CompleteButton>
        }
      />
      <StyledBasicPage>
        {isTostOpen && <AlertTostModal onClick={handleAlert} />}
        <StyleQuestionPage>
          <QuestionCardList />
          {questionList.length < 3 && (
            <AddQuestionButton
              disabled={!listValueState.check || listValueState.len === 3}
              onClick={handleAddQuestionButton}
            >
              <PlusIcon /> 질문 추가
            </AddQuestionButton>
          )}
        </StyleQuestionPage>
      </StyledBasicPage>
    </>
  );
}
