import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const ClockIcon = props => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M14.6666 8.00001C14.6666 11.68 11.68 14.6667 7.99998 14.6667C4.31998 14.6667 1.33331 11.68 1.33331 8.00001C1.33331 4.32001 4.31998 1.33334 7.99998 1.33334C11.68 1.33334 14.6666 4.32001 14.6666 8.00001Z"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.4734 10.12L8.40669 8.88665C8.04669 8.67332 7.75336 8.15999 7.75336 7.73999V5.00665"
      stroke="#191C1F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ClockIcon;
