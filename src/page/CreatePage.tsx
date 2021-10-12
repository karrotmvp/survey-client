import styled from '@emotion/styled';

import NavBar from '@component/common/navbar/NavBar';
import QuestionCardList from '@component/question/QuestionCardList';

export default function CreatePage(): JSX.Element {
  const StyledCreatePage = styled.section`
    background-color: #e5e5e5;
    width: 100%;
    padding: 3.5rem 1rem 10px 1rem;
    min-height: 100vh;
  `;

  return (
    <>
      <NavBar type="BACK" navColor="GRAY" title="설문 1" />
      <StyledCreatePage>
        <QuestionCardList />
      </StyledCreatePage>
    </>
  );
}
