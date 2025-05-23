import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const RateStar = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M15.39 5.21L16.8 8.02999C16.99 8.41999 17.5 8.78999 17.93 8.86999L20.48 9.28999C22.11 9.55999 22.49 10.74 21.32 11.92L19.33 13.91C19 14.24 18.81 14.89 18.92 15.36L19.49 17.82C19.94 19.76 18.9 20.52 17.19 19.5L14.8 18.08C14.37 17.82 13.65 17.82 13.22 18.08L10.83 19.5C9.12 20.51 8.08001 19.76 8.53001 17.82L9.10002 15.36C9.21002 14.9 9.02001 14.25 8.69001 13.91L6.70002 11.92C5.53002 10.75 5.91002 9.56999 7.54002 9.28999L10.09 8.86999C10.52 8.79999 11.03 8.41999 11.22 8.02999L12.63 5.21C13.38 3.68 14.62 3.68 15.39 5.21Z"
      stroke="#FAF48D"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 5H2"
      stroke="#FAF48D"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5 19H2"
      stroke="#FAF48D"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 12H2"
      stroke="#FAF48D"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default RateStar;
