import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const ListIcon = (props) => (
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
      d="M16.2467 13.92H19.7468"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.2533 13.92L12.7533 14.42L14.2533 12.92"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.2467 18.5867H19.7468"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.2533 18.5867L12.7533 19.0867L14.2533 17.5867"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 22.6666H18C21.3333 22.6666 22.6667 21.3333 22.6667 18V14C22.6667 10.6666 21.3333 9.33331 18 9.33331H14C10.6667 9.33331 9.33333 10.6666 9.33333 14V18C9.33333 21.3333 10.6667 22.6666 14 22.6666Z"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ListIcon;
