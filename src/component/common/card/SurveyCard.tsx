import styled from '@emotion/styled';

import IconButton from '@component/common/button/IconButton';
import { ReactComponent as TrashIcon } from '@config/icon/trash_can.svg';

type SurveyCardType = {
  title: string;
  answer: number;
  date: string;
};

const StyledSurveyCard = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 136px;
  background-color: #fff;
  border-radius: 20px;
  padding: 1rem;
  justify-content: space-between;
`;

const SurveyCardTitle = styled.span`
  font-size: 18px;
`;

const SurveyCardSubtitle = styled.span`
  font-size: 0.8rem;
  display: flex;
  align-items: center;
`;

const SurveyCardColumn = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.color.gray};
  svg {
    margin: 0 5px;
  }
`;

export default function SurveyCard({
  title,
  answer,
  date,
}: SurveyCardType): JSX.Element {
  return (
    <StyledSurveyCard>
      <SurveyCardTitle>{title}</SurveyCardTitle>
      <SurveyCardColumn>
        <SurveyCardSubtitle>
          답변 {answer} {date}
        </SurveyCardSubtitle>
        <IconButton
          text="삭제"
          buttonColor="WHITE"
          buttonSize="SMALL"
          icon={<TrashIcon />}
        />
      </SurveyCardColumn>
    </StyledSurveyCard>
  );
}
