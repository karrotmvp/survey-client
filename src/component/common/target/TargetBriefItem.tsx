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
  justify-content: space-between;
  align-items: center;
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
  font-size: 1.5rem;
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
  disabled: boolean;
};

const RadioButton = styled.input`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: url('./../../img/radio_unchecked.png') center center / cover
    no-repeat;
  &:checked {
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    background: url('./../../img/radio_checked.png') center center / cover
      no-repeat;
  }
`;
export default function TargetBriefItem({
  title,
  subtitle,
  index,
  disabled,
}: TargetItemType): JSX.Element {
  const fa = useAnalytics();
  const [target, setTarget] = useRecoilState(questionTarget);
  const handleClick = () => {
    fa.logEvent('target_button_click', { target: index + 1 });
    setTarget(index + 1);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <StyledTargetItem
        disabled={disabled}
        onClick={handleClick}
        aria-selected={target === index + 1}
      >
        <div className="target_text">
          <TargetTitle>{title}</TargetTitle>
          <TargetSubtitle>{subtitle}</TargetSubtitle>
        </div>
        <RadioButton type="radio" checked={target === index + 1} />
      </StyledTargetItem>
      {index === -1 && <CustomerKingTag>단골왕 사장님만</CustomerKingTag>}
    </div>
  );
}

const CustomerKingTag = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  border-bottom-right-radius: 4px;
  padding: 0.8rem 0.6rem;
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.primaryOrange};
  background-color: ${({ theme }) => theme.color.primaryOrangeLight};
  opacity: 1;
`;
