import React, { MouseEvent, useState } from 'react';

import styled from '@emotion/styled';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';

import { getAggregationBrief } from '@src/api/authorization';
import { TitleViewAtom } from '@src/atom/responseAtom';

import LoadingCard from '../common/card/LoadingCard';
import AggregationBrief from './AggregationBrief';
import AggregationIndividual from './AggregationIndividual';

function AggregationAnswer({
  responseIds,
}: {
  responseIds: number[];
}): JSX.Element {
  const [tabKey, setTabKey] = useState('요약');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setTabKey(target.ariaLabel);
  };
  const Aggregation = useRecoilValueLoadable(getAggregationBrief);

  const responseIdName = responseIds.map((data, idx) => ({
    name: `익명 ${idx + 1}`,
    responseId: data,
  }));
  const isTitleView = useRecoilValue(TitleViewAtom);
  return (
    <>
      <StyleAggregationAnswer isTitleView={isTitleView} tabKey={tabKey}>
        <StyleAggregationButton
          onClick={handleClick}
          aria-label={'요약'}
          aria-checked={tabKey === '요약'}
        >
          요약
        </StyleAggregationButton>
        <StyleAggregationButton
          onClick={handleClick}
          aria-label={'개별보기'}
          aria-checked={tabKey === '개별보기'}
        >
          개별보기
        </StyleAggregationButton>
      </StyleAggregationAnswer>

      {tabKey === '요약' &&
        (Aggregation.state === 'hasValue' && Aggregation.contents !== '' ? (
          <AggregationBrief
            setTabKey={setTabKey}
            questionAggregations={Aggregation.contents.questionAggregations}
          />
        ) : (
          <LoadingCard count={2} />
        ))}
      {tabKey === '개별보기' &&
        (responseIds.length !== 0 ? (
          <AggregationIndividual responseIdName={responseIdName} />
        ) : (
          <div></div>
        ))}
    </>
  );
}

const StyleAggregationAnswer = styled.div<{
  tabKey: string;
  isTitleView: boolean;
}>`
  transition: 0.3s;
  padding-top: 1.4rem;
  padding-left: 2.4rem;
  ${({ tabKey, isTitleView }) => {
    if (isTitleView) return '';

    return tabKey === '요약'
      ? `box-shadow: 0px 2px 10px rgba(107, 80, 80, 0.08);
  filter: drop-shadow(0px 2px 10px rgba(107, 80, 80, 0.06));`
      : '';
  }}
`;

const StyleAggregationButton = styled.button`
  padding: 1.2rem;
  font-size: 1.3rem;
  background-color: transparent;
  color: ${({ theme }) => theme.color.neutralBlack.placeholder};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  &[aria-checked='true'] {
    color: ${({ theme }) => theme.color.primaryOrange};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

const MemoAggregationAnswer = React.memo(AggregationAnswer);

export default MemoAggregationAnswer;
