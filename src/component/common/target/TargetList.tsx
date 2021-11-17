import styled from '@emotion/styled';

import { targetList } from '@src/config/const/const';

import TargetItem from './TargetItem';

const StyledTargetList = styled.section`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 1.2rem;
`;

export default function TargetList({
  isKing,
}: {
  isKing: boolean;
}): JSX.Element {
  return (
    <StyledTargetList>
      {targetList.map(({ title, subtitle, imgUrl }, index) => (
        <TargetItem
          disabled={!isKing && index !== 0}
          key={`target${index}`}
          {...{ imgUrl, title, subtitle, index }}
        />
      ))}
    </StyledTargetList>
  );
}
