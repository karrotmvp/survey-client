import styled from '@emotion/styled';
import { useParams, useQueryParams } from '@karrotframe/navigator';

// import { ReactComponent as ArrowRight } from '@config/icon/arrow_right_24.svg';
import { useAnalytics } from '@src/analytics/faContext';

const StyledBizProfile = styled.div<{ coverImageUrls?: boolean }>`
  display: flex;
  align-items: center;
  padding: 1.6rem;
  position: ${({ coverImageUrls }) => (coverImageUrls ? 'absolute' : 'none')};
  bottom: 0;
  width: 100%;
  display: flex;

  ${({ coverImageUrls }) =>
    coverImageUrls ? '' : 'border: 1px solid #f4f4f4; margin-top: 5.6rem;'};

  .biz_profile_left_text {
    margin-left: 1.6rem;
    color: ${({ coverImageUrls }) => (coverImageUrls ? '#fff' : '#141414')};
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
  font-weight: 600;
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  line-height: 100%;
  margin-bottom: 0.8rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const BizProfileSubtitle = styled.h3`
  font-size: 1.4rem;
  line-height: 100%;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;
const BizProfileImg = styled.img`
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 50%;
`;

export type bizProfileType = {
  name: string;
  imageUrl: string;
  region: string;
  profileUrl: string;
  bizCategory: string;
  coverImageUrls?: string[];
};

export default function BizProfile({
  name,
  region,
  bizCategory,
  profileUrl,
  imageUrl,
  coverImageUrls,
}: bizProfileType): JSX.Element {
  const { surveyId } = useParams<{ surveyId?: string }>();
  if (!surveyId) throw new Error('questionNumber or surveyId none');
  const query = useQueryParams<{ ref?: string }>();
  const ref = query.ref || 'app';

  const fa = useAnalytics();

  const handleClickProfile = () => {
    fa.logEvent(`response_home_bizprofile_click`, { surveyId, ref });
    fa.logEvent(`${surveyId}_response_home_bizprofile_click`, { ref });
    window.location.href = profileUrl;
  };
  const shortenRegin = region.split(' ');
  return (
    <StyledBizProfile coverImageUrls={Boolean(coverImageUrls)}>
      <BizProfileImg src={imageUrl} onClick={handleClickProfile} />
      <div className="biz_profile_left_text">
        <BizProfileTitle>
          {`${shortenRegin[shortenRegin.length - 2]} ${
            shortenRegin[shortenRegin.length - 1]
          }`}{' '}
          <Dot /> {bizCategory}
        </BizProfileTitle>
        <BizProfileSubtitle>{name}</BizProfileSubtitle>
      </div>
    </StyledBizProfile>
  );
}
