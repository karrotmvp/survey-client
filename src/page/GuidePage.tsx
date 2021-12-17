import styled from '@emotion/styled';
import { useNavigator, useQueryParams } from '@karrotframe/navigator';

import { ReactComponent as ArrowRight } from '@config/icon/arrow_right.svg';
import NavBar from '@src/component/common/navbar/NavBar';

const StyledGuidePage = styled.section`
  height: 100vh;
  overflow: scroll;
  .guide_wrapper {
    position: relative;
    button {
      border: 1px solid #707070;
      border-radius: 8px;
      position: absolute;
      background: transparent;
      padding: 1rem 3.4rem;
      top: 29%;
      left: 50%;
      z-index: 999;
      transform: translate(-50%, 0);
      display: flex;
      align-items: center;
      font-size: 1.3rem;
      font-weight: ${({ theme }) => theme.fontWeight.regular};
      color: ${({ theme }) => theme.color.neutralBlack.text};
    }
  }
`;

const ArrowIcon = styled(ArrowRight)`
  height: 1.6rem;
`;

const StyledGuideImg = styled.img`
  width: 100%;
`;

export default function GuidePage(): JSX.Element {
  const { _si } = useQueryParams<{ _si: string }>();

  const { push } = useNavigator();
  return (
    <StyledGuidePage>
      <div className="guide_wrapper">
        <NavBar type={_si === '0' ? 'CLOSE' : 'BACK'} transparent white />
        <StyledGuideImg src="./img/guideImg.png" />
        <button
          onClick={() => {
            push('/example');
          }}
        >
          예시 보러가기 <ArrowIcon />
        </button>
      </div>
    </StyledGuidePage>
  );
}
