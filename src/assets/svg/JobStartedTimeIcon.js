import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const JobStartedTimeIcon = (props) => (
  <Svg
    width={40}
    height={40}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={40} height={40} rx={20} fill="#ADADB4" />
    <Path
      d="M30 20C30 25.52 25.52 30 20 30C14.48 30 10 25.52 10 20C10 14.48 14.48 10 20 10C25.52 10 30 14.48 30 20Z"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M23.7099 23.18L20.6099 21.33C20.0699 21.01 19.6299 20.24 19.6299 19.61V15.51"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default JobStartedTimeIcon;
