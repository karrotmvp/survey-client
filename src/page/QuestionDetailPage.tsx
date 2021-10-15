import { MouseEvent, ChangeEvent, useState } from 'react';

import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

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
  const type =
    +location.pathname.split('/')[2] > 0 ? +location.pathname.split('/')[2] : 1;

  const [questionState, setQuestion] = useRecoilState(questionAtom);
  const questionListState = useRecoilValue(questionListAtom);
  const [isEnd, setEnd] = useState(true);
  console.log(isEnd);

  const [isQuestionOpen, setQuestionToggle] = useState(false);
  const [isOpen, setToggle] = useState(false);

  if (questionListState[type - 1]) {
    setQuestion(questionListState[type - 1]);
    setEnd(false);
  }

  const { questionType, text } = questionState;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion({ ...questionState, text: e.target.value });
  };

  const handleClick = (e: MouseEvent) => {
    setToggle(!isOpen);
    e.stopPropagation();
  };

  const handleReset = () => {
    setToggle(false);
    setQuestionToggle(false);
  };
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
          <AddButton text="질문 추가" />
        </QuestionDetailBottom>
      </PageModal>
    </StyledBasicPage>
  );
}
