import styled from '@emotion/styled';

import { targetList } from '@src/config/const/const';

import TargetItem from './TargetItem';

const StyledTargetList = styled.section`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 1.2rem;
  height: 40vh;
`;

export default function TargetList(): JSX.Element {
  return (
    <StyledTargetList>
      {targetList.map(({ title, subtitle }, index) => (
        <TargetItem key={index} {...{ title, subtitle, index }} />
      ))}
    </StyledTargetList>
  );
}
