import React, { useState } from 'react';

import styled from '@emotion/styled';
import { useParams, useQueryParams } from '@karrotframe/navigator';
import { Tabs } from '@karrotframe/tabs';
import { Loadable, useRecoilValueLoadable, useSetRecoilState } from 'recoil';

import { useAnalytics } from '@src/analytics/faContext';
import { getBizSurveyList, surveyIdAtom } from '@src/api/authorization';
import { responseIndividualAtom } from '@src/atom/responseAtom';
import useLoadableGet, { StateType } from '@src/hook/useLoadableGet';
import { questionDataType } from '@src/page/AnswerHome';

import LoadingCard from '../common/card/LoadingCard';
import MemoAggregationAnswer from './AggregationAnswer';
import AggregationCardList from './AggregationCardList';

type answerBriefType = {
  count: number;
  responseIds: number[];
};
function AggregationTabs(): JSX.Element {
  const { surveyId } =
    useParams<{ surveyId?: string; questionNumber?: string }>();
  if (!surveyId) throw new Error('surveyId none');
  const { individual } = useQueryParams<{ individual?: string }>();
  const setSurveyId = useSetRecoilState(surveyIdAtom);
  const getSurveyList = useRecoilValueLoadable(getBizSurveyList);
  const initialTab = individual ? 'tab_2' : 'tab_1';
  const [activeTabKey, setActiveTabKey] = useState<string>(initialTab);
  const answerBrief = useLoadableGet<answerBriefType>(
    `/aggregation/${surveyId}/responses/brief`,
  );
  const setResponseId = useSetRecoilState(responseIndividualAtom);
  const fa = useAnalytics();
  setSurveyId(surveyId);
  if (individual) {
    setResponseId(+individual);
  }
  return (
    <TabsWrapper>
      <Tabs
        activeTabKey={activeTabKey}
        className="myTabs"
        tabs={[
          {
            key: 'tab_1',
            buttonAriaLabel: '질문',
            buttonLabel: (
              <AnswerTab aria-checked={activeTabKey === 'tab_1'}>
                질문
              </AnswerTab>
            ),
            render: WithQuestionTab(getSurveyList),
          },
          {
            key: 'tab_2',
            buttonAriaLabel: '답변',
            buttonLabel: (
              <>
                <AnswerTab aria-checked={activeTabKey === 'tab_2'}>
                  답변
                  {answerBrief.data ? (
                    <AnswerNumber aria-checked={activeTabKey === 'tab_2'}>
                      {answerBrief.data.count}
                    </AnswerNumber>
                  ) : (
                    <></>
                  )}
                </AnswerTab>
              </>
            ),
            render: WithAnswerTab(answerBrief),
          },
        ]}
        onTabChange={key => {
          if (key === 'tab_1') {
            fa.logEvent(`surveyAggregation_tab_question_click`);
          } else {
            fa.logEvent(`surveyAggregation_tab_answer_click_`);
          }
          setActiveTabKey(key);
        }}
      />
    </TabsWrapper>
  );
}

const WithQuestionTab = (getSurveyList: Loadable<'' | questionDataType>) => {
  if (getSurveyList.contents !== '' && getSurveyList.state === 'hasValue') {
    const { questions } = getSurveyList.contents;
    return () => <AggregationCardList questions={questions} />;
  }
  return () => <LoadingCard count={2} />;
};

const WithAnswerTab = (answerBrief: StateType<answerBriefType>) => {
  if (answerBrief.isSuccess && answerBrief.data !== undefined) {
    const { responseIds } = answerBrief.data;
    if (responseIds.length === 0) return () => <StyleNoAnswer></StyleNoAnswer>;
    return () => <MemoAggregationAnswer responseIds={responseIds} />;
  }
  return () => <LoadingCard count={2} />;
};

const StyleNoAnswer = styled.div`
  background-color: #f8f8f8;
  width: 100%;
  height: 100%;
`;

const TabsWrapper = styled.div`
  .myTabs {
    position: sticky;
    top: 5.6rem;
    height: calc(100vh - 5.6rem);
    --kf_tabs_tabBar-indicator-color: ${({ theme }) =>
      theme.color.primaryOrange};
    --kf_tabs_tabBar-activeFontColor: ${({ theme }) =>
      theme.color.primaryOrange};
    --kf_tabs_tabBar-baseFontColor: ${({ theme }) =>
      theme.color.neutralBlack.placeholder};

    a {
      padding: 1.4rem 0;
      font-size: 1.3rem;
      font-weight: ${({ theme }) => theme.fontWeight.regular};
    }
  }
`;

const MemoAggregationTabs = React.memo(AggregationTabs);

export default MemoAggregationTabs;

const AnswerNumber = styled.div`
  margin-left: 0.8rem;
  color: #fff;

  &[aria-checked='true'] {
    background-color: ${({ theme }) => theme.color.primaryOrange};
  }

  &[aria-checked='false'] {
    background-color: ${({ theme }) => theme.color.neutralBlack.placeholder};
  }
  min-width: 3.2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  border-radius: 15px;
`;

const AnswerTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &[aria-checked='true'] {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;
