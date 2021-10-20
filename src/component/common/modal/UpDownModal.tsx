import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { ReactComponent as clearIcon } from '@config/icon/clear.svg';

const ModalClose = styled(clearIcon)`
  position: absolute;
  top: 15px;
  right: 10px;
  font-size: 2rem;
  display: block;
`;
const ModalWrapper = styled.div`
  display: flex;
  z-index: 2;
  position: fixed;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
`;

const ModalCover = styled.div<{ isOpen: boolean }>`
  @keyframes modalUp {
    from {
      transform: translateY(+100%);
      opacity: 1;
    }
    to {
      transform: translateY(0);
      opacity: 0;
    }
  }
  @keyframes modalDown {
    from {
      transform: translateY(0);
      opacity: 0;
    }
    to {
      transform: translateY(+100%);
      opacity: 1;
    }
  }

  width: 100%;
  position: absolute;
  bottom: 0;
  animation: ${({ isOpen }) =>
    isOpen ? `modalUp 0.3s ease-in-out` : `modalDown 0.8s ease-in-out`};
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  background-color: white;

  -webkit-box-shadow: 0px 0px 23px 10px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 23px 10px rgba(0, 0, 0, 0.2);
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
        <ModalClose onClick={handleClickOutside} />
        {children}
      </ModalCover>
    </ModalWrapper>
  );
}
