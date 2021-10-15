import { MouseEvent, ChangeEvent, useState, useEffect } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { questionAtom, questionListAtom } from '@atom/questionAtom';
import AddButton from '@component/common/button/QAddButton';
import QuestionTitleInput from '@component/common/input/QuestionTitleInput';
import PageModal from '@component/common/modal/PageModal';
import NavBar from '@component/common/navbar/NavBar';
import NavToggle from '@component/common/navbar/NavToggle';
import QuestionNavRight from '@component/question/QuestionNavRight';
import QuestionChoiceList from '@component/questionDetail/QuestionChoiceList';
import QuestionDetailHeader from '@component/questionDetail/QuestionDetailHeader';
import contents from '@config/const/const';
import { ReactComponent as MoreIcon } from '@config/icon/more_w.svg';
import StyledBasicPage from '@config/style/styledCompoent';

const QuestionDetailBottom = styled.section`
  margin-top: 52px;
`;
const NavIcon = styled(MoreIcon)`
  margin-left: 8px;
`;
export default function QuestionDetailPage(): JSX.Element {
  const location = useLocation();
  const { push } = useNavigator();
  const resetQuestionState = useResetRecoilState(questionAtom);
  const type =
    +location.pathname.split('/')[2] > 0 ? +location.pathname.split('/')[2] : 1;

  const [questionState, setQuestion] = useRecoilState(questionAtom);
  const [questionListState, setQuestionListState] =
    useRecoilState(questionListAtom);
  // const [isEnd, setEnd] = useState(true);
  // console.log(isEnd);

  const [isQuestionOpen, setQuestionToggle] = useState(false);
  const [isOpen, setToggle] = useState(false);

  const { questionType, text } = questionState;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion({ ...questionState, text: e.target.value });
  };

  const handleClick = (e: MouseEvent) => {
    setToggle(!isOpen);
    setQuestionToggle(false);
  };

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
    if (type === 3) push('/question');
    else push(`/question/${type + 1}`);
  };
  useEffect(() => {
    if (questionListState[type - 1]) {
      setQuestion(questionListState[type - 1]);
      // setEnd(false);
    }
  }, [setQuestion, type]);

  return (
    <StyledBasicPage onClick={handleReset}>
      <NavBar
        type="BACK"
        title="질문 작성"
        appendRight={
          <QuestionNavRight
            rightIcon={
              <>
                <NavIcon onClick={handleClick} />
                {isOpen && (
                  <NavToggle
                    navList={['목록 보기', '삭제']}
                    position={{ top: '-18px', right: '0' }}
                  />
                )}
              </>
            }
          />
        }
      />
      <PageModal>
        <QuestionDetailHeader
          isOpen={isQuestionOpen}
          setToggle={setQuestionToggle}
          title={type}
          questionType={questionType}
        />
        <QuestionTitleInput
          onChange={handleChange}
          placeholder={contents.placeholder.TEXT}
          value={text}
        />

        <QuestionDetailBottom>
          {questionType === 3 && <QuestionChoiceList />}
          {type === 3 ? (
            <AddButton text="설문 목록 보기" onClick={handleRouter} />
          ) : (
            <AddButton text="질문 추가" onClick={handleRouter} />
          )}
        </QuestionDetailBottom>
      </PageModal>
    </StyledBasicPage>
  );
}
