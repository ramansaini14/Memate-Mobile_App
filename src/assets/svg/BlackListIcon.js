import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const BlackListIcon = (props) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={32} height={32} rx={16} fill="white" />
    <Path
      d="M16.2468 13.92H19.7468"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.2532 13.92L12.7532 14.42L14.2532 12.92"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.2468 18.5867H19.7468"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.2532 18.5867L12.7532 19.0867L14.2532 17.5867"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.9999 22.6667H17.9999C21.3333 22.6667 22.6666 21.3334 22.6666 18V14C22.6666 10.6667 21.3333 9.33337 17.9999 9.33337H13.9999C10.6666 9.33337 9.33325 10.6667 9.33325 14V18C9.33325 21.3334 10.6666 22.6667 13.9999 22.6667Z"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default BlackListIcon;
