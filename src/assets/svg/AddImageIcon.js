import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const AddImageIcon = (props) => (
  <Svg
    width={104}
    height={104}
    viewBox="0 0 104 104"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect x={0.5} y={0.5} width={103} height={103} rx={15.5} fill="#F7F7F7" />
    <Rect
      x={0.5}
      y={0.5}
      width={103}
      height={103}
      rx={15.5}
      stroke="#E9EBEE"
      strokeDasharray="2 2"
    />
    <Path
      d="M44 52H60"
      stroke="#75808A"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M52 60V44"
      stroke="#75808A"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default AddImageIcon;
