import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import { questionTarget } from '@atom/questionAtom';
import { useAnalytics } from '@src/analytics/faContext';

const StyledTargetItem = styled.button`
  background: #f8f8f8;
  border-radius: 8px;
  padding: 2rem 1.5rem;
  display: flex;
  width: 100%;
  :disabled {
    opacity: 0.4;
  }
  &[aria-selected='true'] {
    background: #fedecc;
  }
  .target_text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
  .target_img {
    width: 6.2rem;
    margin-right: 1.2rem;
  }
`;

const TargetTitle = styled.h2`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 120%;
  color: #141414;
  margin-bottom: 6px;
  font-size: 1.6rem;
`;
const TargetSubtitle = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: 1.4rem;
  color: #707070;
`;

type TargetItemType = {
  title: string;
  subtitle: string;
  index: number;
  imgUrl: string;
  disabled: boolean;
};
export default function TargetItem({
  title,
  subtitle,
  index,
  imgUrl,
  disabled,
}: TargetItemType): JSX.Element {
  const fa = useAnalytics();
  const [target, setTarget] = useRecoilState(questionTarget);
  const handleClick = () => {
    fa.logEvent('target_button_click', { target: index + 1 });
    if (target === index + 1) setTarget(-1);
    else setTarget(index + 1);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <StyledTargetItem
        disabled={disabled}
        onClick={handleClick}
        aria-selected={target === index + 1}
      >
        <img className="target_img" src={imgUrl} />
        <div className="target_text">
          <TargetTitle>{title}</TargetTitle>
          <TargetSubtitle>
            {subtitle.split('\n').map((txt, idx) => (
              <SplitText key={idx} txt={txt} />
            ))}
          </TargetSubtitle>
        </div>
      </StyledTargetItem>
      {index === -1 && <CustomerKingTag>단골왕 사장님만</CustomerKingTag>}
    </div>
  );
}

const CustomerKingTag = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  border-bottom-right-radius: 4px;
  padding: 0.8rem 0.6rem;
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.primaryOrange};
  background-color: ${({ theme }) => theme.color.primaryOrangeLight};
  opacity: 1;
`;

function SplitText({ txt }: { txt: string }): JSX.Element {
  return (
    <>
      {txt}
      <br />
    </>
  );
}
