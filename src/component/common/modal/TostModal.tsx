import { MouseEvent } from 'react';

import styled from '@emotion/styled';

import { ReactComponent as InfoIcon } from '@config/icon/InfoIcon.svg';

const StyledTostModal = styled.div`
  @keyframes modal {
    0% {
      transform: translate(-50%, 100%);
      opacity: 0;
    }
    20% {
      transform: translate(-50%, 0);
      opacity: 1;
    }

    70% {
      transform: translate(-50%, 0);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, 100%);
      opacity: 0;
    }
  }
  font-size: 1rem;
  font-weight: 400;
  color: #fff;
  padding: 1rem 1.2rem;
  display: flex;
  align-items: center;
  width: fit-content;
  background-color: #272727;
  animation: modal 1.5s ease-in-out;
  animation-fill-mode: forwards;
<<<<<<< HEAD
  position: absolute;
=======
  position: fixed;
>>>>>>> 737c1477dd62e01db2aded6967e9e80f1bb8f5f3
  bottom: 3rem;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 99;
`;

const TostText = styled.h4`
  font-size: 0.8rem;
  font-weight: 400;
  margin: 0 8px;
`;

export default function TostModal({
  onClick,
  text,
}: {
  onClick: (e: MouseEvent) => void;
  text: string;
}): JSX.Element {
  return (
    <StyledTostModal>
      <InfoIcon />
      <TostText>{text}</TostText>
    </StyledTostModal>
  );
}
