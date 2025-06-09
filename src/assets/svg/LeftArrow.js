import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
const LeftArrow = props => (
  <Svg
    width={41}
    height={40}
    viewBox="0 0 41 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect x={0.5} width={40} height={40} rx={20} fill="#F7F7F7" />
    <Path
      d="M18.0698 26.0701L11.9998 20.0001L18.0698 13.9301"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M29 20L12.17 20"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default LeftArrow;
