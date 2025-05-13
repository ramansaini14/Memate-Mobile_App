import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
const MenuProfileIcon = props => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect width={32} height={32} rx={16} fill="white" />
    <Path
      d="M16.1067 15.2466C16.04 15.24 15.96 15.24 15.8867 15.2466C14.3 15.1933 13.04 13.8933 13.04 12.2933C13.04 10.66 14.36 9.33331 16 9.33331C17.6334 9.33331 18.96 10.66 18.96 12.2933C18.9534 13.8933 17.6934 15.1933 16.1067 15.2466Z"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.7732 17.7067C11.1599 18.7867 11.1599 20.5467 12.7732 21.62C14.6066 22.8467 17.6132 22.8467 19.4466 21.62C21.0599 20.54 21.0599 18.78 19.4466 17.7067C17.6199 16.4867 14.6132 16.4867 12.7732 17.7067Z"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default MenuProfileIcon;
