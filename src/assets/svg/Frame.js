import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
const FrameIcon = props => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect width={32} height={32} rx={16} fill="white" />
    <Path
      d="M13.6667 21.6667H13.3333C10.6667 21.6667 9.33334 21 9.33334 17.6667V14.3334C9.33334 11.6667 10.6667 10.3334 13.3333 10.3334H18.6667C21.3333 10.3334 22.6667 11.6667 22.6667 14.3334V17.6667C22.6667 20.3334 21.3333 21.6667 18.6667 21.6667H18.3333C18.1267 21.6667 17.9267 21.7667 17.8 21.9334L16.8 23.2667C16.36 23.8534 15.64 23.8534 15.2 23.2667L14.2 21.9334C14.0933 21.7867 13.8467 21.6667 13.6667 21.6667Z"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.6667 14.3333H19.3333"
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
export default FrameIcon;
