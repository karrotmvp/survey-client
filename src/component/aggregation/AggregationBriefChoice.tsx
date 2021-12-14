import { COLORS } from '@src/config/const/const';

import ChartLegendList from '../chart/ChartLagendList';
import AggregationPieChart from '../chart/PieChart';
import { answersChoiceType } from './AggregationBrief';

export default function AggregationBriefChoice({
  answers,
  showAll,
}: {
  answers: answersChoiceType[];
  showAll?: boolean;
}): JSX.Element {
  const data = answers.map(({ value, count }) => ({
    name: value,
    value: count,
  }));

  data.sort((a, b) => b.value - a.value);
  return (
    <div>
      <AggregationPieChart data={data} COLORS={COLORS} />
      <ChartLegendList answers={answers} showAll={showAll} />
    </div>
  );
}
