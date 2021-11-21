import { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import { useParams } from '@karrotframe/navigator';
import { Tabs } from '@karrotframe/tabs';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';

// // import { questionDataType } from './AnswerHome';
import { getBizSurveyList, surveyIdAtom } from '@src/api/authorization';
import AggregationAnswer from '@src/component/aggregation/AggregationAnswer';
import AggregationCardList from '@src/component/aggregation/AggregationCardList';
import LoadingCard from '@src/component/common/card/LoadingCard';
import ScrollNavBar from '@src/component/common/navbar/ScrollNavBar';
import { targetList } from '@src/config/const/const';
import useLoadableGet from '@src/hook/useLoadableGet';

type anwserBriefType = {
  count: number;
  responseIds: number[];
};

export default function SurveyAggregationPage(): JSX.Element {
  const { surveyId } =
    useParams<{ surveyId?: string; questionNumber?: string }>();
  if (!surveyId) throw new Error('surveyId none');
  const [activeTabKey, setActiveTabKey] = useState<string>('tab_1');
  const setSurveyId = useSetRecoilState(surveyIdAtom);
  const getSurveyList = useRecoilValueLoadable(getBizSurveyList);
  const ref = useRef<HTMLDivElement>(null);
  const [isTitleView, setTitleView] = useState(true);

  setSurveyId(surveyId);

  const answerBrief = useLoadableGet<anwserBriefType>(
    `/aggregation/${surveyId}/responses/brief`,
  );
  const options = {
    root: document.querySelector('#root'),
    threshold: 0.8,
  };

  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      setTitleView(entry.isIntersecting);
    });
  };

  const observer = new IntersectionObserver(callback, options);
  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [ref.current]);

  return (
    <Section>
      <ScrollNavBar
        type="BACK"
        title={
          getSurveyList.state === 'hasValue' && getSurveyList.contents !== ''
            ? getSurveyList.contents.title
            : undefined
        }
        titleAppear={!isTitleView}
      />
      <StyledSurveyTitleCard ref={ref}>
        <SurveyTitle>
          {getSurveyList.state === 'hasValue' &&
            getSurveyList.contents !== '' &&
            getSurveyList.contents.title}
        </SurveyTitle>
        <span>
          {' '}
          {getSurveyList.state === 'hasValue' &&
            getSurveyList.contents !== '' &&
            targetList[getSurveyList.contents.target - 1].title}{' '}
          · 10월 21일
        </span>
      </StyledSurveyTitleCard>
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
              component: () =>
                answerBrief.isSuccess && answerBrief.data !== undefined ? (
                  <AggregationAnswer
                    responseIds={answerBrief.data.responseIds}
                  />
                ) : (
                  <LoadingCard count={2} />
                ),
            },
          ]}
          onTabChange={key => {
            setActiveTabKey(key);
          }}
        />
      </TabsWrapper>
    </Section>
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
`;
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
