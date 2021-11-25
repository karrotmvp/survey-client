import { useEffect, useRef } from 'react';

import styled from '@emotion/styled';
import { useParams } from '@karrotframe/navigator';
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';

import { getBizSurveyList, surveyIdAtom } from '@src/api/authorization';
import { TitleViewAtom } from '@src/atom/responseAtom';
import MemoAggregationTabs from '@src/component/aggregation/AggregationTabs';
import ScrollNavBar from '@src/component/common/navbar/ScrollNavBar';
import { targetList } from '@src/config/const/const';

export default function SurveyAggregationPage(): JSX.Element {
  const { surveyId } =
    useParams<{ surveyId?: string; questionNumber?: string }>();
  if (!surveyId) throw new Error('surveyId none');

  const setSurveyId = useSetRecoilState(surveyIdAtom);
  const getSurveyList = useRecoilValueLoadable(getBizSurveyList);
  const ref = useRef<HTMLDivElement>(null);
  const [isTitleView, setTitleView] = useRecoilState(TitleViewAtom);

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
    return `${currentDate.getMonth()}월 ${currentDate.getDate()}일`;
  };

  const observer = new IntersectionObserver(callback, options);
  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, []);

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
          {getSurveyList.state === 'hasValue' &&
            getSurveyList.contents !== '' &&
            `${targetList[getSurveyList.contents.target - 1].title} · ${
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              convertDate(getSurveyList.contents.createdAt!)
            }`}
        </span>
      </StyledSurveyTitleCard>
      <MemoAggregationTabs />
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
