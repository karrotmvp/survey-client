import styled from '@emotion/styled';

import { targetList } from '@src/config/const/const';

import TargetBriefItem from './TargetBriefItem';
import TargetItem from './TargetItem';

const StyledTargetList = styled.section<{ brief: boolean | undefined }>`
  display: grid;
  grid-template-columns: auto;
  grid-gap: ${({ brief }) => (brief ? ' 1.6rem' : '1.2rem')};
`;

export default function TargetList({
  isKing,
  brief,
}: {
  isKing: boolean;
  brief?: boolean;
}): JSX.Element {
  return (
    <StyledTargetList brief={brief}>
      {targetList.map(({ title, subtitle, imgUrl }, index) =>
        brief ? (
          <TargetBriefItem
            disabled={isKing && index !== 0}
            key={`target${index}`}
            {...{ title, subtitle, index }}
          />
        ) : (
          <TargetItem
            disabled={isKing && index !== 0}
            key={`target${index}`}
            {...{ imgUrl, title, subtitle, index }}
          />
        ),
      )}
    </StyledTargetList>
  );
}
