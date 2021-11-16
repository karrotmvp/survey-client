// import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { useRecoilValue } from 'recoil';
// import { useHistory } from 'react-router-dom';

import NavBar from '@component/common/navbar/NavBar';
import { questionTarget } from '@src/atom/questionAtom';
import TargetList from '@src/component/common/target/TargetList';

// import mini from '@src/api/mini';
// import Modal from '@src/component/common/modal/Modal';
// import useSubmit from '@src/hook/useSubmit';

// const CancelButton = styled.button`
//   font-weight: 400;
//   font-size: 14px;
//   line-height: 140%;
//   width: 50%;
//   padding: 1.8rem 0.3rem;
//   background-color: #ffff;
//   color: #141414;
//   border-top: 1px solid #e8e8e8;
//   border-right: 1px solid #e8e8e8;
//   :focus {
//     background-color: #f4f5f6;
//   }
//   border-bottom-left-radius: 12px;
// `;

// const ConfirmButton = styled.button`
//   font-weight: 600;
//   font-size: 14px;
//   line-height: 140%;
//   width: 50%;
//   padding: 1.8rem 0.3rem;
//   background-color: #ffff;
//   color: #141414;
//   border-top: 1px solid #e8e8e8;
//   :focus {
//     background-color: #f4f5f6;
//   }
//   border-bottom-right-radius: 12px;
// `;
// const ConfirmModal = styled.div`
//   width: 100%;
//   font-size: 16px;
//   font-weight: 400;
//   font-size: 16px;
//   line-height: 150%;
//   text-align: center;
//   color: #242424;
//   padding: 0 16px;
//   height: 124px;
//   align-items: center;
//   display: flex;
//   justify-content: center;
// `;

// const ModalTitle = styled.h1`
//   margin-top: 2.6rem;
//   margin-bottom: 1.6rem;
//   font-size: 18px;
//   line-height: 150%;
//   text-align: center;
//   color: #141414;
// `;

// const ModalButtons = styled.div`
//   height: 52px;
// `;
// const ModalImg = styled.img`
//   width: 200px;
//   margin: 0 auto;
// `;
export default function TargetPage(): JSX.Element {
  // const [isPopup, setPopup] = useState(false);
  // const history = useHistory();
  // const alarmPost = useSubmit('/notifications/chat');
  // useEffect(() => {
  //   // eslint-disable-next-line consistent-return

  //   // eslint-disable-next-line consistent-return
  //   const unblock = history.block((location, action) => {
  //     if (location.pathname === '/' && action === 'POP') {
  //       setPopup(true);
  //       return false;
  //     }
  //   });

  //   return () => {
  //     unblock();
  //   };
  // }, [history]);

  // const handleAlarmClose = () => {
  //   alarmPost({ subject: '1차 채팅 알림', notifying: true });
  //   mini.close();
  // };

  // const handleAlarmCancel = () => {
  //   alarmPost({ subject: '1차 채팅 알림', notifying: false });
  //   mini.close();
  // };
  const { push } = useNavigator();
  const target = useRecoilValue(questionTarget);
  const isKing = true;

  return (
    <>
      <NavBar type="BACK" title="설문 대상 선택" />
      <StyledTargetPage>
        <div>
          {isKing ? (
            <TargetTitle>
              사장님은 <b>단골왕 사장님!</b> <br /> 설문 대상을 선택해 보세요
            </TargetTitle>
          ) : (
            <TargetTitle>
              사장님, 우리 동네 이웃에게 <br /> 설문을 돌려보세요
            </TargetTitle>
          )}
          <TargetKingButton>단골왕 혜택</TargetKingButton>
        </div>

        <TargetList />
      </StyledTargetPage>
      <NextButton
        disabled={target === -1}
        onClick={() => push('/survey/create/question')}
      >
        다음
      </NextButton>
      {/* {isPopup && (
        <Modal setPopup={setPopup}>
          <ModalTitle>나중에 채팅받기</ModalTitle>
          <ModalImg src="./img/alarmImg.png" />
          <ConfirmModal>
            설문 내용이 떠오르지 않나요?
            <br />
            언제든 만들 수 있도록 링크를
            <br />
            채팅으로 보내드려요
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
      )} */}
    </>
  );
}

const StyledTargetPage = styled.section`
  background: #ffff;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 5.6rem);
  padding: 8rem 1.6rem 4.8rem 1.6rem;
`;

const TargetKingButton = styled.button`
  padding: 0.8rem 1rem;
  color: ${({ theme }) => theme.color.neutralBlack.text};
  border: 1px solid #d8d8d8;
  font-size: 1.3rem;
  line-height: 100%;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  border-radius: 2.1rem;
  background-color: transparent;
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

const TargetTitle = styled.h1`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: 2.2rem;
  line-height: 140%;
  color: ${({ theme }) => theme.color.neutralBlack.main};
  margin-bottom: 0.8rem;
`;
