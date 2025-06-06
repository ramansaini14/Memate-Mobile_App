import * as React from "react";
import Svg, { Path } from "react-native-svg";
const PinkDot = (props) => (
  <Svg
    width={6}
    height={6}
    viewBox="0 0 6 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3Z"
      fill="#E91C72"
    />
    <Path
      d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3Z"
      fill="black"
      fillOpacity={0.2}
    />
    <Path
      d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3Z"
      fill="black"
      fillOpacity={0.2}
    />
  </Svg>
);
export default PinkDot;

