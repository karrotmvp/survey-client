import { MouseEvent, useState } from 'react';

import styled from '@emotion/styled';
// import { useRecoilState } from 'recoil';

// import { questionTitle } from '@atom/questionAtom';
import PageModal from '@component/common/modal/PageModal';
import UpDownModal from '@component/common/modal/UpDownModal';
import NavBar from '@component/common/navbar/NavBar';
import NavToggle from '@component/common/navbar/NavToggle';
import QuestionCardList from '@component/question/QuestionCardList';
import QuestionModal from '@component/question/QuestionModal';
import QuestionNavRight from '@component/question/QuestionNavRight';
import { ReactComponent as MoreIcon } from '@config/icon/more_w.svg';
import { ReactComponent as PlusIcon } from '@config/icon/plus.svg';
import StyledBasicPage from '@config/style/styledCompoent';
// const StyledInput = styled.input`
//   outline: none;
//   font-size: 22px;
//   font-weight: 400;
//   background: #f4f5f6;
//   border-radius: 4px 4px 0px 0px;
//   color: #707070;
//   width: 100%;
//   padding: 8px 6px;
//   border: none;
//   border-bottom: 1px solid #c9c9c9;
//   margin-bottom: 20px;
//   margin-top: 24px;
// `;
const NavIcon = styled(MoreIcon)`
  margin-left: 8px;
`;

const AddQuestionButton = styled.button`
  background-color: ${({ theme }) => theme.color.primaryOrange};
  padding: 16px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 50px;
  right: 16px;
`;

export default function QuestionPage(): JSX.Element {
  // const [questionTitleState, setQuestionTitle] =
  //   useRecoilState<string>(questionTitle);
  const [isOpen, setToggle] = useState(false);
  const [isPopup, setPopup] = useState(false);

  const handleClick = () => {
    setPopup(true);
  };

  const handleToggle = (e: MouseEvent) => {
    setToggle(false);
  };

  return (
    <StyledBasicPage onClick={handleToggle}>
      <NavBar
        type="BACK"
        title="설문 작성하기"
        appendRight={
          <QuestionNavRight
            rightIcon={
              <>
                <NavIcon onClick={() => setToggle(true)} />
                {isOpen && <NavToggle navList={['개별 삭제', '전체 삭제']} />}
              </>
            }
          />
        }
      />
      <PageModal rowPaddingNone={true}>
        <QuestionCardList />
        <AddQuestionButton onClick={handleClick}>
          <PlusIcon />
        </AddQuestionButton>
        {isPopup && (
          <UpDownModal setPopup={setPopup}>
            <QuestionModal />
          </UpDownModal>
        )}
      </PageModal>
    </StyledBasicPage>
  );
}
