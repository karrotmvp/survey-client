import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { ReactComponent as clearIcon } from '@config/icon/clear.svg';

const ModalWrapper = styled.div`
  display: flex;
  z-index: 2;
  position: fixed;
  height: 100vh;
  width: 100%;
  background: rgba(20, 20, 20, 0.4);
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  z-index: 999999999;
`;

const ModalCover = styled.div<{ isOpen: boolean; rect: boolean | undefined }>`
  @keyframes modalupY {
    from {
      transform: translateY(+100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes modaldownY {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(+100%);
      opacity: 0;
    }
  }

  width: 100%;
  position: absolute;
  bottom: 0;
  animation: ${({ isOpen }) =>
    isOpen ? `modalupY 0.4s ease-in` : `modaldownY 0.4s ease-out`};
  border-top-right-radius: ${({ rect }) => (rect ? '0' : '15px')};
  border-top-left-radius: ${({ rect }) => (rect ? '0' : '15px')};

  background-color: white;
`;

export default function UpDownModal({
  setPopup,
  children,
  rect,
  close,
  isClose,
}: {
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  children?: JSX.Element | JSX.Element[];
  rect?: boolean;
  close?: boolean;
  isClose?: boolean;
}): JSX.Element {
  const [isOpen, setOpen] = useState(true);
  const handleClickOutside = (e: React.MouseEvent) => {
    setOpen(false);
  };
  useEffect(() => {
    if (isOpen === false) setTimeout(() => setPopup(false), 300);
  }, [isOpen, setPopup]);

  useEffect(() => {
    if (isClose !== undefined && isClose) {
      console.log(isClose);
      setOpen(false);
    }
  }, [isClose]);
  return (
    <ModalWrapper onMouseDown={handleClickOutside}>
      <ModalCover onMouseDown={e => e.stopPropagation()} {...{ isOpen, rect }}>
        {close && <ModalClose onClick={handleClickOutside} />}
        {children}
      </ModalCover>
    </ModalWrapper>
  );
}

const ModalClose = styled(clearIcon)`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 2rem;
  display: block;
`;
