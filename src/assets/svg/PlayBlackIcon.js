import * as React from "react"
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg"

const PlayBlackIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Rect
            width={56}
            height={56}
            x={56}
            y={56}
            fill="#191C1F"
            rx={28}
            transform="rotate(-180 56 56)"
        />
        <G clipPath="url(#a)">
            <Path
                fill="#fff"
                d="M28 16c-6.63 0-12 5.37-12 12s5.37 12 12 12 12-5.37 12-12-5.37-12-12-12Zm-1.32 15c0 .75-.6 1.32-1.32 1.32-.75 0-1.32-.6-1.32-1.32v-6c-.03-.72.57-1.32 1.29-1.32.75 0 1.35.6 1.35 1.32v6Zm5.31 0c0 .75-.6 1.32-1.32 1.32-.75 0-1.32-.6-1.32-1.32v-6c-.03-.72.57-1.32 1.29-1.32.75 0 1.35.6 1.35 1.32v6Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M16 16h24v24H16z" />
            </ClipPath>
        </Defs>
    </Svg>
)
export default PlayBlackIcon
