import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

import NavBar from '@component/common/navbar/NavBar';
import mini from '@src/api/mini';
import Modal from '@src/component/common/modal/Modal';
import TargetList from '@src/component/common/target/TargetList';
import useSubmit from '@src/hook/useSubmit';

const StyledTargetPage = styled.section`
  background: #ffff;
  width: 100%;
  height: 100vh;
  padding: 3.5rem 1rem 1rem 1rem;
  overflow-y: scroll;
`;

const TargetImg = styled.div`
  margin-top: 2.2rem;
  width: 100%;
  height: 0;
  padding-top: calc(228 / 328 * 100%);
  background: url('../../img/targetImg.png') center center / cover no-repeat;
  position: relative;
  border-radius: 4px;
  margin-bottom: 32px;
`;

const CancelButton = styled.button`
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  width: 50%;
  padding: 1.2rem 0.2rem;
  background-color: #ffff;
  color: #141414;
  border-top: 1px solid #e8e8e8;
  border-right: 1px solid #e8e8e8;
  :focus {
    background-color: #f4f5f6;
  }
  border-bottom-left-radius: 12px;
`;

const ConfirmButton = styled.button`
  font-weight: 600;
  font-size: 14px;
  line-height: 140%;
  width: 50%;
  padding: 1.2rem 0.2rem;
  background-color: #ffff;
  color: #141414;
  border-top: 1px solid #e8e8e8;
  :focus {
    background-color: #f4f5f6;
  }
  border-bottom-right-radius: 12px;
`;
const ConfirmModal = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #242424;
  padding: 0 16px;
  height: 124px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h1`
  margin: 20px 0;
  font-size: 18px;
  line-height: 150%;
  text-align: center;
  color: #141414;
`;

const ModalButtons = styled.div``;
const ModalImg = styled.img`
  width: 150px;
  margin: 0 auto;
`;
export default function TargetPage(): JSX.Element {
  const [isPopup, setPopup] = useState(false);
  const history = useHistory();
  const alarmPost = useSubmit('/notifications/chat');
  useEffect(() => {
    // eslint-disable-next-line consistent-return

    // eslint-disable-next-line consistent-return
    const unblock = history.block((location, action) => {
      if (location.pathname === '/' && action === 'POP') {
        setPopup(true);
        return false;
      }
    });

    return () => {
      unblock();
    };
  }, [history]);

  const handleAlarmClose = () => {
    alarmPost({ subject: '1차 채팅 알림', notifying: true });
    mini.close();
  };

  const handleAlarmCancel = () => {
    alarmPost({ subject: '1차 채팅 알림', notifying: false });
    mini.close();
  };

  return (
    <>
      <NavBar type="BACK" title="설문 고객 선택" />
      <StyledTargetPage>
        <TargetImg />
        <TargetList />
      </StyledTargetPage>
      {isPopup && (
        <Modal setPopup={setPopup}>
          <ModalTitle>나중에 채팅받기</ModalTitle>
          <ModalImg src="./img/alarmImg.png" />
          <ConfirmModal>
            설문 내용이 떠오르지 않나요?
            <br />
            언제든 만들 수 있도록
            <br />
            링크를 채팅으로 보내드려요
          </ConfirmModal>

          <ModalButtons>
            <CancelButton onClick={handleAlarmCancel}>
              알림받지 않고 나가기
            </CancelButton>
            <ConfirmButton onClick={handleAlarmClose}>
              나중에 채팅받기
            </ConfirmButton>
          </ModalButtons>
        </Modal>
      )}
    </>
  );
}
