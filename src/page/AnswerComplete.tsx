import { useEffect } from 'react';

import styled from '@emotion/styled';
import { useNavigator, useParams } from '@karrotframe/navigator';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { useAnalytics } from '@src/analytics/faContext';
import mini from '@src/api/mini';
import { responseUserAtom } from '@src/atom/responseAtom';
import LoginButton from '@src/component/common/button/LogInButton';
import NavBar from '@src/component/common/navbar/NavBar';

export default function AnswerComplete(): JSX.Element {
  const history = useHistory();
  const { push } = useNavigator();
  const { responsesId } = useParams<{ responsesId?: string }>();
  if (!responsesId) throw new Error('questionNumber or responsesId none');

  const fa = useAnalytics();
  const bizProfile = useRecoilValue(responseUserAtom);

  useEffect(() => {
    fa.logEvent(`response_complete_page_show`, {
      responsesId,
    });
    fa.logEvent(`${responsesId}_response_complete_page_show`);
  }, []);

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
    fa.logEvent(`response_complete_bizprofile_click`, {
      responsesId,
    });
    fa.logEvent(`${responsesId}_response_complete_bizprofile_click`);
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
          매장을 개선하는 데 큰 도움이 됩니다
        </SurveySubtitle>
      </div>

      <div className="answer_complete_page">
        <LoginButton
          text="사장님 비즈프로필 방문하기"
          onClick={handleVisitBizProfile}
        />
        <BizProfileVisit
          onClick={() => {
            push('/feedback');
          }}
        >
          무따 서비스 피드백 남기기
        </BizProfileVisit>
      </div>
    </StyledAnswerComplete>
  );
}

const StyledAnswerComplete = styled.section`
  background-color: #fff2eb;
  height: 100vh;
  padding: 8rem 1.6rem 1.6rem 1.6rem;
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
  font-size: 1.8rem;
  line-height: 140%;
  margin: 1.6rem 0;
  color: #fe7e35;
`;

const SurveySubtitle = styled.h3`
  font-size: 1.6rem;
  line-height: 140%;
  font-weight: 400;
  text-align: center;
  color: #707070;
`;

const BizProfileVisit = styled.button`
  color: #8e8f95;
  font-size: 1.4rem;
  line-height: 100%;
  display: flex;
  align-items: center;
  font-weight: 400;
  background-color: transparent;
  margin: 1.6rem 0;
  text-decoration: underline;
`;
