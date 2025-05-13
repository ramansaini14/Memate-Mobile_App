import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
const DollerIcon = props => (
  <Svg
    width={40}
    height={40}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect width={40} height={40} rx={20} fill="#F7F7F7" />
    <Path
      d="M16.6719 22.3298C16.6719 23.6198 17.6619 24.6598 18.8919 24.6598H21.4019C22.4719 24.6598 23.3419 23.7498 23.3419 22.6298C23.3419 21.4098 22.8119 20.9798 22.0219 20.6998L17.9919 19.2998C17.2019 19.0198 16.6719 18.5898 16.6719 17.3698C16.6719 16.2498 17.5419 15.3398 18.6119 15.3398H21.1219C22.3519 15.3398 23.3419 16.3798 23.3419 17.6698"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20 14V26"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30Z"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default DollerIcon;
