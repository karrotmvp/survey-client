import { useParams } from '@karrotframe/navigator';
import { useRecoilValueLoadable } from 'recoil';

import { getAggregationBrief } from '@src/api/authorization';
import AggregationBriefCard from '@src/component/aggregation/AggregationBriefCard';
import NavBar from '@src/component/common/navbar/NavBar';

export default function ShowAllPage(): JSX.Element {
  const { surveyId, questionNumber } =
    useParams<{ surveyId?: string; questionNumber?: string }>();
  if (!surveyId) throw new Error('questionNumber or surveyId none');
  if (!questionNumber) throw new Error('questionNumber or surveyId none');

  const question = useRecoilValueLoadable(getAggregationBrief);

  return (
    <div style={{ paddingTop: '5.6rem' }}>
      {question.state === 'hasValue' && question.contents !== '' ? (
        <>
          <NavBar
            type="BACK"
            title={
              question.contents.questionAggregations[+questionNumber]
                .questionType === 2
                ? '주관식 답변'
                : '객관식 답변'
            }
          />
          <div style={{ marginBottom: '8rem' }}>
            <AggregationBriefCard
              showAll
              {...question.contents.questionAggregations[+questionNumber]}
            />
          </div>{' '}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}