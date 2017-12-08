// @flow
import React from 'react';
import type {TickScale} from './types';

type RadarAxisProps = {
  scale: TickScale,
  offsetAngle: number,
  domainMax: number,
  label: string,
  color: string,
  style?: {},
};

const defaultRadarAxisStyle = {
  axisOverreach: 1.1,
  labelOverreach: 1.2,
  fontSize: 10,
  fontFamily: 'sans-serif',
  textFill: 'black',
  axisWidth: 2,
};

const MAX_LINE_LENGTH = 10;

export default function RadarAxis(props: RadarAxisProps) {
  const {scale, offsetAngle, domainMax, label, color, style} = props;
  const {
    axisOverreach,
    labelOverreach,
    fontSize,
    fontFamily,
    textFill,
    axisWidth,
  } = {...defaultRadarAxisStyle, ...style};
  const xFactor = Math.cos(offsetAngle - Math.PI / 2);
  const yFactor = Math.sin(offsetAngle - Math.PI / 2);
  const x = scale(domainMax * labelOverreach) * xFactor;
  const words = label.split(' ');
  const parts = [];
  for (const word of words) {
    if (parts.length === 0 || parts[parts.length - 1].length + 1 + word.length > MAX_LINE_LENGTH) {
      parts.push(word);
    } else {
      parts[parts.length - 1] += ` ${word}`;
    }
  }
  return (
    <g>
      <line
        x1={0}
        y1={0}
        x2={scale(domainMax * axisOverreach) * xFactor}
        y2={scale(domainMax * axisOverreach) * yFactor}
        stroke={color}
        strokeWidth={axisWidth}
      />
      <text
        x={x}
        y={scale(domainMax * labelOverreach) * yFactor}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fill={textFill}
        textAnchor={'middle'}
        dy={'0.35em'}
      >
        {parts.map((part, i) => <tspan key={i} x={x} dy={i ? '1.2em' : '0'}>{part}</tspan>)}
      </text>
    </g>
  );
}
