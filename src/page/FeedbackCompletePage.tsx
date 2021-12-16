import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';

import NavBar from '@src/component/common/navbar/NavBar';

export default function FeedbackCompletePage(): JSX.Element {
  const { replace } = useNavigator();

  return (
    <StyledFeedbackComplete>
      <NavBar type="BACK" />
      <img src="./img/happyMudda.png" />
      <h1>의견을 남겨주셔서 감사해요!</h1>
      <span>더 좋은 서비스가 되기 위해 노력할게요🔥</span>
      <FeedbackButton
        onClick={() => {
          replace('/');
        }}
      >
        홈으로 돌아가기
      </FeedbackButton>
    </StyledFeedbackComplete>
  );
}

const FeedbackButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.color.primaryOrange};
  border-radius: 0.8rem;
  padding: 1.5rem;
  font-size: 1.6rem;
  color: #ffff;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const StyledFeedbackComplete = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  padding: 0 1.6rem;
  img {
    width: 8.2rem;
    margin-bottom: 2.8rem;
  }
  h1 {
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: 1.8rem;
    margin-bottom: 0.6rem;
  }
  span {
    display: block;
    color: #4b4b4b;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-size: 1.5rem;
    margin-bottom: 2.3rem;
  }
`;
