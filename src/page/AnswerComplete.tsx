import { useEffect } from 'react';

import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import mini from '@src/api/mini';
import { responseUserAtom } from '@src/atom/responseAtom';
import LoginButton from '@src/component/common/button/LogInButton';
import NavBar from '@src/component/common/navbar/NavBar';

const StyledAnswerComplete = styled.section`
  background-color: #fff2eb;
  height: 100vh;
  padding: 5rem 1rem 1rem 1rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .answer_complete_page {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
  .center {
    height: 80%;
  }
`;

const CompleteImg = styled.img`
  width: 100%;
`;

const CompleteTitle = styled.h1`
  font-size: 1.2rem;
  line-height: 140%;
  margin: 1rem 0;
  color: #fe7e35;
`;

const SurveySubtitle = styled.h3`
  color: #8e8f95;

  font-size: 1rem;
  line-height: 140%;
  font-weight: 400;
  text-align: center;

  color: #707070;
`;

const BizProfileVisit = styled.button`
  color: #8e8f95;
  font-size: 0.8rem;
  line-height: 100%;
  display: flex;
  align-items: center;
  font-weight: 400;
  background-color: transparent;
  margin-top: 1rem;
  text-decoration: underline;
  text-underline-offset: 4px;
`;

export default function AnswerComplete(): JSX.Element {
  const history = useHistory();
  const bizProfile = useRecoilValue(responseUserAtom);
  useEffect(() => {
    const unblock = history.block((location, action) => {
      if (action === 'POP') {
        mini.close();
        return false;
      }
      return undefined;
    });

    return () => {
      unblock();
    };
  }, [history]);

  const handleVisitBizProfile = () => {
    if (!bizProfile?.profileUrl) {
      return;
    }
    window.location.href = bizProfile.profileUrl;
  };
  return (
    <StyledAnswerComplete>
      <NavBar type="CLOSE" transparent />
      <div className="answer_complete_page center">
        <CompleteImg src="./../../img/responseComplete.png" />
        <CompleteTitle>의견을 남겨주셔서 감사해요!</CompleteTitle>
        <SurveySubtitle>
          여러분이 남긴 의견은 <b>{bizProfile?.name} 사장님</b>이 <br />
          매장을 개선하는 데 큰 도움이 됩니다 💪
        </SurveySubtitle>
      </div>

      <div className="answer_complete_page">
        <LoginButton text="나가기" onClick={() => mini.close()} />
        <BizProfileVisit onClick={handleVisitBizProfile}>
          {bizProfile?.name} 비즈 프로필 방문하기
        </BizProfileVisit>
      </div>
    </StyledAnswerComplete>
  );
}
