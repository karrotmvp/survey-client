import styled from '@emotion/styled';

import mini from '@src/api/mini';

export default function ErrorNoSurveyPage(): JSX.Element {
  return (
    <StyledComplete>
      <img src="./img/ErrorImg.png" />
      <h1>삭제된 설문이에요</h1>
      <MiniCloseButton
        onClick={() => {
          mini.close();
        }}
      >
        무따 종료하기
      </MiniCloseButton>
    </StyledComplete>
  );
}

const MiniCloseButton = styled.button`
  width: 27.6rem;
  background-color: #fff;
  border-radius: 0.8rem;
  padding: 1.5rem;
  border: 1px solid #c9c9c9;
  font-size: 1.6rem;
  color: #4b4b4b;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const StyledComplete = styled.section`
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
    margin-bottom: 2.4rem;
  }
`;
