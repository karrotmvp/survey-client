import { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator, useParams } from '@karrotframe/navigator';
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
  getBizSurveyList,
  getBriefUrls,
  surveyIdAtom,
  surveyListTrigger,
} from '@src/api/authorization';
import mini from '@src/api/mini';
import { TitleViewAtom } from '@src/atom/responseAtom';
import MemoAggregationTabs from '@src/component/aggregation/AggregationTabs';
import Modal from '@src/component/common/modal/Modal';
import UpDownModal from '@src/component/common/modal/UpDownModal';
import ScrollNavBar from '@src/component/common/navbar/ScrollNavBar';
import { targetList } from '@src/config/const/const';

export default function SurveyAggregationPage(): JSX.Element {
  const { surveyId } =
    useParams<{ surveyId?: string; questionNumber?: string }>();
  if (!surveyId) throw new Error('surveyId none');
  const fa = useAnalytics();
  const setSurveyId = useSetRecoilState(surveyIdAtom);
  const getSurveyList = useRecoilValueLoadable(getBizSurveyList);
  const url = useRecoilValueLoadable(getBriefUrls);
  const userData = useRecoilValueLoadable(getBizProfile);
  const ref = useRef<HTMLDivElement>(null);
  const [isTitleView, setTitleView] = useRecoilState(TitleViewAtom);
  const [isPopupOpen, setPopup] = useState(false);
  const [isModalPopup, setModalPopup] = useState(false);
  const [isPopupClose, setClose] = useState(false);
  const [trigger, setTrigger] = useRecoilState(surveyListTrigger);
  const { replace } = useNavigator();

  setSurveyId(surveyId);

  const options = {
    root: document.querySelector('#root'),
    threshold: 0.8,
  };

  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      setTitleView(entry.isIntersecting);
    });
  };

  const convertDate = (date: string): string => {
    const currentDate = new Date(date);
    return `${currentDate.getMonth()}??? ${currentDate.getDate()}???`;
  };

  const observer = new IntersectionObserver(callback, options);

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
    fa.logEvent('surveyAggregation_show');
  }, []);

  const handleShareClick = () => {
    fa.logEvent('aggregation_share_button_click');
    setClose(true);
    if (
      url.state === 'hasValue' &&
      url.contents &&
      userData.state === 'hasValue' &&
      userData.contents !== ''
    ) {
      mini.share({
        url: url.contents.shortUrl,
        text: `${userData.contents.name} ???????????? ????????? ???????????????! \n???????????? ????????? ?????? ????????? ??? ????????? ?????? ???? \n \n(?????? ?????? ????????? ????????? ???????????? ??? ?????????)\n`,
      });
    }
  };

  const onDeleteClick = () => {
    fa.logEvent('aggregation_delete_button_click');
    setClose(true);
    setModalPopup(true);
  };

  const onModalDeleteClick = async () => {
    const token = sessionStorage.getItem('jwt');
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    const Authorization = 'X-AUTH-TOKEN';
    if (token) axios.defaults.headers.common[Authorization] = token;

    await axios.delete(`mongo/surveys/${surveyId}`);
    fa.logEvent('aggregation_modal_delete_button_confirm');
    setTrigger(trigger + 1);
    setClose(true);
    replace('/');
  };

  useEffect(() => {
    if (!isPopupOpen && isPopupClose) {
      setClose(false);
    }
  }, [isPopupOpen, isPopupClose]);

  useEffect(() => {
    if (getSurveyList.state === 'hasError') replace('/*');
  }, [getSurveyList]);

  return (
    <>
      <ScrollNavBar
        type="BACK"
        title={
          getSurveyList.state === 'hasValue' && getSurveyList.contents !== ''
            ? getSurveyList.contents.title
            : undefined
        }
        titleAppear={!isTitleView}
        appendRight={
          <TrailingIcon
            onClick={() => {
              setPopup(true);
            }}
          />
        }
      />
      {isModalPopup && (
        <Modal setPopup={setModalPopup}>
          <ConfirmModal>
            ????????? ????????????
            <br />
            ??? ?????? ????????? ?????? ??? ?????????.
            <br />
            ??????????????????????
          </ConfirmModal>
          <div>
            <CancelButton
              onClick={() => {
                setModalPopup(false);
                fa.logEvent('aggregation_modal_delete_button_cancel');
              }}
            >
              ??????
            </CancelButton>
            <ConfirmButton onClick={onModalDeleteClick}>??????</ConfirmButton>
          </div>
        </Modal>
      )}

      {isPopupOpen && (
        <UpDownModal setPopup={setPopup} rect isClose={isPopupClose}>
          <StyledMoreModal>
            <button onClick={handleShareClick}>?????? ??????</button>
            <button className="delete" onClick={onDeleteClick}>
              ?????? ??????
            </button>
          </StyledMoreModal>
        </UpDownModal>
      )}
      <Section>
        <StyledSurveyTitleCard ref={ref}>
          <SurveyTitle>
            {getSurveyList.state === 'hasValue' &&
              getSurveyList.contents !== '' &&
              getSurveyList.contents.title}
          </SurveyTitle>
          <span>
            {getSurveyList.state === 'hasValue' &&
              getSurveyList.contents !== '' &&
              `${targetList[getSurveyList.contents.target - 1].title} ?? ${
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                convertDate(getSurveyList.contents.createdAt!)
              }`}
          </span>
        </StyledSurveyTitleCard>
        <MemoAggregationTabs handleShareClick={handleShareClick} />
      </Section>
    </>
  );
}

const SurveyTitle = styled.h1`
  color: #141414;
  font-size: 2rem;
  line-height: 140%;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-align: center;
  word-break: keep-all;
  padding: 0 1.4rem;
  margin-bottom: 1.6rem;
`;

const StyledSurveyTitleCard = styled.div`
  padding: 8rem 2.4rem 4rem 2.4rem;
  margin: 0 1.6rem 1.2rem 1.6rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  span {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.color.neutralBlack.placeholder};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    display: block;
    text-align: center;
  }
`;
const Section = styled.section`
  position: relative;
  height: 100vh;
  overflow: scroll;
`;

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
  .delete {
    color: #ff0000;
  }
`;

const ConfirmModal = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #242424;
  padding: 0 24px;
  height: 124px;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const CancelButton = styled.button`
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  width: 50%;
  height: 51px;
  background-color: #ffff;
  color: #141414;
  border-top: 1px solid #e8e8e8;
  border-right: 1px solid #e8e8e8;
  :focus {
    background-color: #f4f5f6;
  }
  border-bottom-left-radius: 12px;
`;

const ConfirmButton = styled.button`
  font-weight: 600;
  font-size: 14px;
  line-height: 140%;
  width: 50%;
  height: 52px;
  background-color: #ffff;
  color: #ff0000;
  border-top: 1px solid #e8e8e8;
  :focus {
    background-color: #f4f5f6;
  }
  border-bottom-right-radius: 12px;
`;
