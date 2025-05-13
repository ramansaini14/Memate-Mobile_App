import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

const WhiteBackIcon = (props) => (
    <Svg
        width={40}
        height={40}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Rect x={0.5} y={0.5} width={39} height={39} rx={19.5} fill="white" />
        <Rect x={0.5} y={0.5} width={39} height={39} rx={19.5} stroke="#E9EBEE" />
        <Path
            d="M17.57 13.9301L11.5 20.0001L17.57 26.0701"
            stroke="#292D32"
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M28.4999 20H11.6699"
            stroke="#292D32"
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);
export default WhiteBackIcon;
