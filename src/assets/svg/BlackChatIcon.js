import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const BlackChatIcon = (props) => (
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
      d="M13.6666 21.6667H13.3333C10.6666 21.6667 9.33325 21 9.33325 17.6667V14.3334C9.33325 11.6667 10.6666 10.3334 13.3333 10.3334H18.6666C21.3333 10.3334 22.6666 11.6667 22.6666 14.3334V17.6667C22.6666 20.3334 21.3333 21.6667 18.6666 21.6667H18.3333C18.1266 21.6667 17.9266 21.7667 17.7999 21.9334L16.7999 23.2667C16.3599 23.8534 15.6399 23.8534 15.1999 23.2667L14.1999 21.9334C14.0933 21.7867 13.8466 21.6667 13.6666 21.6667Z"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.6667 14.3333H19.3334"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.6667 17.6666H16.6667"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default BlackChatIcon;
