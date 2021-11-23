import { MouseEvent, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useRecoilState, useResetRecoilState } from 'recoil';

import ModalPortals from '@component/common/modal/ModalPotal';
import { ReactComponent as ArrowLeft } from '@config/icon/arrow_left.svg';
import { ReactComponent as ArrowRight } from '@config/icon/arrow_right.svg';
import { ReactComponent as IndividualCheck } from '@config/icon/individual_check.svg';
import { choiceType } from '@src/atom/questionAtom';
import { responseIndividualAtom } from '@src/atom/responseAtom';
import useLoadableGet from '@src/hook/useLoadableGet';

import LoadingCard from '../common/card/LoadingCard';
import UpDownModal from '../common/modal/UpDownModal';
import AggregationCard from './AggregationCard';

type questionCardType = {
  question: string;
  choices?: choiceType[] | undefined;
  questionType: 2 | 3;
};

type responsesType = {
  question: questionCardType;
  response: {
    answer: string;
  };
};

export default function AggregationIndividual({
  responseIdName,
}: {
  responseIdName: { responseId: number; name: string }[];
}): JSX.Element {
  const [nameIdx, setNameIdx] = useRecoilState(responseIndividualAtom);
  const [isPopupOpen, setPopup] = useState(false);
  const [isPopupClose, setPopupClose] = useState(false);
  const resetNameIdx = useResetRecoilState(responseIndividualAtom);
  const getIndividualResponse = useLoadableGet<responsesType[]>(
    `aggregation/individual/${responseIdName[nameIdx].responseId}`,
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
  };

  useEffect(() => {
    if (isPopupOpen === false && isPopupClose) {
      setPopupClose(false);
    }
  }, [isPopupClose, isPopupOpen]);

  return (
    <>
      <IndividualNavigator>
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
      <AggregationIndividualList>
        {getIndividualResponse.data ? (
          getIndividualResponse.data.map(
            ({ question, response }, questionIdx) => (
              <AggregationCard
                key={questionIdx}
                questionIdx={questionIdx}
                text={question.question}
                {...question}
                response={response}
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
  overflow-y: scroll;
  padding-top: 2.8rem;
  -webkit-scrollbar {
    width: 6px;
  }
  -webkit-scrollbar-thumb {
    height: 17%;
    background-color: rgba(33, 133, 133, 1);
    border-radius: 10px;
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
`;

const IndividualNavigator = styled.div`
  padding: 1.6rem 3.6rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
  .individual_name {
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: 1.5rem;
  }
`;

const AggregationIndividualList = styled.ul`
  overflow-y: scroll;
  height: calc(100% - 11.7rem);
  background: #f8f8f8;
  display: grid;
  grid-gap: 0.8rem;
  grid-template-columns: auto;
  padding: 0.9rem 0;
`;
