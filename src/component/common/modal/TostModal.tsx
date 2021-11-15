import { useEffect } from 'react';

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
  font-size: 1.3rem;
  line-height: 120%;
  color: #fff;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #272727;
  animation: modal 3s ease-in-out;
  animation-fill-mode: forwards;
  position: fixed;
  bottom: ${({ bottom }) => bottom || ''};
  top: 3rem;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 99;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  width: 31.2rem;
  z-index: 999999999;
`;

const ToastText = styled.h4`
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0 8px;
`;

const ToastIcon = styled(InfoIcon)`
  width: 1.6rem;
`;

export default function ToastModal({
  text,
  bottom,
  isToastOpen,
  setToastOpen,
  time,
}: {
  isToastOpen: boolean;
  setToastOpen: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  bottom?: string;
  time: number;
}): JSX.Element {
  const handleAlert = () => {
    setTimeout(() => {
      setToastOpen(false);
    }, time);
  };

  useEffect(() => {
    if (isToastOpen) handleAlert();
  }, [isToastOpen]);

  return (
    <>
      {isToastOpen && (
        <StyledTostModal bottom={bottom}>
          <ToastIcon />
          <ToastText>{text}</ToastText>
        </StyledTostModal>
      )}
    </>
  );
}
