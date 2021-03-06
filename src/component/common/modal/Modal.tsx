import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { ReactComponent as clearIcon } from '@config/icon/clear.svg';

const ModalWrapper = styled.div<{ paddingSide: string | undefined }>`
  display: flex;
  z-index: 2;
  position: fixed;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  display: flex;
  padding: ${({ paddingSide }) =>
    paddingSide ? `0 ${paddingSide}` : '0 2.4rem'};
  align-items: center;
  bottom: 0;
  left: 0;
  z-index: 999999999;
`;

const ModalCover = styled.div<{ isOpen: boolean; transparent?: boolean }>`
  @keyframes modalUp {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes modalDown {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  border-radius: 12px;
  background-color: ${({ transparent }) =>
    transparent ? 'transparent' : '#ffff'};
  animation: ${({ isOpen }) =>
    isOpen ? `modalUp 0.3s ease-in-out` : `modalDown 0.8s ease-in-out`};
  ${({ transparent }) =>
    transparent
      ? ''
      : `  -webkit-box-shadow: 0px 0px 23px 10px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 23px 10px rgba(0, 0, 0, 0.2);`};
`;

export default function Modal({
  setPopup,
  paddingSide,
  children,
  close,
  transparent,
}: {
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  children?: JSX.Element | JSX.Element[];
  paddingSide?: string;
  close?: boolean;
  transparent?: boolean;
}): JSX.Element {
  const [isOpen, setOpen] = useState(true);
  const handleClickOutside = (e: React.MouseEvent) => {
    setOpen(false);
  };
  useEffect(() => {
    if (isOpen === false) setTimeout(() => setPopup(false), 300);
  }, [isOpen, setPopup]);

  return (
    <ModalWrapper onMouseDown={handleClickOutside} paddingSide={paddingSide}>
      <ModalCover
        transparent={transparent}
        onMouseDown={e => e.stopPropagation()}
        {...{ isOpen }}
      >
        {close && (
          <ModalClose transparent={transparent} onClick={handleClickOutside} />
        )}
        {children}
      </ModalCover>
    </ModalWrapper>
  );
}

const ModalClose = styled(clearIcon)<{ transparent?: boolean }>`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 2rem;
  display: block;
  z-index: 9999999;
  color: ${({ transparent }) => (transparent ? '#ffff' : 'black')};
`;
