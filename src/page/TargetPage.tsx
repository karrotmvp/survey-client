import { useEffect } from 'react';

import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
  useEffect(() => {
    console.log(history);
    const unblock = history.block('정말 떠나실건가요?');
    return () => {
      unblock();
    };
  }, [history]);

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
