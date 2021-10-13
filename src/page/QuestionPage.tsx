import { useState } from 'react';

import styled from '@emotion/styled';

import IconButton from '@component/common/button/IconButton';
import UpDownModal from '@component/common/modal/UpDownModal';
import NavBar from '@component/common/navbar/NavBar';
import QuestionCardList from '@component/question/QuestionCardList';
import QuestionModal from '@component/question/QuestionModal';
import { ReactComponent as PlusIcon } from '@config/icon/plus.svg';

const StyledCreatePage = styled.section`
  background: linear-gradient(180deg, #f9f9fb 0%, #f2f2f2 100%);
  width: 100%;
  padding: 3.5rem 1rem 10px 1rem;
  min-height: 100vh;
`;

const StyledInput = styled.input`
  outline: none;
  font-size: 22px;
  font-weight: 400;
  background-color: transparent;
  border: none;
  margin-bottom: 1rem;
`;

export default function QuestionPage(): JSX.Element {
  const [isPopup, setPopup] = useState(false);
  const handleClick = () => {
    setPopup(true);
  };
  return (
    <>
      <NavBar type="BACK" navColor="GRAY" title="설문 1" />
      <StyledCreatePage>
        <StyledInput value="설문 1" />
        <QuestionCardList />
        <IconButton
          text="질문 추가"
          buttonColor="PRIMARY"
          buttonSize="LARGE"
          icon={<PlusIcon />}
          onClick={handleClick}
        />
        {isPopup && (
          <UpDownModal setPopup={setPopup}>
            <QuestionModal />
          </UpDownModal>
        )}
      </StyledCreatePage>
    </>
  );
}
