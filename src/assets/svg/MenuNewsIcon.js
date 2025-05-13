import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
const MenuNewsIcon = props => (
  <Svg
    width={32}
    height={33}
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect y={0.5} width={32} height={32} rx={16} fill="white" />
    <Path
      d="M22.6666 19.66V11.6134C22.6666 10.8134 22.0133 10.22 21.2199 10.2867H21.1799C19.7799 10.4067 17.6533 11.12 16.4666 11.8667L16.3533 11.94C16.1599 12.06 15.8399 12.06 15.6466 11.94L15.4799 11.84C14.2933 11.1 12.1733 10.3934 10.7733 10.28C9.97992 10.2134 9.33325 10.8134 9.33325 11.6067V19.66C9.33325 20.3 9.85325 20.9 10.4933 20.98L10.6866 21.0067C12.1333 21.2 14.3666 21.9334 15.6466 22.6334L15.6733 22.6467C15.8533 22.7467 16.1399 22.7467 16.3133 22.6467C17.5933 21.94 19.8333 21.2 21.2866 21.0067L21.5066 20.98C22.1466 20.9 22.6666 20.3 22.6666 19.66Z"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 12.16V22.16"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.1667 14.16H11.6667"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.6667 16.16H11.6667"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default MenuNewsIcon;
