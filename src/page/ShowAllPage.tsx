import { useEffect } from 'react';

import { useParams } from '@karrotframe/navigator';
import { useRecoilValueLoadable } from 'recoil';

import { useAnalytics } from '@src/analytics/faContext';
import { getAggregationBrief } from '@src/api/authorization';
import AggregationBriefCard from '@src/component/aggregation/AggregationBriefCard';
import NavBar from '@src/component/common/navbar/NavBar';

export default function ShowAllPage(): JSX.Element {
  const { surveyId, questionNumber } =
    useParams<{ surveyId?: string; questionNumber?: string }>();
  if (!surveyId) throw new Error('questionNumber or surveyId none');
  if (!questionNumber) throw new Error('questionNumber or surveyId none');
  const fa = useAnalytics();
  const question = useRecoilValueLoadable(getAggregationBrief);

  useEffect(() => {
    if (
      question.contents.questionAggregations[+questionNumber].questionType === 2
    ) {
      fa.logEvent('survey_showAllText_show');
    } else {
      fa.logEvent('survey_showAllChoice_show');
    }
  }, []);

  return (
    <div style={{ paddingTop: '5.6rem' }}>
      {question.state === 'hasValue' && question.contents !== '' ? (
        <>
          <NavBar
            type="BACK"
            title={
              question.contents[+questionNumber].questionType === 2
                ? '주관식 답변'
                : '객관식 답변'
            }
          />
          <div style={{ marginBottom: '8rem' }}>
            <AggregationBriefCard
              showAll
              order={+questionNumber}
              {...question.contents[+questionNumber]}
            />
          </div>{' '}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
