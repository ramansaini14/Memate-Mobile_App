import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

const WhiteMenuIcon = (props) => (
    <Svg
        width={40}
        height={40}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Rect x={0.5} y={0.5} width={39} height={39} rx={19.5} stroke="#75808A" />
        <Path
            d="M11 15H29"
            stroke="white"
            strokeWidth={1.5}
            strokeLinecap="round"
        />
        <Path
            d="M11 20H29"
            stroke="white"
            strokeWidth={1.5}
            strokeLinecap="round"
        />
        <Path
            d="M11 25H29"
            stroke="white"
            strokeWidth={1.5}
            strokeLinecap="round"
        />
    </Svg>
);
export default WhiteMenuIcon;
