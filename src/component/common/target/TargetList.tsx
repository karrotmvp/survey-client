import styled from '@emotion/styled';

import TargetItem from './TargetItem';

const StyledTargetList = styled.section`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 12px;
  margin-top: 2rem;
`;

const targetlist = [
  { title: '모든 고객님', subtitle: '매장 동네 근처 모든 고객님' },
  {
    title: '비즈 프로필을 방문한 고객님',
    subtitle: '사장님의 비즈 프로필을 방문한 고객님',
  },
  { title: '단골', subtitle: '사장님의 비즈 프로필을 단골로 추가한 고객님' },
];

export default function TargetList(): JSX.Element {
  return (
    <StyledTargetList>
      {targetlist.map(({ title, subtitle }, index) => (
        <TargetItem {...{ title, subtitle, index }} />
      ))}
    </StyledTargetList>
  );
}