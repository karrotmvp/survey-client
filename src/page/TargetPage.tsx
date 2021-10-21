import styled from '@emotion/styled';

import NavBar from '@component/common/navbar/NavBar';
import TargetList from '@src/component/common/target/TargetList';

const StyledTargetPage = styled.section`
  background: #ffff;
  width: 100%;
<<<<<<< HEAD
  min-height: 100vh;
=======
  height: 100vh;
>>>>>>> 737c1477dd62e01db2aded6967e9e80f1bb8f5f3
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
      <NavBar type="CLOSE" title="설문 고객 선택" />
      <StyledTargetPage>
        <StyledTargetArticle></StyledTargetArticle>
        <TargetList />
      </StyledTargetPage>
    </>
  );
}
