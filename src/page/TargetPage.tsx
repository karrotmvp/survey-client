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

const StyledTargetArticle = styled.article`
  margin-top: 2.2rem;
  width: 100%;
  height: 0;
  padding-top: calc(228 / 328 * 100%);
  background: url('./img/targetImg.png') center center / cover no-repeat;
  position: relative;
  border-radius: 4px;
  margin-bottom: 32px;
`;

const CancelButton = styled.button`
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  width: 50%;
  height: 51px;
  background-color: #ffff;
  color: #141414;
  border-top: 1px solid #e8e8e8;
  border-right: 1px solid #e8e8e8;
  :focus {
    background-color: #f4f5f6;
  }
`;

const ConfirmButton = styled.button`
  font-weight: 600;
  font-size: 14px;
  line-height: 140%;
  width: 50%;
  height: 52px;
  background-color: #ffff;
  color: #141414;
  border-top: 1px solid #e8e8e8;
  :focus {
    background-color: #f4f5f6;
  }
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
  margin-bottom: 29px;
`;

const ModalTitle = styled.h1`
  margin: 20px 0;
  font-size: 18px;
  line-height: 150%;
  text-align: center;
  color: #141414;
`;
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
        <StyledTargetArticle></StyledTargetArticle>
        <TargetList />
      </StyledTargetPage>
      {isPopup && (
        <Modal setPopup={setPopup}>
          <ModalTitle>나중에 알림받기</ModalTitle>
          <ModalImg src="./img/alarmImg.png" />
          <ConfirmModal>
            지금 질문이 생각나지 않으신가요?
            <br />
            나중에 알림받기를 신청하면
            <br />
            설문 제작할 수 있는 링크를 보내드려요!
          </ConfirmModal>

          <div>
            <CancelButton onClick={handleAlarmCancel}>취소</CancelButton>
            <ConfirmButton onClick={handleAlarmClose}>
              나중에 알림받기
            </ConfirmButton>
          </div>
        </Modal>
      )}
    </>
  );
}
