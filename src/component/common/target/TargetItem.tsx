import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { useSetRecoilState } from 'recoil';

import { questionTarget } from '@atom/questionAtom';

const StyledTargetItem = styled.button`
  background: #f4f3f8;
  border-radius: 12px;
  padding: 0.8rem 1rem;
  display: flex;
  flex-direction: column;
  :focus {
    background: #c9c9c9;
  }
`;

const TargetTitle = styled.h2`
  font-weight: 700;
  line-height: 160%;
  color: #141414;
  margin-bottom: 8px;
`;
const TargetSubtitle = styled.span`
  font-weight: 400;
  font-size: 0.8rem;
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
  const setTarget = useSetRecoilState(questionTarget);
  const { push } = useNavigator();
  const handleClick = () => {
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
