import styled from '@emotion/styled';

const StyledQuestionModal = styled.section`
  display: flex;
  flex-direction: column;
  padding: 44px 24px;
`;

const ModalTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #141414;
  margin-bottom: 28px;
`;

const StyledModalButton = styled.button`
  width: 100%;
  background-color: #f4f3f8;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 120px;
  margin-bottom: 12px;
`;

const ModalButtonTitle = styled.h3`
  color: #707070;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 12px;
`;

const ModalButtonSubtitle = styled.span`
  color: #707070;
  font-weight: 400;
  font-size: 14px;
`;

function ModalButton({ type }: { type: 'TEXT' | 'CHOICE' }): JSX.Element {
  const title = type === 'TEXT' ? '주관식 질문' : '객관식 질문';
  const subtitle =
    type === 'TEXT'
      ? '고객님께서 짧은 글로 의견을 남길 수 있어요'
      : '고객님께서 선택지를 눌러 의견을 표시해요';
  return (
    <StyledModalButton>
      <ModalButtonTitle>{title}</ModalButtonTitle>
      <ModalButtonSubtitle>{subtitle}</ModalButtonSubtitle>
    </StyledModalButton>
  );
}

export default function QuestionModal(): JSX.Element {
  return (
    <StyledQuestionModal>
      <ModalTitle>질문 형태를 선택해주세요</ModalTitle>
      <ModalButton type="TEXT" />
      <ModalButton type="CHOICE" />
    </StyledQuestionModal>
  );
}
