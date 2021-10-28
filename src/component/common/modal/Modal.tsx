import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

const ModalWrapper = styled.div`
  display: flex;
  z-index: 2;
  position: fixed;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  display: flex;

  align-items: center;
  bottom: 0;
  left: 0;
  z-index: 999999999;
`;

const ModalCover = styled.div<{ isOpen: boolean }>`
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
  width: 80%;
  border-radius: 12px;
  background-color: #ffff;

  animation: ${({ isOpen }) =>
    isOpen ? `modalUp 0.3s ease-in-out` : `modalDown 0.8s ease-in-out`};
  -webkit-box-shadow: 0px 0px 23px 10px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 23px 10px rgba(0, 0, 0, 0.2);
`;

export default function Modal({
  setPopup,
  children,
}: {
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  children?: JSX.Element | JSX.Element[];
}): JSX.Element {
  const [isOpen, setOpen] = useState(true);
  const handleClickOutside = (e: React.MouseEvent) => {
    setOpen(false);
  };
  useEffect(() => {
    if (isOpen === false) setTimeout(() => setPopup(false), 300);
  }, [isOpen, setPopup]);

  return (
    <ModalWrapper onMouseDown={handleClickOutside}>
      <ModalCover onMouseDown={e => e.stopPropagation()} {...{ isOpen }}>
        {children}
      </ModalCover>
    </ModalWrapper>
  );
}
