import styled from '@emotion/styled';

import NavBar from '@component/common/navbar/NavBar';
import TargetBanner from '@src/component/common/target/TargetBanner';
import TargetList from '@src/component/common/target/TargetList';

const StyledTargetPage = styled.section`
  background: #ffff;
  width: 100%;
  min-height: 100vh;
  padding: 5.5rem 1rem 1rem 1rem;
`;

const StyledTargetArticle = styled.article`
  margin-top: 1.2rem;
  width: 100%;
  height: 0;
  padding-top: calc(172 / 328 * 100%);
  background: url('./img/targetPage.png') center center / cover no-repeat;
  position: relative;
`;

const TargetPageTitle = styled.h2`
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  position: absolute;
  top: 0;
  padding: 0.8rem 1rem;
`;

export default function TargetPage(): JSX.Element {
  return (
    <StyledTargetPage>
      <NavBar type="CLOSE" title="고객 범위 설정" />
      <TargetBanner />
      <StyledTargetArticle>
        <TargetPageTitle>
          사장님이 선택하신 범위의 고객님 당근마켓 피드에 설문지가 보여요!
        </TargetPageTitle>
      </StyledTargetArticle>
      <TargetList />
    </StyledTargetPage>
  );
}
