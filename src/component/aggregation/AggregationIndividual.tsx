import { MouseEvent, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import ModalPortals from '@component/common/modal/ModalPotal';
import { ReactComponent as ArrowLeft } from '@config/icon/arrow_left.svg';
import { ReactComponent as ArrowRight } from '@config/icon/arrow_right.svg';
import { ReactComponent as IndividualCheck } from '@config/icon/individual_check.svg';
import { useAnalytics } from '@src/analytics/faContext';
import { surveyIdAtom } from '@src/api/authorization';
import { choiceType } from '@src/atom/questionAtom';
import { responseIndividualAtom, TitleViewAtom } from '@src/atom/responseAtom';
import useLoadableGet from '@src/hook/useLoadableGet';

import LoadingCard from '../common/card/LoadingCard';
import UpDownModal from '../common/modal/UpDownModal';
import AggregationCard from './AggregationCard';

type questionCardType = {
  text: string;
  choices?: choiceType[] | undefined;
  questionType: 2 | 3;
};

type responsesType = {
  question: questionCardType;
  questionId: number;
  answer: { [key: string]: string }[];
};

export default function AggregationIndividual({
  responseIdName,
}: {
  responseIdName: { responseId: number; name: string }[];
}): JSX.Element {
  const fa = useAnalytics();
  const [nameIdx, setNameIdx] = useRecoilState(responseIndividualAtom);
  const [isPopupOpen, setPopup] = useState(false);
  const [isPopupClose, setPopupClose] = useState(false);
  const resetNameIdx = useResetRecoilState(responseIndividualAtom);
  const surveyId = useRecoilValue(surveyIdAtom);
  const isTitleView = useRecoilValue(TitleViewAtom);
  const getIndividualResponse = useLoadableGet<responsesType[]>(
    `mongo/surveys/${surveyId}/individual/${responseIdName[nameIdx].responseId}`,
  );
  const handleLeftClick = () => {
    setNameIdx(nameIdx - 1);
  };
  const handleRightClick = () => {
    setNameIdx(nameIdx + 1);
  };

  const handleListClick = (e: MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    const list = target.ariaLabel;
    setNameIdx(+list);
    setPopupClose(true);
  };

  useEffect(
    () => () => {
      resetNameIdx();
    },
    [],
  );
  const handleClick = () => {
    setPopup(true);
    fa.logEvent('survey_Individual_listButton_click');
  };

  useEffect(() => {
    if (isPopupOpen === false && isPopupClose) {
      setPopupClose(false);
    }
  }, [isPopupClose, isPopupOpen]);

  return (
    <>
      <IndividualNavigator isTitleView={!isTitleView}>
        <IndividualButton onClick={handleLeftClick} disabled={nameIdx === 0}>
          <ArrowLeft />
        </IndividualButton>
        <span onClick={handleClick} className="individual_name">
          {responseIdName[nameIdx].name}
        </span>
        <IndividualButton
          onClick={handleRightClick}
          disabled={nameIdx === responseIdName.length - 1}
        >
          <ArrowRight />
        </IndividualButton>
      </IndividualNavigator>
      <AggregationIndividualList isTitleView={isTitleView}>
        {getIndividualResponse.data ? (
          getIndividualResponse.data.map(
            ({ question, answer }, questionIdx) => (
              <AggregationCard
                key={questionIdx}
                questionIdx={questionIdx}
                {...question}
                response={answer}
                // eslint-disable-next-line
                isLast={questionIdx === getIndividualResponse.data!.length - 1}
              />
            ),
          )
        ) : (
          <LoadingCard count={2} />
        )}
      </AggregationIndividualList>

      {isPopupOpen && (
        <ModalPortals>
          <UpDownModal isClose={isPopupClose} setPopup={setPopup}>
            <ModalWrapper>
              <StyleModalTitle>답변자 선택</StyleModalTitle>
              <IndividualUL>
                {responseIdName.map(({ name }, idx) => (
                  <IndividualList
                    aria-label={`${idx}`}
                    onClick={handleListClick}
                    key={idx}
                  >
                    {name}
                    {nameIdx === idx && <IndividualCheck />}
                  </IndividualList>
                ))}
              </IndividualUL>
            </ModalWrapper>
          </UpDownModal>
        </ModalPortals>
      )}
    </>
  );
}

const IndividualUL = styled.ul`
  max-height: 50rem;
  overflow-y: overlay;

  ::-webkit-scrollbar {
    position: absolute;
    left: 0;
    width: 6px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    height: 10%;
    background-color: #c9c9c9;
    border-radius: 13px;
  }
`;

const IndividualButton = styled.button`
  background: transparent;
  path {
    color: #707070;
  }
  &:disabled {
    path {
      color: #c9c9c9;
    }
  }
`;

const ModalWrapper = styled.div`
  padding: 2.8rem 1.6rem 5.6rem 1.6rem;
`;

const IndividualList = styled.li`
  padding: 1.6rem 1.6rem;
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  display: flex;
  justify-content: space-between;
`;

const StyleModalTitle = styled.h1`
  width: 100%;
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  margin-bottom: 2.8rem;
`;

const IndividualNavigator = styled.div<{ isTitleView: boolean }>`
  padding: 1.6rem 3.6rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ isTitleView }) =>
    isTitleView
      ? `  box-shadow: 0px 4px 10px -4px rgba(107, 80, 80, 0.1);
  filter: drop-shadow(0px 2px 10px rgba(107, 80, 80, 0.06));`
      : ''}
  transition: 0.3s;
  .individual_name {
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: 1.5rem;
  }
`;

const AggregationIndividualList = styled.ul<{ isTitleView: boolean }>`
  overflow-y: ${({ isTitleView }) => (isTitleView ? 'hidden' : 'scroll')};
  height: calc(100% - 11.7rem);
  background: #f8f8f8;
  display: grid;
  grid-gap: 0.8rem;
  grid-template-columns: auto;
  padding: 0.9rem 0;
`;
