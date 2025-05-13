import * as React from "react";
import Svg, { Path } from "react-native-svg";
const WhiteDownArrow = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M7.41 8.57999L12 13.17L16.59 8.57999L18 9.99999L12 16L6 9.99999L7.41 8.57999Z"
      fill="white"
    />
  </Svg>
);
export default WhiteDownArrow;
