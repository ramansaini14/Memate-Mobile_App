import * as React from "react"
import Svg, { Path } from "react-native-svg"

const DocumentIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Path
            stroke="#191C1F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M6 7.333v4L7.333 10M6 11.333 4.667 10"
        />
        <Path
            stroke="#191C1F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M14.666 6.667V10c0 3.333-1.333 4.667-4.666 4.667H6c-3.334 0-4.667-1.334-4.667-4.667V6c0-3.333 1.333-4.667 4.667-4.667h3.333"
        />
        <Path
            stroke="#191C1F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M14.666 6.667H12C10 6.667 9.333 6 9.333 4V1.333l5.333 5.334Z"
        />
    </Svg>
)
export default DocumentIcon
