import React from 'react'
import type {TickScale} from './types';
import chroma from 'chroma-js';

type RadarSectorProps = {
  scale: TickScale,
  offsetAngle: number,
  endAngle: number,
  color: string,
  domainMax: number,
};

function polarToCartesian(centerX, centerY, radius, angleInRadians) {
	return {
		x: centerX + (radius * Math.cos(angleInRadians)),
		y: centerY + (radius * Math.sin(angleInRadians))
	};
}

function d(cx, cy, radius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  const d = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} L ${cx} ${cy} Z`;
  return d;
}

export default function RadarSector({color, offsetAngle, endAngle, domainMax, scale}: RadarSectorProps) {
  return (
    <path
      fill={chroma(color).brighten(1.5)}
      stroke="none"
      d={d(0, 0, scale(domainMax), offsetAngle, endAngle)}
    />
  )
}
