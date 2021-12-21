/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react';

import styled from '@emotion/styled';
import { PieChart, Pie, Sector, Cell } from 'recharts';

type AggregationPieChartType = {
  data: { name: string; value: number }[];
  COLORS: string[];
};

export default function AggregationPieChart({
  data,
  COLORS,
}: AggregationPieChartType): JSX.Element {
  const StyledSector = styled(Sector)`
    /* @keyframes chart {
      from {
        transform: scale(1);
      }
      to {
        transform: scale(1);
      }
    }
    transform-origin: 200 200;
    animation: chart 0.2s ease-in;
    animation-fill-mode: forwards; */
  `;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const ex =
      Math.floor(percent * 100) > 10
        ? cx + outerRadius * 1.2 * cos
        : cx + outerRadius * 1.3 * cos;
    const ey =
      Math.floor(percent * 100) > 10
        ? cy + outerRadius * 1.2 * sin
        : cy + outerRadius * 1.3 * sin;

    return (
      <g>
        <StyledSector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius * 1.2}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />

        <circle
          cx={ex}
          cy={ey}
          r={Math.floor(percent * 100) > 10 ? 30 : 16}
          fill="white"
          filter="url(#filter0_d_2058_15704)"
        />

        <defs>
          <filter
            id="filter0_d_2058_15704"
            x="0.603516"
            y="0"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_2058_15704"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_2058_15704"
              result="shape"
            />
          </filter>
        </defs>

        <text
          fontWeight="900"
          fontSize={Math.floor(percent * 100) > 10 ? '16px' : '12px'}
          x={ex}
          y={ey + 3}
          textAnchor={'middle'}
          fill={fill}
        >{`${Math.floor(percent * 100)} %`}</text>
      </g>
    );
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <PieChart width={265} height={265}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={125}
          cy={125}
          innerRadius={40}
          outerRadius={80}
          dataKey="value"
          onMouseEnter={onPieEnter}
          startAngle={90}
          endAngle={-270}
          paddingAngle={0}
          stroke={'none'}
        >
          {data.map((e, index) => (
            <Cell fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
