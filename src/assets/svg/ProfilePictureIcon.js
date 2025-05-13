import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const ProfilePictureIcon = (props) => (
  <Svg
    width={121}
    height={120}
    viewBox="0 0 121 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect x={1} y={0.5} width={119} height={119} rx={59.5} fill="#212528" />
    <Rect x={1} y={0.5} width={119} height={119} rx={59.5} stroke="#75808A" />
    <Path
      d="M55.5001 56.6667C57.341 56.6667 58.8334 55.1743 58.8334 53.3333C58.8334 51.4924 57.341 50 55.5001 50C53.6591 50 52.1667 51.4924 52.1667 53.3333C52.1667 55.1743 53.6591 56.6667 55.5001 56.6667Z"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M62.1666 43.3333H55.4999C47.1666 43.3333 43.8333 46.6667 43.8333 55V65C43.8333 73.3333 47.1666 76.6667 55.4999 76.6667H65.4999C73.8333 76.6667 77.1666 73.3333 77.1666 65V56.6667"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M70.5 43.3333V53.3333L73.8333 50"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M70.5001 53.3333L67.1667 50"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M44.95 71.5834L53.1666 66.0667C54.4833 65.1834 56.3833 65.2833 57.5666 66.3L58.1166 66.7833C59.4166 67.9 61.5166 67.9 62.8166 66.7833L69.75 60.8333C71.05 59.7167 73.15 59.7167 74.45 60.8333L77.1666 63.1667"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ProfilePictureIcon;
