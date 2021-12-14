import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';

export default function ErrorPage(): JSX.Element {
  const { replace } = useNavigator();

  return (
    <StyledComplete>
      <h1>일시적인 오류입니다.</h1>
      <span>잠시 후 다시 시도해 주세요!</span>
      <HomeButton
        onClick={() => {
          replace('/');
        }}
      >
        홈으로 돌아가기
      </HomeButton>
    </StyledComplete>
  );
}

const HomeButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.color.primaryOrange};
  border-radius: 0.8rem;
  padding: 1.5rem;
  font-size: 1.6rem;
  color: #ffff;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const StyledComplete = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  padding: 0 1.6rem;

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
