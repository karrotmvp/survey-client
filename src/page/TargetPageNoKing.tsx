import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import NavBar from '@component/common/navbar/NavBar';
import mini from '@src/api/mini';
import { questionTarget } from '@src/atom/questionAtom';
import Modal from '@src/component/common/modal/Modal';
import TargetList from '@src/component/common/target/TargetList';
import useSubmit from '@src/hook/useSubmit';

const StyledTargetPage = styled.section`
  background: #ffff;
  width: 100%;
  height: 100vh;
  padding: 8rem 1.6rem 1.6rem 1.6rem;
`;

const TargetImg = styled.div`
  width: 100%;
  height: 0;
  padding-top: calc(228 / 328 * 100%);
  background: url('../../img/targetImg.png') center center / cover no-repeat;
  position: relative;
  border-radius: 4px;
  margin-bottom: 3.2rem;
`;

const NextButton = styled.button`
  height: 5.6rem;
  width: 100%;
  font-size: 1.7rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.primaryOrange};
  color: #ffff;
  :disabled {
    background-color: ${({ theme }) => theme.color.neutralBlack.disabled};
  }
`;

const CancelButton = styled.button`
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  width: 50%;
  padding: 1.8rem 0.3rem;
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
  padding: 1.8rem 0.3rem;
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
`;

const ModalTitle = styled.h1`
  margin-top: 2.6rem;
  margin-bottom: 1.6rem;
  font-size: 18px;
  line-height: 150%;
  text-align: center;
  color: #141414;
`;

const ModalButtons = styled.div`
  height: 52px;
`;
const ModalImg = styled.img`
  width: 200px;
  margin: 0 auto;
`;
export default function TargetPageNoKing(): JSX.Element {
  const [isPopup, setPopup] = useState(false);
  const history = useHistory();
  const alarmPost = useSubmit('/notifications/chat');
  const { push } = useNavigator();
  const target = useRecoilValue(questionTarget);
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
        <TargetList isKing={true} />
        <NextButton
          disabled={target === -1}
          onClick={() => push('/survey/create/question')}
        >
          다음{' '}
        </NextButton>
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
