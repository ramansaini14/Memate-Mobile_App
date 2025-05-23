import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const NotificationIcon = (props) => (
  <Svg
    width={40}
    height={40}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect x={0.5} y={0.5} width={39} height={39} rx={19.5} fill="white" />
    <Rect x={0.5} y={0.5} width={39} height={39} rx={19.5} stroke="#E9EBEE" />
    <Path
      d="M20.0196 10.91C16.7096 10.91 14.0196 13.6 14.0196 16.91V19.8C14.0196 20.41 13.7596 21.34 13.4496 21.86L12.2996 23.77C11.5896 24.95 12.0796 26.26 13.3796 26.7C17.6896 28.14 22.3396 28.14 26.6496 26.7C27.8596 26.3 28.3896 24.87 27.7296 23.77L26.5796 21.86C26.2796 21.34 26.0196 20.41 26.0196 19.8V16.91C26.0196 13.61 23.3196 10.91 20.0196 10.91Z"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
    <Path
      d="M21.8699 11.1999C21.5599 11.1099 21.2399 11.0399 20.9099 10.9999C19.9499 10.8799 19.0299 10.9499 18.1699 11.1999C18.4599 10.4599 19.1799 9.93994 20.0199 9.93994C20.8599 9.93994 21.5799 10.4599 21.8699 11.1999Z"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M23.0195 27.0601C23.0195 28.7101 21.6695 30.0601 20.0195 30.0601C19.1995 30.0601 18.4395 29.7201 17.8995 29.1801C17.3595 28.6401 17.0195 27.8801 17.0195 27.0601"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeMiterlimit={10}
    />
  </Svg>
);
export default NotificationIcon;
