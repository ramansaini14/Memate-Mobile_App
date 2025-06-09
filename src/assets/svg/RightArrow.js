import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
const RightArrow = props => (
  <Svg
    width={41}
    height={40}
    viewBox="0 0 41 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect
      x={40.5}
      y={40}
      width={40}
      height={40}
      rx={20}
      transform="rotate(180 40.5 40)"
      fill="#F7F7F7"
    />
    <Path
      d="M22.9302 13.9299L29.0002 19.9999L22.9302 26.0699"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 20H28.83"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default RightArrow;
