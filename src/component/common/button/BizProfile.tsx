import styled from '@emotion/styled';
import { useParams } from '@karrotframe/navigator';

import { ReactComponent as ArrowRight } from '@config/icon/arrow_right_24.svg';
import { useAnalytics } from '@src/analytics/faContext';

const StyledBizProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem;
  border: 1px solid #c9c9c9;
  width: 100%;
  border-radius: 8px;
  .biz_profile_left {
    display: flex;
    height: 4rem;
    .biz_profile_left_text {
      margin-left: 1.6rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
`;
const Dot = styled.div`
  background-color: #c4c4c4;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  margin: 0 0.8rem;
`;

const BizProfileTitle = styled.h3`
  color: #141414;
  font-weight: 600;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  line-height: 100%;
  color: #141414;
  margin-bottom: 0.8rem;
`;

const BizProfileSubtitle = styled.h3`
  color: #707070;
  font-size: 1.2rem;
  line-height: 100%;
  font-weight: 400;
`;
const BizProfileImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

export type bizProfileType = {
  name: string;
  imageUrl: string;
  region: string;
  profileUrl: string;
  bizCategory: string;
};

export default function BizProfile({
  name,
  region,
  bizCategory,
  profileUrl,
  imageUrl,
}: bizProfileType): JSX.Element {
  const { surveyId } = useParams<{ surveyId?: string }>();
  if (!surveyId) throw new Error('questionNumber or surveyId none');

  const fa = useAnalytics();

  const handleClickProfile = () => {
    fa.logEvent(`response_home_bizprofile_click`, { surveyId });
    fa.logEvent(`${surveyId}_response_home_bizprofile_click`);
    window.location.href = profileUrl;
  };
  const shortenRegin = region.split(' ');
  return (
    <StyledBizProfile onClick={handleClickProfile}>
      <div className="biz_profile_left">
        <BizProfileImg src={imageUrl} />
        <div className="biz_profile_left_text">
          <BizProfileTitle>
            {`${shortenRegin[shortenRegin.length - 2]} ${
              shortenRegin[shortenRegin.length - 1]
            }`}{' '}
            <Dot /> {bizCategory}
          </BizProfileTitle>
          <BizProfileSubtitle>{name}</BizProfileSubtitle>
        </div>
      </div>
      <ArrowRight />
    </StyledBizProfile>
  );
}
