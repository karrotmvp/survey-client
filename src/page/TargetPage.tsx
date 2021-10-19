import styled from '@emotion/styled';

import NavBar from '@component/common/navbar/NavBar';
import TargetList from '@src/component/common/target/TargetList';

const StyledTargetPage = styled.section`
  background: #ffff;
  width: 100%;
  min-height: 100vh;
  padding: 3.5rem 1rem 1rem 1rem;
  overflow-y: scroll;
`;

const StyledTargetArticle = styled.article`
  margin-top: 2.2rem;
  width: 100%;
  height: 0;
  padding-top: calc(172 / 328 * 100%);
  background: url('./img/targetImg.png') center center / cover no-repeat;
  position: relative;
  border-radius: 4px;
  margin-bottom: 32px;
`;

const TargetPageTitle = styled.h1`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.fontFamily.title};
  position: absolute;
  top: 0;
  padding: 0.8rem 1rem;
`;

export default function TargetPage(): JSX.Element {
  return (
    <>
      <NavBar type="CLOSE" title="설문 고객 선택" />
      <StyledTargetPage>
        <StyledTargetArticle>
          <TargetPageTitle>
            어떤 이웃에게
            <br /> 보여줄 설문인가요?
          </TargetPageTitle>
        </StyledTargetArticle>
        <TargetList />
      </StyledTargetPage>
    </>
  );
}
