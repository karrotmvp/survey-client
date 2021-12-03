import { useEffect } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { useHistory } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';

import { ReactComponent as ShareIcon } from '@config/icon/share.svg';
import { useAnalytics } from '@src/analytics/faContext';
import { getBizprofile, getBriefUrls } from '@src/api/authorization';
import mini from '@src/api/mini';
import NavBar from '@src/component/common/navbar/NavBar';

// import useLoadableGet from '@src/hook/useLoadableGet';

const StyledEndPage = styled.section`
  background-color: #ffff;
  width: 100%;
  height: 100vh;
  padding: 7.7rem 1.6rem 1.6rem 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const EndTitle = styled.h1`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.primaryOrange};
  text-align: center;
  line-height: 140%;
  margin-bottom: 2rem;
  margin-top: 3.2rem;
`;

const EndText = styled.span`
  color: #707070;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  line-height: 160%;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const EndButton = styled.button`
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 1.6rem;
  line-height: 120%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  background-color: ${({ theme }) => theme.color.primaryOrange};
  color: #fff;
  border-radius: 8px;
  svg {
    margin-right: 0.4rem;
  }
`;

const FeedBackButton = styled.button`
  width: 100%;
  padding: 1.6rem;
  font-size: 1.6rem;
  line-height: 120%;
  text-align: center;
  background-color: transparent;
  text-decoration-line: underline;
  color: #707070;
  margin-left: auto;
  border-radius: 8px;
`;

// const ShareButton = styled.button`
//   color: ${({ theme }) => theme.color.primaryOrange};
//   font-size: 1.6rem;
//   font-weight: ${({ theme }) => theme.fontWeight.regular};
//   padding: 0.4rem;
//   background-color: transparent;
//   display: flex;
//   align-items: center;
//   svg {
//     margin-right: 0.4rem;
//   }
// `;

const CompleteImg = styled.img`
  width: 100%;
`;

export default function EndPage(): JSX.Element {
  const { replace } = useNavigator();
  const fa = useAnalytics();
  const history = useHistory();
  const url = useRecoilValueLoadable(getBriefUrls);
  const userData = useRecoilValueLoadable(getBizprofile);
  const goFeedBack = () => {
    fa.logEvent('complete_gofeedback_button_click');
    replace('/feedback');
  };

  const handleShareClick = () => {
    fa.logEvent('complete_share_button_click');
    if (
      url.state === 'hasValue' &&
      url.contents &&
      userData.state === 'hasValue' &&
      userData.contents !== ''
    ) {
      mini.share({
        url: url.contents.shortUrl,
        text: `${userData.contents.name} 사장님이 설문을 만드셨어요! 여러분의 의견이 매장 개선에 큰 도움이 되요 😊`,
      });
    }
  };

  // const closeMini = () => {
  //   fa.logEvent('complete_like_button_click');
  //   mini.close();
  // };

  useEffect(
    () => () => {
      if (history.action === 'POP') {
        history.go(-4);
      }
    },
    [history],
  );

  return (
    <>
      <StyledEndPage>
        <section>
          <NavBar type="BACK" />
          <CompleteImg src="./../../img/surveyComplete.png" />
          <EndTitle>설문 제작 완료 🎉</EndTitle>

          <EndText>
            만드신 설문은 고객님께 발행될 예정이에요!
            <br />
            답변이 충분히 모이면 무따가 알림을 보내드릴게요.
          </EndText>
        </section>
        <section>
          <EndButton onClick={handleShareClick}>
            <ShareIcon />
            공유하기
          </EndButton>
          <FeedBackButton onClick={goFeedBack}>
            무따 서비스 피드백 남기기
          </FeedBackButton>
        </section>
      </StyledEndPage>
    </>
  );
}
