import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const PauseJobIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_4058_6411)">
      <Path
        d="M12 0C5.37 0 0 5.37 0 12C0 18.63 5.37 24 12 24C18.63 24 24 18.63 24 12C24 5.37 18.63 0 12 0ZM10.68 15C10.68 15.75 10.08 16.32 9.36 16.32C8.61 16.32 8.04 15.72 8.04 15V9C8.01 8.28 8.61 7.68 9.33 7.68C10.08 7.68 10.68 8.28 10.68 9V15ZM15.99 15C15.99 15.75 15.39 16.32 14.67 16.32C13.92 16.32 13.35 15.72 13.35 15V9C13.32 8.28 13.92 7.68 14.64 7.68C15.39 7.68 15.99 8.28 15.99 9V15Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_4058_6411">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default PauseJobIcon;
