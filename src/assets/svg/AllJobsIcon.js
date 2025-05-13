import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

const AllJobsIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
        <Rect width={39} height={39} x={0.5} y={0.5} stroke="#E9EBEE" rx={19.5} />
        <Path
            stroke="#292D32"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M14.5 30v-7M14.5 13v-3M25.5 30v-3M25.5 17v-7M17.5 15v6c0 1.1-.5 2-2 2h-2c-1.5 0-2-.9-2-2v-6c0-1.1.5-2 2-2h2c1.5 0 2 .9 2 2ZM28.5 19v6c0 1.1-.5 2-2 2h-2c-1.5 0-2-.9-2-2v-6c0-1.1.5-2 2-2h2c1.5 0 2 .9 2 2Z"
        />
    </Svg>
)
export default AllJobsIcon
