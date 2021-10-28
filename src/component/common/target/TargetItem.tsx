import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { useSetRecoilState } from 'recoil';

import { questionTarget } from '@atom/questionAtom';
import { useAnalytics } from '@src/analytics/faContext';

const StyledTargetItem = styled.button`
  background: #f4f3f8;
  border-radius: 8px;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  :focus {
    background: #c9c9c9;
  }

  justify-content: center;
`;

const TargetTitle = styled.h2`
  font-weight: 700;
  line-height: 120%;
  color: #141414;
  margin-bottom: 8px;
  font-size: 1rem;
`;
const TargetSubtitle = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: #707070;
`;

type TargetItemType = {
  title: string;
  subtitle: string;
  index: number;
};
export default function TargetItem({
  title,
  subtitle,
  index,
}: TargetItemType): JSX.Element {
  const fa = useAnalytics();
  const setTarget = useSetRecoilState(questionTarget);
  const { push } = useNavigator();
  const handleClick = () => {
    fa.logEvent('target_button_click', { target: index + 1 });
    setTarget(index + 1);
    push('/question');
  };
  return (
    <StyledTargetItem onClick={handleClick}>
      <TargetTitle>{title}</TargetTitle>
      <TargetSubtitle>{subtitle}</TargetSubtitle>
    </StyledTargetItem>
  );
}
