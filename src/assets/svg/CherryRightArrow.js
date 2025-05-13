import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const CherryRightArrow = (props) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={16} height={16} rx={8} fill="#E91C72" />
    <Rect width={16} height={16} rx={8} fill="black" fillOpacity={0.2} />
    <Rect width={16} height={16} rx={8} fill="black" fillOpacity={0.2} />
    <Path
      d="M5.53 11.0533L8.58333 8L5.53 4.94L6.47 4L10.47 8L6.47 12L5.53 11.0533Z"
      fill="white"
    />
  </Svg>
);
export default CherryRightArrow;
