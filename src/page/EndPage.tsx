import { useEffect } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { useHistory } from 'react-router-dom';

import { useAnalytics } from '@src/analytics/faContext';
import mini from '@src/api/mini';
import NavBar from '@src/component/common/navbar/NavBar';

const StyledEndPage = styled.section`
  background-color: #ffff;
  width: 100%;
  height: 100vh;
  padding: 5.5rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const EndTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.fontFamily.title};
  color: ${({ theme }) => theme.color.primaryOrange};

  line-height: 140%;
  margin-bottom: 1rem;
`;

const EndText = styled.span`
  color: #141414;
  font-weight: 400;
  margin-bottom: 2rem;
  line-height: 160%;
`;

const EndButton = styled.button`
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  line-height: 120%;
  padding: 15px 0;
  background-color: ${({ theme }) => theme.color.primaryOrange};
  color: #fff;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const FeedBackButton = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 16px;
  line-height: 120%;
  text-align: center;
  background-color: transparent;
  text-decoration-line: underline;
  color: #707070;
  margin-left: auto;
  border-radius: 8px;
  margin-bottom: 50px;
`;

export default function EndPage(): JSX.Element {
  const { replace } = useNavigator();
  const fa = useAnalytics();
  const history = useHistory();
  const goFeedBack = () => {
    fa.logEvent('complete_gofeedback_button_click');
    replace('/feedback');
  };

  const closeMini = () => {
    fa.logEvent('complete_like_button_click');
    mini.close();
  };

  useEffect(
    () => () => {
      if (history.action === 'POP') {
        history.go(-4);
      }
    },
    [history],
  );
  return (
    <StyledEndPage>
      <section>
        <NavBar type="CLOSE" />
        <EndTitle>설문 제작 완료 🎉</EndTitle>

        <EndText>
          만드신 설문은 고객님께 실제 발행될 예정이에요!
          <br />
          답변이 충분히 모이면 알림을 보내드릴게요.
        </EndText>
      </section>
      <section>
        <EndButton onClick={closeMini}>좋아요</EndButton>
        <FeedBackButton onClick={goFeedBack}>
          무따 서비스 피드백 남기기
        </FeedBackButton>
      </section>
    </StyledEndPage>
  );
}
