import { MouseEvent, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import axios from 'axios';
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';

import { ReactComponent as TrailingIcon } from '@config/icon/trailing.svg';
import { useAnalytics } from '@src/analytics/faContext';
import {
  getBizProfile,
  getBriefUrls,
  surveyIdAtom,
  surveyListTrigger,
} from '@src/api/authorization';
import mini from '@src/api/mini';
import { surveyItemType } from '@src/page/SurveyHome';

import UpDownModal from '../modal/UpDownModal';

const StyledSurveyCard = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2.2rem 1.6rem;
  border-bottom: 1px solid #f4f4f4;
  .survey_card_column {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.8rem;
    span {
      display: block;
      font-size: 1.2rem;
    }
    .column_create {
      font-weight: ${({ theme }) => theme.fontWeight.medium};
      color: #c9c9c9;
    }

    .column_target {
      font-weight: ${({ theme }) => theme.fontWeight.bold};
      color: ${({ theme }) => theme.color.primaryOrange};
    }
  }
`;

const SurveyCardTitle = styled.span`
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const SurveyCardSubtitle = styled.span`
  font-size: 1.3rem;
  margin-top: 0.8rem;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

export default function SurveyCard({
  createdAt,
  responseCount,
  surveyId,
  target,
  title,
}: surveyItemType): JSX.Element {
  const { push } = useNavigator();
  const fa = useAnalytics();
  const convertDate = (date: string): string => {
    const currentDate = new Date(date);
    return `${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일`;
  };
  const [isPopupOpen, setPopup] = useState(false);
  const [isPopupClose, setClose] = useState(false);
  const [trigger, setTrigger] = useRecoilState(surveyListTrigger);
  const url = useRecoilValueLoadable(getBriefUrls);
  const userData = useRecoilValueLoadable(getBizProfile);
  const setSurveyId = useSetRecoilState(surveyIdAtom);

  const onDeleteClick = async () => {
    const token = sessionStorage.getItem('jwt');
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    const Authorization = 'X-AUTH-TOKEN';
    if (token) axios.defaults.headers.common[Authorization] = token;

    await axios.delete(`mongo/surveys/${surveyId}`);
    setTrigger(trigger + 1);
    setClose(true);
  };

  const onShareClick = () => {
    fa.logEvent('surveyList_share_button_click');
    setClose(true);
    if (
      url.state === 'hasValue' &&
      url.contents &&
      userData.state === 'hasValue' &&
      userData.contents !== ''
    ) {
      mini.share({
        url: url.contents.shortUrl,
        text: `${userData.contents.name} 사장님이 설문을 만드셨어요! \n여러분의 의견이 매장 개선에 큰 도움이 돼요 😊 \n \n(당근 마켓 어플이 있어야 답변하실 수 있어요)\n`,
      });
    }
  };
  useEffect(() => {
    if (!isPopupOpen && isPopupClose) {
      setClose(false);
    }
  }, [isPopupOpen, isPopupClose]);

  return (
    <>
      <StyledSurveyCard
        onClick={() => {
          fa.logEvent('surveyList_click');
          push(`/survey/aggregation/${surveyId}`);
        }}
      >
        <div className="survey_card_column">
          <span className="column_create">{convertDate(createdAt)}</span>
          <TrailingIcon
            onClick={(e: MouseEvent) => {
              setPopup(true);
              setSurveyId(`${surveyId}`);
              e.stopPropagation();
            }}
          />
        </div>
        <SurveyCardTitle>{title}</SurveyCardTitle>

        {responseCount !== 0 && (
          <SurveyCardSubtitle>답변 {responseCount}</SurveyCardSubtitle>
        )}
      </StyledSurveyCard>
      {isPopupOpen && (
        <UpDownModal setPopup={setPopup} rect isClose={isPopupClose}>
          <StyledMoreModal>
            <button onClick={onShareClick}>설문 공유</button>
            <button onClick={onDeleteClick}>설문 삭제</button>
          </StyledMoreModal>
        </UpDownModal>
      )}
    </>
  );
}

const StyledMoreModal = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  button {
    width: 100%;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-size: 1.6rem;
    padding: 1.6rem;
    text-align: center;
    :focus {
      background-color: #c9c9c9;
    }
  }
`;
