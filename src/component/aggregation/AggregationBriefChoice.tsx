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
  answers.sort((a, b) => b.count - a.count);

  const data = answers.map(({ choice, count }) => ({
    name: choice,
    value: count,
  }));

  return (
    <div>
      <AggregationPieChart data={data} COLORS={COLORS} />
      <ChartLegendList answers={answers} showAll={showAll} />
    </div>
  );
}
