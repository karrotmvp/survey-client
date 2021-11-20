import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useParams } from '@karrotframe/navigator';
import { Tabs } from '@karrotframe/tabs';
// import useGet from '@src/hook/useGet';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';

// // import { questionDataType } from './AnswerHome';
import { getBizSurveyList, surveyIdAtom } from '@src/api/authorization';
import AggregationCardList from '@src/component/aggregation/AggregationCardList';
import LoadingCard from '@src/component/common/card/LoadingCard';

export default function SurveyAggregationPage(): JSX.Element {
  const [activeTabKey, setActiveTabKey] = useState<string>('tab_1');
  const AnswerTab = styled.div``;

  const { surveyId } =
    useParams<{ surveyId?: string; questionNumber?: string }>();
  if (!surveyId) throw new Error('surveyId none');

  const setSurveyId = useSetRecoilState(surveyIdAtom);
  setSurveyId(surveyId);
  const getSurveyList = useRecoilValueLoadable(getBizSurveyList);
  useEffect(() => {
    if (getSurveyList.contents !== '' && getSurveyList.state === 'hasValue') {
      console.log(getSurveyList.contents);
    }
  }, [getSurveyList]);

  return (
    <TabsWrapper>
      <Tabs
        activeTabKey={activeTabKey}
        className="myTabs"
        tabs={[
          {
            key: 'tab_1',
            buttonLabel: '질문',
            component: () =>
              getSurveyList.contents !== '' &&
              getSurveyList.state === 'hasValue' ? (
                <AggregationCardList
                  questions={getSurveyList.contents.questions}
                />
              ) : (
                <LoadingCard count={2} />
              ),
          },
          {
            key: 'tab_2',
            buttonAriaLabel: '답변',
            buttonLabel: <AnswerTab>답변 홀홀</AnswerTab>,
            component: () => <div>Tab 2</div>,
          },
        ]}
        onTabChange={key => {
          setActiveTabKey(key);
        }}
      />
    </TabsWrapper>
  );
}

const TabsWrapper = styled.div`
  .myTabs {
    --kf_tabs_tabBar-indicator-color: ${({ theme }) =>
      theme.color.primaryOrange};
    --kf_tabs_tabBar-activeFontColor: ${({ theme }) =>
      theme.color.primaryOrange};
    --kf_tabs_tabBar-activeFontColor: ${({ theme }) =>
      theme.color.primaryOrange};
    a {
      padding: 1.4rem 0;
      font-size: 1.3rem;
      font-weight: ${({ theme }) => theme.fontWeight.regular};
    }
  }
`;
