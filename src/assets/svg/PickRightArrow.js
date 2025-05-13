import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
const PinkRightArrow = props => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect width={16} height={16} rx={8} fill="#E91C72" />
    <Path
      d="M5.53003 11.0533L8.58336 8L5.53003 4.94L6.47003 4L10.47 8L6.47003 12L5.53003 11.0533Z"
      fill="white"
    />
  </Svg>
);
export default PinkRightArrow;
