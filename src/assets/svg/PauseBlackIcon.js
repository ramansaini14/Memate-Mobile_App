import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

const PauseBlackIcon = (props) => (
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
        <Path
            fill="#fff"
            d="M28 16c-6.644 0-12 5.356-12 12s5.356 12 12 12 12-5.356 12-12-5.356-12-12-12Zm5.327 12.556-7.99 4.683a.667.667 0 0 1-.322.088.666.666 0 0 1-.322-.088c-.205-.146-.322-.322-.322-.556v-9.337h-.03c0-.234.147-.468.322-.556.176-.088.469-.146.674 0l7.99 4.654c.205.146.322.322.322.556 0 .234-.147.468-.322.556Z"
        />
    </Svg>
)
export default PauseBlackIcon
