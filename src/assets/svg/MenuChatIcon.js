import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
const MenuChatIcon = props => (
  <Svg
    width={32}
    height={33}
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect y={0.5} width={32} height={32} rx={16} fill="white" />
    <Path
      d="M13.6666 21.1666H13.3333C10.6666 21.1666 9.33325 20.5 9.33325 17.1666V13.8333C9.33325 11.1666 10.6666 9.83331 13.3333 9.83331H18.6666C21.3333 9.83331 22.6666 11.1666 22.6666 13.8333V17.1666C22.6666 19.8333 21.3333 21.1666 18.6666 21.1666H18.3333C18.1266 21.1666 17.9266 21.2666 17.7999 21.4333L16.7999 22.7666C16.3599 23.3533 15.6399 23.3533 15.1999 22.7666L14.1999 21.4333C14.0933 21.2866 13.8466 21.1666 13.6666 21.1666Z"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.6667 13.8333H19.3334"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.6667 17.1667H16.6667"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default MenuChatIcon;
