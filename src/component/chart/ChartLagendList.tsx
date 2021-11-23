/* eslint-disable no-param-reassign */
import styled from '@emotion/styled';

import { COLORS } from '@src/config/const/const';

import { answersChoiceType } from '../aggregation/AggregationBrief';

export default function ChartLegendList({
  answers,
  showAll,
}: {
  answers: answersChoiceType[];
  showAll?: boolean;
}): JSX.Element {
  const sum = answers.reduce((acc, cur) => {
    acc += cur.count;
    return acc;
  }, 0);

  const data = answers.map(({ value, count }) => ({
    value,
    count,
    percent: Math.floor((count / sum) * 100),
  }));

  const listData = showAll ? data : data.slice(0, 5);

  return (
    <StyledChartLegendUl>
      {listData.map((ans, index) => (
        <ChartLegend
          key={index}
          answer={ans}
          LegendColor={COLORS[index % COLORS.length]}
        />
      ))}
    </StyledChartLegendUl>
  );
}

const StyledChartLegendUl = styled.ul`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 2rem;
`;

type dataType = answersChoiceType & { percent: number };

const StyledChartLegend = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    .chart_legend_title {
      font-weight: ${({ theme }) => theme.fontWeight.regular};
      font-size: 1.5rem;
    }
    .chart_legend_count {
      font-weight: ${({ theme }) => theme.fontWeight.medium};
      font-size: 1.6rem;
      margin-right: 0.6rem;
    }
    .chart_legend_percent {
      font-weight: ${({ theme }) => theme.fontWeight.medium};
      font-size: 1.6rem;
      color: ${({ theme }) => theme.color.neutralBlack.placeholder};
    }
    span {
      display: block;
    }
  }
`;

const ColorCircle = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  margin-right: 0.8rem;
`;

function ChartLegend({
  answer,
  LegendColor,
}: {
  answer: dataType;
  LegendColor: string;
}): JSX.Element {
  return (
    <StyledChartLegend>
      <div>
        <ColorCircle style={{ background: LegendColor }} />
        <span className="chart_legend_title">{answer.value}</span>
      </div>{' '}
      <div>
        <span className="chart_legend_count">{answer.count}명</span>
        <span className="chart_legend_percent">{answer.percent}%</span>
      </div>
    </StyledChartLegend>
  );
}
