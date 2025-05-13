import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const MapIcon = (props) => (
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
      d="M20 27.1292C20.4436 27.1292 20.8873 26.9716 21.245 26.6564C23.3772 24.7785 27.5 20.608 27.5 16.4375C27.5 12.2953 24.1422 8.9375 20 8.9375C15.8578 8.9375 12.5 12.2953 12.5 16.4375C12.5 20.608 16.6228 24.7785 18.755 26.6565C19.1127 26.9716 19.5564 27.1292 20 27.1292Z"
      stroke="black"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M26.2372 26.1502C28.1626 26.6653 29.375 27.4152 29.375 28.25C29.375 29.8033 25.1777 31.0625 20 31.0625C14.8223 31.0625 10.625 29.8033 10.625 28.25C10.625 27.4152 11.8374 26.6653 13.7628 26.1502"
      stroke="black"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20 19.25C21.5533 19.25 22.8125 17.9908 22.8125 16.4375C22.8125 14.8842 21.5533 13.625 20 13.625C18.4467 13.625 17.1875 14.8842 17.1875 16.4375C17.1875 17.9908 18.4467 19.25 20 19.25Z"
      stroke="black"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default MapIcon;
