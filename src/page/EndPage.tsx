import styled from '@emotion/styled';

import NavBar from '@src/component/common/navbar/NavBar';
import media from '@src/config/utils/util';

const StyledEndPage = styled.section`
  background-color: #ffff;
  width: 100%;
  height: 100vh;
  padding: 5.5rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
`;

const StyledEndPageBanner = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.fontFamily.title};
  color: ${({ theme }) => theme.color.primaryOrange};

  line-height: 30.8px;
  ${media.custom(360)} {
    font-size: 1rem;
  }
  margin-bottom: 3rem;
`;

const StyledHighlight = styled.span`
  color: ${({ theme }) => theme.color.primaryOrange};
  font-weight: 700;
`;
const StyledText = styled.h1`
  font-weight: 400;
  margin-bottom: 8px;
`;

const EndText = styled.h3`
  color: #141414;
  font-weight: 200;
  margin-bottom: 2rem;
  line-height: 160%;
`;

export default function EndPage(): JSX.Element {
  return (
    <StyledEndPage>
      <NavBar type="CLOSE" />
      <StyledEndPageBanner>
        <StyledText>만드신 설문은 고객님께</StyledText>
        <StyledText>
          <StyledHighlight>실제 발행될 예정</StyledHighlight>이에요 🎉
        </StyledText>
      </StyledEndPageBanner>
      <EndText>
        무따는 사장님이 평소 고객님에게 궁금했던 점을 쉽게 물어볼 수 있는
        서비스에요.
      </EndText>

      <EndText>
        사장님께서 만드신 설문지를{' '}
        <b>고객님께 가장 적절한 형태로 보내드리기 위해</b>
        7~14일 후 고객님께 보내드리려고 해요.
      </EndText>

      <EndText>
        사장님이 빨리 고객님의 답변을 받아보실 수 있도록 무따가 노력할게요!
      </EndText>
    </StyledEndPage>
  );
}
