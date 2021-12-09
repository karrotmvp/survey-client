import styled from '@emotion/styled';

import { ReactComponent as PlusIcon } from '@config/icon/plus.svg';

export default function NoSurveyList({
  handleCreateClick,
}: {
  handleCreateClick: () => void;
}): JSX.Element {
  return (
    <StyleNoSurvey>
      <span className="no_survey_text">
        아직 설문이 없어요!
        <br />
        <b>설문을 만들고</b>
        <br />
        <b>우리 동네 이웃 의견</b>을 들어보세요
      </span>
      <button className="no_survey_create_button" onClick={handleCreateClick}>
        <PlusIcon /> 설문 만들기
      </button>
    </StyleNoSurvey>
  );
}

const StyleNoSurvey = styled.div`
  width: 100%;
  display: flex;
  padding-top: 30%;
  flex-direction: column;
  align-items: center;
  .no_survey_text {
    line-height: 140%;
    text-align: center;
    color: #707070;
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    display: block;
    margin-bottom: 2.4rem;
  }
  .no_survey_create_button {
    width: 27.6rem;
    background-color: ${({ theme }) => theme.color.primaryOrange};
    border-radius: 0.8rem;
    padding: 1.6rem;
    font-size: 1.6rem;
    color: #ffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    svg {
      margin-right: 0.4rem;
    }
  }
`;
