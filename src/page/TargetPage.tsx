import styled from '@emotion/styled';

import NavBar from '@component/common/navbar/NavBar';
import TargetList from '@src/component/common/target/TargetList';

const StyledTargetPage = styled.section`
  background: #ffff;
  width: 100%;
  height: 100vh;
  padding: 3.5rem 1rem 1rem 1rem;
  overflow-y: scroll;
`;

const StyledTargetArticle = styled.article`
  margin-top: 2.2rem;
  width: 100%;
  height: 0;
  padding-top: calc(228 / 328 * 100%);
  background: url('./img/targetImg.png') center center / cover no-repeat;
  position: relative;
  border-radius: 4px;
  margin-bottom: 32px;
`;

export default function TargetPage(): JSX.Element {
  return (
    <>
      <NavBar type="BACK" title="설문 고객 선택" />
      <StyledTargetPage>
        <StyledTargetArticle></StyledTargetArticle>
        <TargetList />
      </StyledTargetPage>
    </>
  );
}
