import * as React from "react"
import Svg, { Path } from "react-native-svg"

const MassageIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M17.98 10.79v4c0 .26-.01.51-.04.75-.23 2.7-1.82 4.04-4.75 4.04h-.4c-.25 0-.49.12-.64.32l-1.2 1.6c-.53.71-1.39.71-1.92 0l-1.2-1.6a.924.924 0 0 0-.64-.32h-.4C3.6 19.58 2 18.79 2 14.79v-4c0-2.93 1.35-4.52 4.04-4.75.24-.03.49-.04.75-.04h6.4c3.19 0 4.79 1.6 4.79 4.79Z"
        />
        <Path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M21.98 6.79v4c0 2.94-1.35 4.52-4.04 4.75.03-.24.04-.49.04-.75v-4c0-3.19-1.6-4.79-4.79-4.79h-6.4c-.26 0-.51.01-.75.04C6.27 3.35 7.86 2 10.79 2h6.4c3.19 0 4.79 1.6 4.79 4.79Z"
        />
        <Path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.495 13.25h.01M9.995 13.25h.01M6.495 13.25h.01"
        />
    </Svg>
)
export default MassageIcon
