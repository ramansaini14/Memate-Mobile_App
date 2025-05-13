import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

const WorkIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Rect width={32} height={32} fill="#F7F7F7" rx={16} />
        <Path
            stroke="#191C1F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M22.666 14.667V18c0 3.333-1.333 4.667-4.666 4.667h-4c-3.334 0-4.667-1.334-4.667-4.667v-4c0-3.333 1.333-4.667 4.667-4.667h3.333"
        />
        <Path
            stroke="#191C1F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M22.666 14.667H20c-2 0-2.667-.667-2.667-2.667V9.333l5.333 5.334Z"
        />
    </Svg>
)
export default WorkIcon
