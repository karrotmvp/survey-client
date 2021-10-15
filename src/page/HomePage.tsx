import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';

// import mini from '@api/mini';
import NavBar from '@component/common/navbar/NavBar';
import HomeBanner from '@component/home/HomeBanner';

const StyledHomePage = styled.section`
  background: linear-gradient(180deg, #f9f9fb 0%, #f2f2f2 100%);
  width: 100%;
  min-height: 100vh;
  padding-top: 3.5rem;
`;

const StyledSection = styled.section`
  padding: 0 18px;
`;

const CreateQuestionButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.color.primaryOrange};
  border-radius: 12px;
  padding: 20px 100px;
  font-size: 18px;
  color: #ffff;
  font-weight: 700;
`;

export default function HomePage(): JSX.Element {
  const { push } = useNavigator();
  const handleClick = () => {
    // mini.startPreset({
    //   preset: process.env.REACT_APP_PRESET_BIZ!,
    //   params: {
    //     appId: process.env.REACT_APP_APP_ID!,
    //   },
    //   // eslint-disable-next-line object-shorthand
    //   onSuccess: result => {
    //     if (result && result.bizProfileId) {
    //       console.log(result);
    //       push('/question');
    //     }
    //   },
    // });
    push('/question/1');
  };

  return (
    <>
      <StyledHomePage>
        <NavBar type="CLOSE" />
        <StyledSection>
          <HomeBanner />
          <CreateQuestionButton onClick={handleClick}>
            설문 만들러가기
          </CreateQuestionButton>
        </StyledSection>
      </StyledHomePage>
    </>
  );
}
