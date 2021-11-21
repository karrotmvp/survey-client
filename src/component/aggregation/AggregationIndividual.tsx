import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import { ReactComponent as ArrowLeft } from '@config/icon/arrow_left.svg';
import { ReactComponent as ArrowRight } from '@config/icon/arrow_right.svg';
import { choiceType } from '@src/atom/questionAtom';
import { responseIndividualAtom } from '@src/atom/responseAtom';
import useLoadableGet from '@src/hook/useLoadableGet';

import LoadingCard from '../common/card/LoadingCard';
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
  const getIndividualresponse = useLoadableGet<responsesType[]>(
    `aggregation/individual/${responseIdName[nameIdx].responseId}`,
  );
  const handleLeftClick = () => {
    setNameIdx(nameIdx - 1);
  };
  const handleRightClick = () => {
    setNameIdx(nameIdx + 1);
  };
  return (
    <>
      <IndividualNavigator>
        <IndividualButton onClick={handleLeftClick} disabled={nameIdx === 0}>
          <ArrowLeft />
        </IndividualButton>
        <span className="individual_name">{responseIdName[nameIdx].name}</span>
        <IndividualButton
          onClick={handleRightClick}
          disabled={nameIdx === responseIdName.length - 1}
        >
          <ArrowRight />
        </IndividualButton>
      </IndividualNavigator>
      <AggregationIndividualList>
        {getIndividualresponse.data ? (
          getIndividualresponse.data.map(
            ({ question, response }, questionIdx) => (
              <AggregationCard
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
    </>
  );
}

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
