import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const JobPauseIcon = (props) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_4088_6485)">
      <Path
        d="M8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C12.42 16 16 12.42 16 8C16 3.58 12.42 0 8 0ZM7.12 10C7.12 10.5 6.72 10.88 6.24 10.88C5.74 10.88 5.36 10.48 5.36 10V6C5.34 5.52 5.74 5.12 6.22 5.12C6.72 5.12 7.12 5.52 7.12 6V10ZM10.66 10C10.66 10.5 10.26 10.88 9.78 10.88C9.28 10.88 8.9 10.48 8.9 10V6C8.88 5.52 9.28 5.12 9.76 5.12C10.26 5.12 10.66 5.52 10.66 6V10Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_4088_6485">
        <Rect width={16} height={16} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default JobPauseIcon;
