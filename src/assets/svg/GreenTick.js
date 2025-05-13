import * as React from "react";
import Svg, { Path } from "react-native-svg";
const GreenTick = (props) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M14 4.66668L6.00001 12.6667L2.33334 9.00002L3.27334 8.06002L6.00001 10.78L13.06 3.72668L14 4.66668Z"
      fill="#6ACD75"
    />
  </Svg>
);
export default GreenTick;
