import { MouseEvent, useState, useEffect } from 'react';

import styled from '@emotion/styled';
// import { useNavigator } from '@karrotframe/navigator';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { questionAtom, questionListAtom } from '@atom/questionAtom';
import AddButton from '@component/common/button/QAddButton';
import NavBar from '@component/common/navbar/NavBar';
import QuestionChoiceList from '@component/questionDetail/QuestionChoiceList';
import QuestionDetailHeader from '@component/questionDetail/QuestionDetailHeader';
import StyledBasicPage from '@config/style/styledCompoent';

const QuestionDetailBottom = styled.section`
  margin-top: 52px;
`;

export default function QuestionDetailPage(): JSX.Element {
  // const { push } = useNavigator();
  const resetQuestionState = useResetRecoilState(questionAtom);
  // eslint-disable-next-line prefer-const
  let type = 2;
  const [questionState, setQuestion] = useRecoilState(questionAtom);
  const [questionListState, setQuestionListState] =
    useRecoilState(questionListAtom);

  const [isQuestionOpen, setQuestionToggle] = useState(false);
  const [isOpen, setToggle] = useState(false);

  const { questionType } = questionState;

  const handleReset = (e: MouseEvent) => {
    if (isOpen) {
      setToggle(false);
    }
    if (isQuestionOpen) {
      setQuestionToggle(false);
    }
  };

  const handleRouter = () => {
    setQuestionListState([...questionListState, questionState]);
    resetQuestionState();
  };
  useEffect(() => {
    if (questionListState[type - 1]) {
      setQuestion(questionListState[type - 1]);
      // setEnd(false);
    }
  }, [setQuestion, type]);

  const CompleteButton = styled.button`
    background-color: transparent;
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.color.primaryOrange};
    padding: 0.5rem 1rem;
  `;

  const StyleQuestionPage = styled.section`
    width: 100%;
    min-height: calc(100vh - 3.5rem);
  `;

  return (
    <StyledBasicPage onClick={handleReset}>
      <NavBar
        type="BACK"
        title="질문 작성"
        appendRight={<CompleteButton>완료</CompleteButton>}
      />
      <StyleQuestionPage>
        <QuestionDetailHeader title={type} questionType={questionType} />
        <QuestionDetailBottom>
          {questionType === 3 && <QuestionChoiceList />}
          {type === 3 ? (
            <AddButton text="설문 목록 보기" onClick={handleRouter} />
          ) : (
            <AddButton text="질문 추가" onClick={handleRouter} />
          )}
        </QuestionDetailBottom>
      </StyleQuestionPage>
    </StyledBasicPage>
  );
}
