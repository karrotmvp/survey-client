import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { useRecoilValueLoadable } from 'recoil';

import { ReactComponent as ShareIcon } from '@config/icon/share.svg';
import { useAnalytics } from '@src/analytics/faContext';
import { getBizProfile, getBriefUrls } from '@src/api/authorization';
import mini from '@src/api/mini';
import NavBar from '@src/component/common/navbar/NavBar';
import { useShowEvent } from '@src/hook/useShowEvent';

const StyledEndPage = styled.section`
  background-color: #ffffff;
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
  margin-top: 5.6rem;
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
  padding: 16px 0;
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
  font-size: 1.4rem;
  line-height: 120%;
  text-align: center;
  background-color: transparent;
  text-decoration-line: underline;
  color: #707070;
  margin-left: auto;
  border-radius: 8px;
`;

const CompleteImg = styled.img`
  width: 100%;
`;

export default function EndPage(): JSX.Element {
  const { replace } = useNavigator();
  const fa = useAnalytics();
  const url = useRecoilValueLoadable(getBriefUrls);
  const userData = useRecoilValueLoadable(getBizProfile);
  const goFeedBack = () => {
    fa.logEvent('complete_gofeedback_button_click');
    replace('/feedback');
  };
  useShowEvent('complete_survey_show');
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
        text: `${userData.contents.name} ???????????? ????????? ???????????????! \n???????????? ????????? ?????? ????????? ??? ????????? ?????? ???? \n \n(?????? ?????? ????????? ????????? ???????????? ??? ?????????)\n`,
      });
    }
  };

  // useEffect(
  //   () => () => {
  //     if (history.action === 'POP') {
  //       history.go(-4);
  //     }
  //   },
  //   [history],
  // );

  return (
    <>
      <StyledEndPage>
        <section>
          <NavBar type="BACK" transparent />
          <CompleteImg src="./../../img/surveyComplete.png" />
          <EndTitle>?????? ?????? ?????? ????</EndTitle>

          <EndText>
            ?????? ????????? ???????????? ?????? ???????????? <br />
            ????????? ???????????????!
          </EndText>
        </section>
        <section>
          <EndButton onClick={handleShareClick}>
            <ShareIcon />
            ????????????
          </EndButton>
          <FeedBackButton onClick={goFeedBack}>
            ?????? ????????? ????????? ?????????
          </FeedBackButton>
        </section>
      </StyledEndPage>
    </>
  );
}
