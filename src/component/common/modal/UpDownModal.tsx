import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

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

const ModalCover = styled.div<{ isOpen: boolean }>`
  @keyframes modalUp {
    from {
      transform: translateY(+100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes modalDown {
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
    isOpen ? `modalUp 0.6s ease-in` : `modalDown 0.6s ease-out`};
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  background-color: white;
`;

export default function UpDownModal({
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
