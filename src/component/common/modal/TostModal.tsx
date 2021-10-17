import { MouseEvent } from 'react';

import styled from '@emotion/styled';

import { ReactComponent as DeleteIcon } from '@config/icon/clear.svg';
import { ReactComponent as InfoIcon } from '@config/icon/info.svg';

const StyledTostModal = styled.div`
  @keyframes modalUp {
    from {
      transform: translateY(+375px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  color: #fff;
  padding: 8px 18px;
  display: flex;
  align-items: center;
  width: fit-content;
  background-color: #272727;
  animation: modalUp 0.3s ease-in-out;
  position: fixed;
  bottom: 3rem;
  left: 50%;
  transform: translate(-50%, 0);

  path {
    stroke: #fff;
    fill: #fff;
  }
`;

const TostText = styled.h4`
  font-size: 0.8rem;
  font-weight: 400;
  margin: 0 8px;
`;

export default function TostModal({
  onClick,
}: {
  onClick: (e: MouseEvent) => void;
}): JSX.Element {
  return (
    <StyledTostModal>
      <InfoIcon />
      <TostText>질문은 3개 이하까지 만들 수 있어요</TostText>
      <DeleteIcon onClick={onClick} />
    </StyledTostModal>
  );
}
