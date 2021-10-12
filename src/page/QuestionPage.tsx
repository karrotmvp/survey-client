import styled from '@emotion/styled';

import IconButton from '@component/common/button/IconButton';
import NavBar from '@component/common/navbar/NavBar';
import QuestionCardList from '@component/question/QuestionCardList';
import { ReactComponent as PlusIcon } from '@config/icon/plus.svg';

const StyledCreatePage = styled.section`
  background-color: #e5e5e5;
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
        />
      </StyledCreatePage>
    </>
  );
}
