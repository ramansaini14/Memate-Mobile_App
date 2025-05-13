import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
const MenuTaskIcon = props => (
  <Svg
    width={32}
    height={33}
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect y={0.5} width={32} height={32} rx={16} fill="white" />
    <Path
      d="M16.2468 14.42H19.7468"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.2532 14.42L12.7532 14.92L14.2532 13.42"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.2468 19.0867H19.7468"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.2532 19.0867L12.7532 19.5867L14.2532 18.0867"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.9999 23.1667H17.9999C21.3333 23.1667 22.6666 21.8334 22.6666 18.5V14.5C22.6666 11.1667 21.3333 9.83337 17.9999 9.83337H13.9999C10.6666 9.83337 9.33325 11.1667 9.33325 14.5V18.5C9.33325 21.8334 10.6666 23.1667 13.9999 23.1667Z"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default MenuTaskIcon;
