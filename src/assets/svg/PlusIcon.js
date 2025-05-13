import * as React from 'react';
import Svg, {G, Rect, Path, Defs} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function PlusIcon(props) {
  return (
    <Svg
      width={90}
      height={90}
      viewBox="0 0 96 97"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G filter="url(#filter0_dddd_5034_5806)">
        <Rect x={12} y={2} width={72} height={72} rx={36} fill="#191C1F" />
        <Path
          d="M42 38h12M48 44V32"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
}

export default PlusIcon;
