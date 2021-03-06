// import { useEffect, useState } from 'react';
import { useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';

// import { useHistory } from 'react-router-dom';

import NavBar from '@component/common/navbar/NavBar';
import { getBizProfile } from '@src/api/authorization';
import { questionTarget } from '@src/atom/questionAtom';
import Modal from '@src/component/common/modal/Modal';
import TargetList from '@src/component/common/target/TargetList';

export default function TargetPage(): JSX.Element {
  const [isPopup, setPopup] = useState(false);
  const userData = useRecoilValueLoadable(getBizProfile);
  const { push } = useNavigator();
  const target = useRecoilValue(questionTarget);
  const isKing =
    userData.state === 'hasValue' &&
    userData.contents !== '' &&
    userData.contents.followersCount < 50;

  return (
    <>
      <NavBar type="BACK" title="설문 대상 선택" />
      <StyledTargetPage>
        <div>
          {!isKing ? (
            <TargetTitle>
              사장님은 <b>단골왕 사장님!</b> <br /> 설문 대상을 선택해 보세요
            </TargetTitle>
          ) : (
            <TargetTitle>
              사장님, 우리 동네 이웃에게 <br /> 설문을 돌려보세요
            </TargetTitle>
          )}
          <TargetKingButton
            onClick={() => {
              setPopup(true);
            }}
          >
            단골왕 혜택
          </TargetKingButton>
        </div>

        <TargetList isKing={isKing} />
      </StyledTargetPage>
      <NextButton
        disabled={target === -1}
        onClick={() => push('/survey/create/question')}
      >
        다음
      </NextButton>
      {isPopup && (
        <Modal setPopup={setPopup} close>
          <StyledModal>
            <h1 className="target_modal_title">단골왕 사장님이란?</h1>
            <h3 className="target_modal_subtitle">
              단골 수 100명 이상 사장님은 <br /> 단골왕이 될 수 있어요
            </h3>
            <TargetModalImg />
            <h3 className="target_modal_subtitle subtitle_biz">
              비즈프로필 소식을 쓰면 우리 매장 단골이 늘어요
            </h3>
            <button
              onClick={() => {
                window.location.href = userData.contents.profileUrl;
              }}
              className="target_modal_biz_button subtitle_biz target_modal_subtitle"
            >
              비즈프로필 소식 쓰러 가기
            </button>
          </StyledModal>
        </Modal>
      )}
    </>
  );
}

// const TargetKingSection = styled.section`
// border-radius: 8px;
// background-color: ${( { theme } ) => theme.color.primaryOrangeLight};

// .target_modal_section_title {
// font-family: ${( { theme } ) => theme.fontFamily.title};
// font-size: 1.5rem;
//     color: ${( { theme } ) => theme.color.primaryOrange};
//     font-weight: ${( { theme } ) => theme.fontWeight.bold};
// }
// `

const TargetModalImg = styled.section`
  width: 100%;
  height: 0;
  padding-top: calc(224 / 264 * 100%);
  background: url('../../img/targetKingImg.png') center center / cover no-repeat;
  position: relative;
  margin-bottom: 2.2rem;
  margin-top: 2rem;
  border-radius: 4px;
`;

const StyledModal = styled.div`
  padding: 3.6rem 2.4rem 2.8rem 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .target_modal_title {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.color.neutralBlack.main};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    margin-bottom: 1.2rem;
  }
  .target_modal_subtitle {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.color.neutralBlack.text};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
  }
  .subtitle_biz {
    font-size: 1.3rem;
    line-height: 160%;
  }
  .target_modal_biz_button {
    text-decoration: underline;
    background-color: transparent;
    text-align: center;
  }
`;

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
