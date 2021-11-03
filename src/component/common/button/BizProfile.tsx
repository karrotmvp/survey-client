import styled from '@emotion/styled';

import { ReactComponent as ArrowRight } from '@config/icon/arrow_right_24.svg';

const StyledBizProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #f4f4f4;
  width: 100%;
  border-radius: 8px;
  .biz_profile_left {
    display: flex;

    .biz_profile_left_text {
      margin-left: 1rem;
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
  margin: 0 8px;
`;

const BizProfileTitle = styled.h3`
  color: #141414;
  margin: 6px 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 100%;
  color: #141414;
`;

const BizProfileSubtitle = styled.h3`
  color: #707070;
  font-size: 0.8rem;
  line-height: 100%;
  font-weight: 400;
`;
const BizProfileImg = styled.img`
  width: 40px;
  height: 40px;
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
  const handleClickProfile = () => {
    window.location.href = profileUrl;
  };
  return (
    <StyledBizProfile onClick={handleClickProfile}>
      <div className="biz_profile_left">
        <BizProfileImg src={imageUrl} />
        <div className="biz_profile_left_text">
          <BizProfileTitle>
            {region} <Dot /> {bizCategory}
          </BizProfileTitle>
          <BizProfileSubtitle>{name} 사장님의 설문</BizProfileSubtitle>
        </div>
      </div>
      <ArrowRight />
    </StyledBizProfile>
  );
}
