import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
const CalenderIcon = props => (
  <Svg
    width={40}
    height={40}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect x={0.5} y={0.5} width={39} height={39} rx={19.5} fill="white" />
    <Rect x={0.5} y={0.5} width={39} height={39} rx={19.5} stroke="#E9EBEE" />
    <Path
      d="M16 10V13"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M24 10V13"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.5 17.09H28.5"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M29 16V24.5C29 27.5 27.5 29.5 24 29.5H16C12.5 29.5 11 27.5 11 24.5V16C11 13 12.5 11 16 11H24C27.5 11 29 13 29 16Z"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M23.6947 21.7001H23.7037"
      stroke="#191C1F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M23.6947 24.7001H23.7037"
      stroke="#191C1F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19.9955 21.7001H20.0045"
      stroke="#191C1F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19.9955 24.7001H20.0045"
      stroke="#191C1F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.2943 21.7001H16.3033"
      stroke="#191C1F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.2943 24.7001H16.3033"
      stroke="#191C1F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default CalenderIcon;
