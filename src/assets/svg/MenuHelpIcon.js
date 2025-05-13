import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
const MenuHelpIcon = props => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect width={32} height={32} rx={16} fill="white" />
    <Path
      d="M19.3333 21.2867H16.6666L13.6999 23.26C13.2599 23.5533 12.6666 23.24 12.6666 22.7067V21.2867C10.6666 21.2867 9.33325 19.9534 9.33325 17.9534V13.9533C9.33325 11.9533 10.6666 10.62 12.6666 10.62H19.3333C21.3333 10.62 22.6666 11.9533 22.6666 13.9533V17.9534C22.6666 19.9534 21.3333 21.2867 19.3333 21.2867Z"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 16.5733V16.4333C16 15.98 16.28 15.74 16.56 15.5467C16.8333 15.36 17.1066 15.12 17.1066 14.68C17.1066 14.0667 16.6133 13.5733 16 13.5733C15.3866 13.5733 14.8933 14.0667 14.8933 14.68"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.9971 18.1666H16.0031"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default MenuHelpIcon;
