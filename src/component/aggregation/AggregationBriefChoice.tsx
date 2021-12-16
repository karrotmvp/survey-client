import { COLORS } from '@src/config/const/const';

import ChartLegendList from '../chart/ChartLagendList';
import AggregationPieChart from '../chart/PieChart';
import { answerChoiceType } from './AggregationBriefCard';

export default function AggregationBriefChoice({
  answers,
  showAll,
}: {
  answers: answerChoiceType[];
  showAll?: boolean;
}): JSX.Element {
  const filterAnswers = answers.map(({ value, count }) => ({
    value: value === '' ? '미선택' : value,
    count,
  }));

  const data = filterAnswers.map(({ value, count }) => ({
    name: value,
    value: count,
  }));

  data.sort((a, b) => b.value - a.value);
  return (
    <div>
      <AggregationPieChart data={data} COLORS={COLORS} key={answers[0].value} />
      <ChartLegendList answers={filterAnswers} showAll={showAll} />
    </div>
  );
}
