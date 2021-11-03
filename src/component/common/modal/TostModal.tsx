import { MouseEvent } from 'react';

import styled from '@emotion/styled';

import { ReactComponent as InfoIcon } from '@config/icon/InfoIcon.svg';

const StyledTostModal = styled.div<{ bottom: string | undefined }>`
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
  font-size: 0.6rem;
  line-height: 120%;
  color: #fff;
  padding: 0.8rem 1.2rem;
  display: flex;
  align-items: center;
  background-color: #272727;
  animation: modal 3s ease-in-out;
  animation-fill-mode: forwards;
  position: fixed;
  bottom: ${({ bottom }) => bottom || '3rem'};
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 99;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  width: 20rem;
`;

const TostText = styled.h4`
  font-size: 0.8rem;
  font-weight: 400;
  margin: 0 8px;
`;

export default function ToastModal({
  onClick,
  text,
  bottom,
}: {
  onClick: (e: MouseEvent) => void;
  text: string;
  bottom?: string;
}): JSX.Element {
  return (
    <StyledTostModal bottom={bottom}>
      <InfoIcon />
      <TostText>{text}</TostText>
    </StyledTostModal>
  );
}
