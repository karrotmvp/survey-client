import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';

import IconButton from '@component/common/button/IconButton';
import NavBar from '@component/common/navbar/NavBar';
import HomeBanner from '@component/home/HomeBanner';
import HomeSurveyList from '@component/home/HomeSurveyList';
import { ReactComponent as PlusIcon } from '@config/icon/plus.svg';

const StyledHomePage = styled.section`
  background-color: #e5e5e5;
  width: 100%;
  padding-top: 3.5rem;
  padding-bottom: 10px;
  min-height: 100vh;
`;

const StyledSection = styled.section`
  padding: 0 18px;
`;

export default function HomePage(): JSX.Element {
  const { push } = useNavigator();
  const handleClick = () => {
    push('/create');
  };

  return (
    <>
      <NavBar type="CLOSE" navColor="GRAY" />
      <StyledHomePage>
        <StyledSection>
          <HomeBanner storeName="찰리카페사진관" />
          <HomeSurveyList />
          <IconButton
            text="설문 만들기"
            buttonColor="PRIMARY"
            buttonSize="LARGE"
            icon={<PlusIcon />}
            onClick={handleClick}
          />
        </StyledSection>
      </StyledHomePage>
    </>
  );
}
